/**
 * TableHeader.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

export default class TableHeader extends React.Component {
    render() {
        let left = 0;
        const columns = this.props.columns.map((column, i) => {
            const style = {
                left,
                width: column.width,
                height: this.props.height
            };

            left += column.width;
            return (
                <div
                    key={column.id}
                    style={style}
                    className="ib-table-header-cell">
                    {this.props.renderHeaderCell(column.id, i)}
                </div>
            );
        });

        const style = {
            width: this.props.width,
            height: this.props.height,
            transform: `translate(${-1 * this.props.visibleX}px, 0px)`
        };

        return (
            <div
                className="ib-table-header"
                style={style}>
                <div className="ib-table-header-content">
                    {columns}
                </div>
            </div>
        );
    }
}
