/**
 * VirtualScroller.jsx
 * Created by Kevin Li 10/6/17
 */

import React from 'react';

export default class VirtualScroller extends React.Component {
    constructor(props) {
        super(props);

        this.lastUpdate = null;

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll() {
        if (this.lastUpdate) {
            cancelAnimationFrame(this.lastUpdate);
        }
        this.lastUpdate = requestAnimationFrame(() => {
            const scrollY = this.scroller.scrollTop;
            const scrollX = this.scroller.scrollLeft;

            this.props.tableScrolled(scrollX, scrollY);
        });
    }

    render() {
        const outerStyle = {
            width: this.props.visibleWidth,
            height: this.props.visibleHeight
        };

        const innerStyle = {
            width: this.props.contentWidth,
            height: this.props.contentHeight
        };

        return (
            <div
                className="ib-table-scroller"
                style={outerStyle}
                onScroll={this.onScroll}
                ref={(div) => {
                    this.scroller = div;
                }}>
                <div
                    className="ib-table-scroller-content"
                    style={innerStyle} />
            </div>
        );
    }
}