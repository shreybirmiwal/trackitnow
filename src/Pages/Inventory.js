import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from '../firebase';

function Inventory() {
  const correctPassword = 'PASS'; // REPLACE with the correct password
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newStock, setNewStock] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerifyClick = () => {
    if (password === correctPassword) {
      setAdmin(true);
      toast.success('Log in success', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error('Incorrect Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleAddNewItem = async () => {
    if (!admin) {
      // Check if the user is an admin
      toast.error('Only admins can add items.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (newItemName && newStock) {
      try {
        // Set a new document with the specified name and data
        const docRef = doc(db, "inventory", newItemName);
        await setDoc(docRef, { Amount: newStock });

        toast.success('Item added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error('Error adding item to the database: ', error);
        toast.error('Error adding item to the database.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error('Please enter both item name and stock.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  if (admin) {
    return (
      <div>
        <h1>YIPEE</h1>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Current Stock"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
        />
        <button onClick={handleAddNewItem}>Add Item</button>
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Please verify that you are an official Locker admin</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleVerifyClick}>Verify</button>
        <ToastContainer />
      </div>
    );
  }
}

export default Inventory;