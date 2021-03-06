import React from 'react';
import { InfoCircle } from '../icons/Icons';

export default class InfoBanner extends React.Component {
    render() {
        return (
            <div className="warning-banner-wrap info">
                <div className="warning-banner">
                    <div className="top-alert-icon">
                        <i className="usa-da-icon"><InfoCircle alt="Information" /></i>
                    </div>
                    <div className="top-alert-text">
                        <p>
                            <span className="good-news">We&apos;ve updated USAspending.gov!</span>&nbsp;
                            You can still access an archive of the old site&nbsp;
                            <a
                                href="https://legacy.usaspending.gov"
                                target="_blank"
                                rel="noopener noreferrer">
                                here
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
