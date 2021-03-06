/**
 * ProfileComingSoon.jsx
 * Created by Kevin Li 7/19/17
 */

import React from 'react';

import { ExclamationCircle } from 'components/sharedComponents/icons/Icons';

const ProfileComingSoon = () => (
    <div className="profile-coming-soon">
        <div className="icon">
            <ExclamationCircle alt="Coming soon" />
        </div>
        <div className="label">
            Coming Soon
        </div>
    </div>
);

export default ProfileComingSoon;
