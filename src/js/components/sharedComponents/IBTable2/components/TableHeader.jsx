/**
 * TableHeader.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';

export default class TableHeader extends React.Component {
    render() {
        const columns = this.props.columns.map((column, i) => {
            const style = {
                width: column.width,
                height: this.props.height
            };
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
            height: this.props.height
        };

        return (
            <div
                className="ib-table-header"
                style={style}>
                {columns}
            </div>
        );
    }
}
