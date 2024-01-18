import React from 'react';
import { AdminNav } from '../Components/AdminNav';

const Log = ({school, short_school}) => {
    return (
        <div>
            <AdminNav school={school} short_school={short_school}/>

            This page is coming soon, stay tuned!
            It will be track every transaction in a log format that you can sort and easily view
        </div>
    );
};

export default Log;