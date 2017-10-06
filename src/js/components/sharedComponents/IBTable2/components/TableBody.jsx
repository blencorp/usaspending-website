/**
 * TableBody.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

export default class TableBody extends React.Component {
    render() {
        const style = {
            width: this.props.contentWidth,
            height: this.props.contentHeight,
            top: this.props.headerHeight
        };

        const rows = [];

        let cellTop = 0;
        const topRow = Math.max(0, Math.floor(this.props.visibleX / this.props.rowHeight) - 1);

        const bottomRow = Math.min(
                Math.ceil(this.props.visibleHeight / this.props.rowHeight) + topRow + 1,
                this.props.rowCount - 1
            );

        for (let rowIndex = topRow; rowIndex <= bottomRow; rowIndex++) {
            const rowStyle = {
                width: this.props.contentWidth,
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
