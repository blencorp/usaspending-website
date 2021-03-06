/**
  * DownloadButton.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

import NoDownloadHover from './NoDownloadHover';

const propTypes = {
    onClick: PropTypes.func,
    downloadAvailable: PropTypes.bool
};

export default class DownloadButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
        this.setState({
            showHover: true
        });
    }

    onMouseLeave() {
        this.setState({
            showHover: false
        });
    }

    onClick(e) {
        if (!this.props.downloadAvailable) {
            e.preventDefault();
            return;
        }

        this.props.onClick();
    }

    render() {
        let hover = null;
        if (this.state.showHover && !this.props.downloadAvailable) {
            hover = (<NoDownloadHover />);
        }

        let disabled = '';
        let downloadIcon = null;
        if (!this.props.downloadAvailable) {
            disabled = 'disabled';
            downloadIcon = (
                <div className="icon">
                    <ExclamationTriangle alt="Download not available" />
                </div>
            );
        }

        return (
            <div className="download-wrap">
                {hover}
                <button
                    className={`download-button ${disabled}`}
                    title="Download your data"
                    aria-label="Download your data"
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                    {downloadIcon}
                    <div className="label">
                        Download
                    </div>
                </button>
            </div>
        );
    }
}

DownloadButton.propTypes = propTypes;
