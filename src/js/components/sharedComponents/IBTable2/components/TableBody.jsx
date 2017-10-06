/**
 * TableBody.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

export default class TableBody extends React.Component {
    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
        };

        const rows = [];

        let cellTop = 0;
        
        for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {

            const rowStyle = {
                width: this.props.width,
                height: this.props.rowHeight,
                top: cellTop,
                left: 0
            };

            const row = [];
            let cellLeft = 0;
            this.props.columns.forEach((column, columnIndex) => {
                const cellStyle = {
                    width: column.width,
                    height: this.props.rowHeight,
                    left: cellLeft,
                    top: 0
                };
                const cell = (
                    <div
                        key={`${rowIndex}-${column.id}`}
                        style={cellStyle}
                        className="ib-table-body-cell">
                        {this.props.renderBodyCell(rowIndex, columnIndex)}
                    </div>
                );
                row.push(cell);

                cellLeft += column.width;
            });

            cellTop += this.props.rowHeight;

            rows.push(
                <div
                    key={`row-${rowIndex}`}
                    style={rowStyle}
                    className="ib-table-body-row">
                    <div className="ib-table-body-row-content">
                        {row}
                    </div>
                </div>
            );
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
