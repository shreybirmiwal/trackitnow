

import React, { useState, useEffect } from 'react';
import { updateDoc, doc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PieChart } from 'react-minimal-pie-chart';

const PieChart1 = () => {

  const [freshmen, setFreshmen] = useState(0);
  const [sophomore, setSophomore] = useState(0);
  const [junior, setJunior] = useState(0);
  const [senior, setSenior] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = doc(db, 'data', 'checkouts_grade');
        const docSnapshot = await getDoc(dataRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFreshmen((data['9']/data['total'])*100)
          setSophomore((data['10']/data['total'])*100)
          setJunior((data['11']/data['total'])*100)
          setSenior((data['12']/data['total'])*100)


          const dataDoc = doc(db, 'data', 'data1');
          await updateDoc(dataDoc, {
            data_pulls: increment(4)
          });
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching inventory data: ', error);
      }
    };

    
    fetchData();


  }, []);




  return (
    <div>
<PieChart
  data={[
    { title: 'Freshmen', value: freshmen, color: '#0074cc' },
    { title: 'Sophomore', value: sophomore, color: '#0052a5' },
    { title: 'Junior', value: junior, color: '#00316e' },
    { title: 'Senior', value: senior, color: '#001037' },

  ]}
/>
    </div>
  );
};

export default PieChart1;
