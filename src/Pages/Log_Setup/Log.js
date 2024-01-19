import React from 'react';
import { AdminNav } from '../../Components/AdminNav';
import { db } from '../../firebase';
import { collection, getDoc, query, getDocs, doc, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import CheckoutCard from './CheckoutCard';
import AdminCard from './AdminCard';
const Log = ({school, short_school}) => {

    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            var school_tag = school +"-Log"
            const q = query(collection(db, school + "-Log"), orderBy("Time"));
            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            documents.reverse();
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
        <div className=''>
            <AdminNav school={school} short_school={short_school}/>

            <div class="container mx-auto p-7">
                <h1 className="text-3xl font-semibold mt-3">Action Log</h1>

                <div className='overflow-y-auto max-h-screen '>
                  {data.map((item) => (
                    item.Checkout ? (
                      <CheckoutCard key={item.id} Grade={item.Grade} Items={item.Items} Time={item.Time} />
                    ) : (
                      <AdminCard key={item.id} Item={item.Item} Stock={item.Stock} Time={item.Time} Type={item.Type} />
                    )
                  ))}
                </div>


            </div>


        </div>
    );
};

export default Log;