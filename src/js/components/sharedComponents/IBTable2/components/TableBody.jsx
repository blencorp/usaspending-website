/**
 * TableBody.jsx
 * Created by Kevin Li 10/5/17
 */

import React from 'react';
import { List } from 'immutable';

import TableBodyRow from './TableBodyRow';

const monitoredProps = ['visibleX', 'visibleWidth', 'contentWidth', 'columns'];

export default class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: []
        };

        this._lastColumnIndex = 0;
        this._lastRightColumnIndex = -1;
        this._lastX = 0;
        this._lastRight = 0;

        this.columns = new List();
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
        // console.log("CALCULATE");
        const leftEdge = props.visibleX;
        const rightEdge = props.visibleX + props.visibleWidth;

        let firstCol = this._lastColumnIndex;
        // determine what the leftmost column in view is by starting from the previously seen
        // leftmost column and moving left if the table scrolled left or moving right if the table
        // scrolled right
        // because smaller scroll amounts are more likely than larger scroll amounts, the likelihood
        // of having to iterate through a large number of columns is reduced
        if (leftEdge === this._lastX) {
            // there has been no horizontal movement, use the leftmost column from the last render
            // cycle as the leftmost column
            firstCol = this._lastColumnIndex;
            if (rightEdge === this._lastRight && this.props.columns === props.columns) {
                console.log("NOTHING CHANGED");
                return;
            }
        }
        else if (leftEdge < this._lastX) {
            // the table has scrolled left since the last render cycle, iterate from the last
            // known column and move left until we find the column
            for (let colIndex = this._lastColumnIndex; colIndex >= 0; colIndex--) {
                const colData = props.columns.get(colIndex);
                if (colData.left + colData.width < leftEdge) {
                    // the right edge of the column is left of the left edge of the viewable area
                    // (aka, it is too far to the left to be visible)
                    // this means the previous column was the leftmost column
                    break;
                }
                firstCol = colIndex;
            }
        }
        else {
            // the new left edge is greater than the previous left edge, meaning the table has
            // scrolled to the right
            // start from the last known column and iterate up to the last column
            for (let colIndex = this._lastColumnIndex; colIndex < props.columns.count(); colIndex++) {
                const colData = props.columns.get(colIndex);
                if (colData.left > leftEdge) {
                    // the right edge of the column is left of the left edge of the viewable area
                    // (aka, it is too far to the left to be visible)
                    // this means the previous column was the leftmost column
                    break;
                }
                firstCol = colIndex;
            }
        }

        this._lastColumnIndex = firstCol;
        this._lastX = leftEdge;
        this._lastRight = rightEdge;

        // now that we know the first column, we can iterate forward until we find the last visible column
        const visibleColumns = [];
        let rightmostIndex = -1;
        for (let colIndex = firstCol; colIndex < props.columns.count(); colIndex++) {
            const colData = props.columns.get(colIndex);
            if (colData.left > rightEdge) {
                // the left edge of the column is to the right of the visible rigth edge, this
                // means the column and subsequent columns are not visible - stop iterating
                break;
            }
            visibleColumns.push(colData);
            rightmostIndex = colIndex;
        }

      
        
        if (rightmostIndex === this._lastRightColumnIndex) {
            // a scroll occurred but no new columns appeared/disappeared
            this._lastRightColumnIndex = rightmostIndex;
            return;
        }

        this._lastRightColumnIndex = rightmostIndex;

        this.columns = new List(visibleColumns);
        this.forceUpdate();
        // this.setState({
        //     columns: new List(visibleColumns)
        // }, () => {
        // });
    }

    render() {
        // console.log("RENDER");
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
                    columns={this.columns}
                    rowHeight={this.props.rowHeight}
                    contentHeight={this.state.bodyHeight}
                    contentWidth={this.state.contentWidth}
                    renderBodyCell={this.props.renderBodyCell}
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
