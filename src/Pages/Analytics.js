import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

function Analytics() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
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
        label: "Current Inventory Status",
        backgroundColor: "rgb(30,144,255)",
        borderColor: "rgb(30,144,255)",
        data: inventoryData.map((item) => item.stockAmount),
      },
      {
        label: "Average Depletion Rate",
        type: "line",
        borderColor: "rgb(255,0,0)",
        data: inventoryData.map((item) => item.checkouts_per_day),
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
      y2: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2">Analytics</h1>
      <div className="max-h-96">

        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Table with four columns */}
      <div className="max-h-80 overflow-y-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average Depletion Rate
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expected Days Until Depletion
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => (
              <tr key={item.itemName} style={{ backgroundColor: item.expectedDaysUntilDepletion < 10 ? 'red' : 'inherit' }}>
  <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
  <td className="px-6 py-4 whitespace-nowrap">{item.stockAmount}</td>
  <td className="px-6 py-4 whitespace-nowrap">{item.checkouts_per_day.toFixed(2)}</td>
  <td className="px-6 py-4 whitespace-nowrap">{item.expectedDaysUntilDepletion.toFixed(2)}</td>
</tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Analytics;
