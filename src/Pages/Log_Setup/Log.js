import React from 'react';
import { AdminNav } from '../../Components/AdminNav';
import { db } from '../../firebase';
import { collection, getDoc, query, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const Log = ({school, short_school}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            var school_tag = school +"-Log"
            const q = query(collection(db, school_tag));
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setData(documents);
            console.log(documents)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
      //console.log(data)
    }, []); 

    return (
        <div className='min-h-screen'>
            <AdminNav school={school} short_school={short_school}/>

            <div class="container mx-auto p-7">
                <h1 className="text-3xl font-semibold mt-3">Action Log</h1>
            </div>

        </div>
    );
};

export default Log;