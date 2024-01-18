import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, setDoc, updateDoc, increment, doc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { AdminNav } from '../Components/AdminNav';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
 
const TABLE_HEAD = ["Item Name", "Current Stock", "Update", "Delete"];

function Inventory({school, short_school}) {
  

  var linkTo = ''
  if(school == "Westwood"){
    linkTo = '/whs'
  } else if (school == "Georgetown"){
    linkTo = '/ghs'
  }


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

  const [searchQuery, setSearchQuery] = useState('');
  const filteredInventoryData = inventoryData.filter(({ itemName }) =>
    itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          data_pulls: increment(inventoryArray.length)
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
      <div className='min-h-screen'>
        <AdminNav school={school} short_school={short_school}/>

        <div class="container mx-auto p-7">

          <h1 className="text-3xl font-semibold mt-3">Inventory Management</h1>
          {admin ? (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 mt-6">Add item to database</h2>

              <div className="flex items-center space-x-2 mb-10">
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








              

              <div>
                <Card className="h-full w-full">

                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="w-full md:w-72">
                      <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                </CardHeader>

                <CardBody className="overflow-scroll px-0">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              {head}{" "}
                              {index <= TABLE_HEAD.length - 3 && (
                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                              )}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                    {filteredInventoryData.map(({ itemName, stockAmount }, index) => {

                          const isLast = index === inventoryData.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={itemName}>

                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {itemName}
                                    </Typography>

                                  </div>
                                </div>
                              </td>


                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {stockAmount}
                                  </Typography>

                                </div>
                              </td>


                              <td className={classes}>
                                <div className="w-max">
                                <div className="flex items-center space-x-2">
                              <input
                                className="p-2 border border-gray-300 rounded"
                                type="number"
                                placeholder="New Stock"
                                value={itemStocks[itemName] || ''}
                                onChange={(e) =>
                                  setItemStocks({
                                    ...itemStocks,
                                    [itemName]: e.target.value,
                                  })
                                }
                              />
                              <button
                                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                onClick={() => handleUpdateStock(itemName)}
                              >
                                Update
                              </button>
                            </div>
                                </div>
                              </td>


                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                    <button
                                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                      onClick={() => handleDeleteItem(itemName)}
                                    >
                                      Delete
                                    </button>
                                </Typography>
                              </td>


                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </table>
                </CardBody>

                </Card>
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

      </div>
      
      <ToastContainer />

    </div>
  );
}

export default Inventory;
