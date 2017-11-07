/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 11/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationTriangle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    agencies: PropTypes.array,
    subAgencies: PropTypes.array,
    setSubAgencyList: PropTypes.func,
    currentAgencies: PropTypes.object,
    updateFilter: PropTypes.func,
    valid: PropTypes.bool
};

export default class AgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleAgencySelect = this.handleAgencySelect.bind(this);
        this.handleSubAgencySelect = this.handleSubAgencySelect.bind(this);
    }

    handleAgencySelect(e) {
        const target = e.target;
        this.props.updateFilter('agency', target.value);
        this.props.setSubAgencyList(target.value);
    }

    handleSubAgencySelect(e) {
        const target = e.target;
        this.props.updateFilter('sub_agency', target.value);
    }

    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationTriangle />
                </div>
            );
        }

        const agencies = this.props.agencies.map((agency) => (
            <option
                key={agency.toptier_agency_id}
                value={agency.toptier_agency_id}>
                {agency.name}
            </option>
        ));

        const subAgencies = this.props.subAgencies.map((subAgency) => (
            <option
                key={subAgency.subtier_agency_id}
                value={subAgency.subtier_agency_id}>
                {subAgency.subtier_agency_name}
            </option>
        ));
        return (
            <div className="filter-section">
                <h5 className="filter-section-title">
                    {icon} Select an <span>agency</span> and <span>sub-agency</span>.
                </h5>
                <div className="filter-section-content">
                    <label className="select-label" htmlFor="agency-select">
                        Agency
                    </label>
                    <select id="agency-select" name="agency" value={this.props.currentAgencies.agency} onChange={this.handleAgencySelect}>
                        <option value="">Select an Agency</option>
                        {agencies}
                    </select>
                    <label className="select-label" htmlFor="sub-agency-select">
                        Sub-Agency
                    </label>
                    <select id="sub-agency-select" name="subAgency" value={this.props.currentAgencies.subAgency} onChange={this.handleSubAgencySelect}>
                        <option value="">Select a Sub-Agency</option>
                        {subAgencies}
                    </select>
                </div>
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;