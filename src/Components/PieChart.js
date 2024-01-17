import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { updateDoc, doc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const PieChart = () => {

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


  // Data for the pie chart
  const data = {
    labels: ['Freshmen', 'Sophomore', 'Junior', 'Senior'],
    datasets: [
      {
        data: [freshmen, sophomore, junior, senior],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
  };

  return (
    <div>
      <h2>Distribution of Students and Checkouts</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
