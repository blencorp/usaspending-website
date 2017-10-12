/**
 * TableBody.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

import TableBodyRow from './TableBodyRow';

const monitoredProps = ['visibleX', 'visibleWidth', 'contentWidth'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };

        this._columnCache = {};
    }

    componentWillReceiveProps(nextProps) {
        for (const propName of monitoredProps) {
            if (nextProps[propName] !== this.props[propName]) {
                this.determineVisibleColumns(nextProps);
                break;
            }
        }
    }

    determineVisibleColumns(props) {
        const leftEdge = props.visibleX;
        const rightEdge = props.visibleX + props.visibleWidth;

        
    }

    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.contentHeight,
            top: this.props.headerHeight,
            transform: `translate(${-1 * this.props.visibleX}px, ${-1 * this.props.visibleY}px)`
        };

        const rows = [];

        const topRow = Math.max(0, Math.floor(this.props.visibleY / this.props.rowHeight) - 1);

        const bottomRow = Math.min(
                Math.ceil(this.props.visibleHeight / this.props.rowHeight) + topRow + 1,
                this.props.rowCount - 1
            );

        let rowY = topRow * this.props.rowHeight;

        for (let index = topRow; index <= bottomRow; index++) {
            rows.push(
                <TableBodyRow
                    {...this.props}
                    visibleColumns={this.state.visibleColumns}
                    key={`row-${index}`}
                    rowIndex={index}
                    rowY={rowY} />
            );
            rowY += this.props.rowHeight;
        }

        return (
            <div
                style={style}
                className="ib-table-body">
                {rows}
            </div>
        );
    }
}
