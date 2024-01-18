import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, updateDoc, increment } from "firebase/firestore";
import { db } from '../firebase';
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import PieChart from '../Components/PieChart';
import ColoredLine from '../Components/ColoredLine';
import { AdminNav } from '../Components/AdminNav';
function Analytics({school, short_school}) {
  const [inventoryData, setInventoryData] = useState([]);
  
  var linkTo = ''
  if(school == "Westwood"){
    linkTo = '/whs'
  } else if (school == "Georgetown"){
    linkTo = '/ghs'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        var school_tag = school +"-inventory"
        const querySnapshot = await getDocs(collection(db, school_tag));
        var inventoryArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const itemName = doc.id;
          const stockAmount = data.Amount;
          const total_checkouts = data.total_checkouts;
          const days = data.days;
          const checkouts_per_day = total_checkouts / days;
          const expectedDaysUntilDepletion = stockAmount / checkouts_per_day;
          inventoryArray.push({ itemName, stockAmount, checkouts_per_day, expectedDaysUntilDepletion });
        });
        // Sort inventory data based on the average depletion rate
        inventoryArray.sort((a, b) => b.checkouts_per_day - a.checkouts_per_day);
        setInventoryData(inventoryArray);

        const data_doc = doc(db, 'data', 'data1');
        await updateDoc(data_doc, {
          data_pulls: increment(inventoryArray.length)
        });


        
      inventoryArray.sort((a, b) => a.expectedDaysUntilDepletion - b.expectedDaysUntilDepletion);
      setInventoryData(inventoryArray);


      } catch (error) {
        console.error('Error fetching inventory data: ', error);
      }
    };
    fetchData();
  }, []);


  const chartData = {
    labels: inventoryData.map((item) => item.itemName),
    datasets: [
      {
        label: "Average Depletion Rate",
        borderColor: "rgb(255,0,0)",
        data: inventoryData.map((item) => item.checkouts_per_day),
      },
      {
        label: "Current Inventory Status",
        type: "bar",
        backgroundColor: "rgb(30,144,255)",
        borderColor: "rgb(30,144,255)",
        data: inventoryData.map((item) => item.stockAmount),
      },

    ],
  };


  return (
    <div className='min-h-screen'>
      <AdminNav school={school} short_school={short_school}/>

      <div class="container mx-auto p-7">

        <h1 className="text-3xl font-semibold mt-3">Analytics</h1>

        <div className='my-5'>
          <Line data={chartData}  />
        </div>

        <ColoredLine color={"black"}/>


        {/* Table with four columns */}
        <div className=" mt-5 h-[500px] overflow-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Checkouts/Day
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Days Until Depletion
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.itemName} className=''>
                <td className="px-6 py-4 whitespace-nowrap" > {item.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap"  style={{ backgroundColor: item.stockAmount == 0 ? '#ff6961' : 'inherit' }}>{item.stockAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.checkouts_per_day.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap"  style={{ backgroundColor: item.expectedDaysUntilDepletion < 10 ? '#ff6961' : 'inherit' }}> {item.expectedDaysUntilDepletion.toFixed(2)}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className='mt-5'>
          <ColoredLine  color={"black"}/>
        </div>



        <PieChart/>


      </div>
      <ToastContainer />

    </div>
  );
}

export default Analytics;
