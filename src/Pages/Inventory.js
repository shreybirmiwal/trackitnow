import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, updateDoc, increment, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function Inventory({school}) {
  
  var correctPassword = ""
  if(school === "Westwood"){
    correctPassword = process.env.REACT_APP_PASSWORD_WHS
  } else if(school === "Georgetown") {
    correctPassword = process.env.REACT_APP_PASSWORD_GHS
  } else {
    correctPassword = ""
  }

  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [itemStocks, setItemStocks] = useState({});


  const handlePasswordChange = (event) => { //not password change, like the password field getting updated
    setPassword(event.target.value);
  };

  const fetchData2 = async () => {
    try {
      var school_tag = school +"-inventory"
      const querySnapshot = await getDocs(collection(db, school_tag));
      var inventoryArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const itemName = doc.id;
        const stockAmount = data.Amount;
        inventoryArray.push({ itemName, stockAmount });
      });
      setInventoryData(inventoryArray);

      const data_doc = doc(db, 'data', 'data1');
      await updateDoc(data_doc, {
        data_pulls: increment(inventoryArray.length())
      });

    } catch (error) {
      console.error('Error fetching inventory data: ', error);
    }
  };

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
          inventoryArray.push({ itemName, stockAmount });
        });

        const data_doc = doc(db, 'data', 'data1');
        await updateDoc(data_doc, {
          data_pulls: increment(inventoryArray.length())
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
        var school_tag = school +"-inventory"
        const docRef = doc(db, school_tag, newItemName);
        await setDoc(docRef, { Amount: Number(newStock),  total_checkouts: 0, days: 1});


        const data_doc = doc(db, 'data', 'data1');
        await updateDoc(data_doc, {
          new_item: increment(1)
        });

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
        
        fetchData2();

        
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

  const handleUpdateStock = async (itemName) => {
    const stockToUpdate = itemStocks[itemName];
    if (stockToUpdate !== undefined) {
      try {
        var school_tag = school +"-inventory"
        const docRef = doc(db, school_tag, itemName);
        await setDoc(docRef, { Amount: Number(stockToUpdate) }, { merge: true });

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
        setItemStocks({ ...itemStocks, [itemName]: '' });

        fetchData2()

        const data_doc = doc(db, 'data', 'data1');
        await updateDoc(data_doc, {
          update_data: increment(1)
        });

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
      toast.error('Please enter the new stock amount.', {
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

  const handleDeleteItem = async (itemName) => {
    try {
      var school_tag = school +"-inventory"
      const docRef = doc(db,school_tag, itemName);
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
      setItemStocks({ ...itemStocks, [itemName]: '' });
      
      const data_doc = doc(db, 'data', 'data1');
      await updateDoc(data_doc, {
        update_data: increment(1)
      });


      fetchData2();

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
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-2">Inventory Management</h1>

      {admin ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 mt-10">Add item to database</h2>

          <div className="flex items-center space-x-2">
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

          <div className="mb-4 mt-10">
            <h2 className="text-xl font-semibold mb-2">All Items</h2>
            <div className="max-h-80 overflow-y-auto">
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
                      Update Stock
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete Item
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item.itemName}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.itemName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.stockAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <input
                            className="p-2 border border-gray-300 rounded"
                            type="number"
                            placeholder="New Stock"
                            value={itemStocks[item.itemName] || ''}
                            onChange={(e) =>
                              setItemStocks({
                                ...itemStocks,
                                [item.itemName]: e.target.value,
                              })
                            }
                          />
                          <button
                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                            onClick={() => handleUpdateStock(item.itemName)}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                          onClick={() => handleDeleteItem(item.itemName)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
