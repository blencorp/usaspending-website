/**
 * Table.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';
import VirtualScroller from './VirtualScroller';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentWidth: 0,
            contentHeight: 0,
            bodyHeight: 0
        };
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

        const colXPos = [];

        props.columns.forEach((col) => {
            colXPos.push(contentWidth);
            contentWidth += col.width;
        });


        this.setState({
            contentWidth,
            contentHeight,
            bodyHeight: props.rowCount * props.rowHeight
        });
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
                    contentWidth={this.state.contentWidth} />
                <div
                    style={wrapperStyle}
                    className="ib-table-content">
                    <TableHeader
                        columns={this.props.columns}
                        height={this.props.headerHeight}
                        width={this.state.contentWidth}
                        renderHeaderCell={this.props.renderHeaderCell} />
                    <TableBody
                        columns={this.props.columns}
                        rowCount={this.props.rowCount}
                        rowHeight={this.props.rowHeight}
                        headerHeight={this.props.headerHeight}
                        contentHeight={this.state.bodyHeight}
                        contentWidth={this.state.contentWidth}
                        visibleHeight={this.props.visibleHeight}
                        visibleWidth={this.props.visibleWidth}
                        visibleX={0}
                        visibleY={0}
                        renderBodyCell={this.props.renderBodyCell} />
                </div>
            </div>
        );
    }
}
