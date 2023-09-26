import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function Inventory() {
  const correctPassword = 'PASS';
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Inventory Management</h1>

      {admin ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
          <div className="flex items-center space-x-2 mb-2">
            <select
              className="p-2 border border-gray-300 rounded"
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
              className="p-2 border border-gray-300 rounded"
              type="number"
              placeholder="New Stock"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleUpdateStock}
            >
              Update Stock
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleDeleteItem}
            >
              Delete Item
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold mb-2">Add new item to database</h1>
            <input
              className="p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Item Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input
              className="p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Current Stock"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleAddNewItem}
            >
              Add Item
            </button>
          </div>

          {/* Display all items and current stock */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">All Items</h2>
            <ul className="list-disc pl-4">
              {inventoryData.map((item) => (
                <li key={item.itemName}>
                  {item.itemName}: {item.stockAmount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Please verify that you are an official Locker admin
          </h2>
          <input
            className="p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleVerifyClick}
          >
            Verify
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Inventory;
