/**
 * Table.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';
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
        props.columns.forEach((col) => {
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
                <div
                    className="ib-table-scroller"
                    style={wrapperStyle}
                    ref={(div) => {
                        this.scroller = div;
                    }} />
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
                        height={this.state.bodyHeight}
                        width={this.state.contentWidth}
                        renderBodyCell={this.props.renderBodyCell} />
                </div>
            </div>
        );
    }
}
