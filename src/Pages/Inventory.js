import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore"; // Import necessary Firestore functions
import { db } from '../firebase';

function Inventory() {
  const correctPassword = 'PASS'; // REPLACE with the correct password
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [inventoryData, setInventoryData] = useState([]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
        await setDoc(docRef, { Amount: Number(newStock) });

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

        // Clear input fields
        setNewItemName('');
        setNewStock('');
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

  const handleUpdateStock = async () => {
    if (selectedItem && newStock) {
      try {
        // Update the stock amount of the selected item
        const docRef = doc(db, "inventory", selectedItem);
        await setDoc(docRef, { Amount: Number(newStock) }, { merge: true });

        toast.success('Stock updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Clear input fields
        setSelectedItem('');
        setNewStock('');
      } catch (error) {
        console.error('Error updating stock: ', error);
        toast.error('Error updating stock.', {
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
      toast.error('Please select an item and enter the new stock amount.', {
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

  const handleDeleteItem = async () => {
    if (selectedItem) {
      try {
        // Delete the selected item
        const docRef = doc(db, "inventory", selectedItem);
        await deleteDoc(docRef);

        toast.success('Item deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Clear input fields
        setSelectedItem('');
        setNewStock('');
      } catch (error) {
        console.error('Error deleting item: ', error);
        toast.error('Error deleting item.', {
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
      toast.error('Please select an item to delete.', {
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
        <h1>Admin Panel</h1>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
        >
          <option value="">Select an item</option>
          {inventoryData.map((item) => (
            <option key={item.itemName} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="New Stock"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
        />
        <button onClick={handleUpdateStock}>Update Stock</button>
        <button onClick={handleDeleteItem}>Delete Item</button>


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
