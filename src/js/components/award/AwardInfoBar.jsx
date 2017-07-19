/**
 * AwardInfoBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AgencyInfo from './AgencyInfo';
import RecipientInfo from './RecipientInfo';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfoBar extends React.Component {

    render() {
        let agencies = null;
        if (this.props.selectedAward) {
            agencies = (
                <div className="award-info-bar">
                    <AgencyInfo
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                    <div className="triangle-wrapper" />
                    <RecipientInfo
                        category={this.props.selectedAward.category}
                        recipient={this.props.selectedAward.recipient} />
                </div>
            );
        }
        return (
            <div>
                { agencies }
            </div>
        );
    }
}

AwardInfoBar.propTypes = propTypes;
