import React from 'react';
import { AdminNav } from '../Components/AdminNav';

const Log = ({school, short_school}) => {
    return (
        <div>
            <AdminNav school={school} short_school={short_school}/>

            <div className='flex items-center justify-center mt-24'>
                <div className='text-center'>
                    <h2 className="text-xl font-semibold my-3">
                        This page is coming soon, stay tuned!
                    </h2>
                    It will track every transaction in a log format that you can sort and easily view
                </div>
            </div>



        </div>
    );
};

export default Log;