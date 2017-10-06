/**
 * VirtualScroller.jsx
 * Created by Kevin Li 10/6/17
 */

import React from 'react';

export default class VirtualScroller extends React.Component {
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