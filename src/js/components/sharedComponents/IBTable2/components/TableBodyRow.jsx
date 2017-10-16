/**
 * TableBodyRow.jsx
 * Created by Kevin Li 10/10/17
 */

import React from 'react';

export default class TableBodyRow extends React.PureComponent {

    renderCell(column) {
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
                {this.props.renderBodyCell(this.props.rowIndex, column.index)}
            </div>
        );
        return cell;
    }

    render() {
        const cells = [];
        // console.log(`PRINT ROW ${this.props.rowIndex}`);

        this.props.columns.forEach((column) => {
            const cell = this.renderCell(column);
            cells.push(cell);
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
