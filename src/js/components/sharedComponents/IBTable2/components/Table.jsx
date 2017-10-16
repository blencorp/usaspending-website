/**
 * Table.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

import { List } from 'immutable';

import VirtualScroller from './VirtualScroller';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentWidth: 0,
            contentHeight: 0,
            bodyHeight: 0,
            scrollX: 0,
            scrollY: 0,
            columns: new List()
        };

        this.tableScrolled = this.tableScrolled.bind(this);
    }

    componentWillMount() {
        this.prepareTable(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareTable(nextProps);
    }

    prepareTable(props) {
        // calculate the width and height of the full content
        let contentWidth = 0;
        const contentHeight = props.headerHeight + (props.rowCount * props.rowHeight);

        const columns = [];
        props.columns.forEach((col) => {
            columns.push(Object.assign({}, col, {
                // add the left position to the column object for future reference
                left: contentWidth
            }));
            contentWidth += col.width;
        });


        this.setState({
            contentWidth,
            contentHeight,
            bodyHeight: props.rowCount * props.rowHeight,
            columns: new List(columns)
        });
    }

    tableScrolled(x, y) {
        // window.requestAnimationFrame(() => {
            this.setState({
                scrollX: x,
                scrollY: y
            });
        // });
    }

    render() {
        const wrapperStyle = {
            width: this.props.visibleWidth,
            height: this.props.visibleHeight
        };

        return (
            <div className="ib-table-wrapper">
                <VirtualScroller
                    visibleHeight={this.props.visibleHeight}
                    visibleWidth={this.props.visibleWidth}
                    contentHeight={this.state.contentHeight}
                    contentWidth={this.state.contentWidth}
                    tableScrolled={this.tableScrolled} />
                <div
                    style={wrapperStyle}
                    className="ib-table-content">
                    <TableHeader
                        columns={this.state.columns}
                        height={this.props.headerHeight}
                        width={this.state.contentWidth}
                        visibleX={this.state.scrollX}
                        renderHeaderCell={this.props.renderHeaderCell} />
                    <TableBody
                        columns={this.state.columns}
                        rowCount={this.props.rowCount}
                        rowHeight={this.props.rowHeight}
                        headerHeight={this.props.headerHeight}
                        contentHeight={this.state.bodyHeight}
                        contentWidth={this.state.contentWidth}
                        visibleHeight={this.props.visibleHeight}
                        visibleWidth={this.props.visibleWidth}
                        visibleX={this.state.scrollX}
                        visibleY={this.state.scrollY}
                        renderBodyCell={this.props.renderBodyCell} />
                </div>
            </div>
        );
    }
}
