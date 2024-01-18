import React from 'react';
import { AdminNav } from '../Components/AdminNav';
const Updates = ({school, short_school}) => {
    return (
        <div>
            <AdminNav school={school} short_school={short_school}/>

            Coming soon! Stay tuned
            This page will allow you to post updates to users to see
        </div>
    );
};

export default Updates;