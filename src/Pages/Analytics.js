import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

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
          inventoryArray.push({ itemName, stockAmount });
        });
        setInventoryData(inventoryArray);
      } catch (error) {
        console.error('Error fetching inventory data: ', error);
      }
    };
    fetchData();
  }, []);

  const current_inventory_labels = ["January", "February", "March", "April", "May", "June"];
  const current_inventory_data = {
    labels: current_inventory_labels,
    datasets: [
      {
        label: "Current Inventory Status",
        backgroundColor: "rgb(30,144,255)",
        borderColor: "rgb(30,144,255)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-2">Analytics</h1>
        <Bar data={current_inventory_data} />

      <ToastContainer />
    </div>
  );
}

export default Analytics;
