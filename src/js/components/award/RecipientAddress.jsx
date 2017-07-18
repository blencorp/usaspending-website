/**
 * RecipientAddress.jsx
 * Created by Emily Gullo 01/31/2017
 **/

import React from 'react';

const propTypes = {
    location: React.PropTypes.object,
    type: React.PropTypes.string
};

export default class RecipientAddress extends React.Component {

    render() {
        const city = this.props.location.city_name;
        let stateProvince = this.props.location.state_code;
        if (this.props.location.foreign_province) {
            stateProvince = this.props.location.foreign_province;
        }
        let cityState = null;

        let country = null;
        let district = null;

        const street = [];
        const streetFields = ['address_line1', 'address_line2', 'address_line3'];
        streetFields.forEach((key) => {
            const item = this.props.location[key];
            if (this.props.location[key] && this.props.location[key] !== '') {
                const lineItem = (
                    <span key={key}>{item}<br /></span>
                );

                street.push(lineItem);
            }
        });
        if (this.props.location.state_code && this.props.location.congressional_code) {
            district = (
                <div className="item-value">
                    Congressional District: {this.props.location.state_code}-
                    {this.props.location.congressional_code}
                </div>);
        }
        if (city && stateProvince) {
            cityState = `${city}, ${stateProvince}`;
        }
        else if (city) {
            cityState = city;
        }
        else if (stateProvince) {
            cityState = stateProvince;
        }

        if (this.props.location.country_code !== "USA" && this.props.location.country_name !== null) {
            country = this.props.location.country_name;
            if (city !== null) {
                cityState = `${city},`;
            }
        }

        return (
            <li className={this.props.type}>
                <div className="item-label">
                    Address
                </div>
                <div className="item-value">
                    {street}
                </div>
                <div className="item-value">
                    {cityState} {country} {this.props.location.zip}
                </div>
                {district}
            </li>
        );
    }
}
RecipientAddress.propTypes = propTypes;
