/**
 * TableBodyRow.jsx
 * Created by Kevin Li 10/10/17
 */

import React from 'react';

export default class TableBodyRow extends React.PureComponent {

    renderCell(column, index) {
        const cellStyle = {
            width: column.width,
            height: this.props.rowHeight,
            left: column.left,
            top: 0
        };
        const cell = (
            <div
                key={`${this.props.rowIndex}-${column.id}`}
                style={cellStyle}
                className="ib-table-body-cell">
                {this.props.renderBodyCell(this.props.rowIndex, index)}
            </div>
        );
        return cell;
    }

    render() {
        const cells = [];

        let left = 0;

        const leftEdge = this.props.visibleX;
        const rightEdge = this.props.visibleX + this.props.visibleWidth;

        this.props.columns.forEach((column, index) => {
            if (left + column.width >= leftEdge
                && (left <= rightEdge)) {
                const cell = this.renderCell(column, index);
                cells.push(cell);
            }
            left += column.width;
        });

        const style = {
            width: this.props.contentWidth,
            height: this.props.rowHeight,
            top: this.props.rowY,
            left: 0
        };

        return (
            <div
                style={style}
                className="ib-table-body-row">
                <div className="ib-table-body-row-content">
                    {cells}
                </div>
            </div>
        );
    }
}
