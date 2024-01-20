import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, increment  } from "firebase/firestore";
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@material-tailwind/react';
function Home({school}) {

  const [inventoryData, setInventoryData] = useState([]);
  const [checkoutQuantities, setCheckoutQuantities] = useState({});
  const [studentGrade, setStudentGrade] = useState('');
  var isSubmiting = false;
  const [searchQuery, setSearchQuery] = useState('');
  const filteredInventoryData = inventoryData.filter(({ itemName }) =>
  itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        var school_tag = school +"-inventory"
        const querySnapshot = await getDocs(collection(db, school_tag));
        var inventoryArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const itemName = doc.id;
          const stockAmount = Number(data.Amount);
          inventoryArray.push({ itemName, stockAmount });
        });
        setInventoryData(inventoryArray);
        console.log(inventoryData)

        const data_doc = doc(db, 'data', 'data1');
        await updateDoc(data_doc, {
          data_pulls: increment(inventoryArray.length)
        });

      } catch (error) {
        console.error('Error fetching inventory data: ', error);

      }
    };
    fetchData();
    console.log(inventoryData)

  }, []);

  const handleQuantityChange = (itemName, quantity) => {
    setCheckoutQuantities({ ...checkoutQuantities, [itemName]: quantity });
  };

  const handleStudentGradeChange = (e) => {
    const grade = e.target.value;
    setStudentGrade(grade);
  };

  const updateLog = async () => {
    try {
      var school_string = school + "-Log";
      const coll = collection(db, school_string);
  
      const docRef = await addDoc(coll, {});
      const docId = docRef.id;
  
      const updateData = {
        Checkout: true,
        Grade: Number(studentGrade),
        Time: new Date(),
        Items: checkoutQuantities,
      };
  
      await updateDoc(doc(coll, docId), updateData);
  
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  
  const handleSubmit = async () => {
    if(isSubmiting == true) return;
    
    isSubmiting = true;
    // Check if grade entered
    if (studentGrade !== '') {
      console.log("Checkout quantities:", checkoutQuantities);
      console.log("Student's Grade:", studentGrade);

      // Loop through checkout quantities and update the database
      for (const itemName in checkoutQuantities) {
        if (checkoutQuantities.hasOwnProperty(itemName)) {
          const quantityToCheckout = checkoutQuantities[itemName];
          console.log(itemName + " " + quantityToCheckout)
          var school_tag = school +"-inventory"
          const docRef = doc(db, school_tag, itemName);
          await updateDoc(docRef, {
            Amount: increment(-1 * quantityToCheckout)
          });
          await updateDoc(docRef, {
            total_checkouts: increment(quantityToCheckout)
          });


          //total checkouts
          const data_doc = doc(db, 'data', 'data1');
          await updateDoc(data_doc, {
            total_checkouts: increment(quantityToCheckout)
          });

          const doc2 = doc(db, 'data', 'checkouts_grade');
          //update what grade chekcout for pie chart in analytics
          await updateDoc(doc2, {
            [studentGrade]: increment(quantityToCheckout),
            total: increment(quantityToCheckout)
          });


        }
      }

      updateLog();


      toast.success('Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {
      toast.warn('Enter a valid grade level', {
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

    isSubmiting = false
  };

  return (
    <div className='min-h-screen'>
      <div className="container mx-auto p-7">

        <h1 className="text-3xl font-semibold mt-3">{school} Locker</h1>
  

          <p className="text-gray-600 mb-4 mt-4">Select and update the quantities you have checked out from the Locker so we can keep track of our stockpile.</p>
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="overflow-x-auto pt-5">
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>


              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Checked Out
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventoryData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.itemName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          onChange={(e) => handleQuantityChange(item.itemName, parseInt(e.target.value))}
                          value={checkoutQuantities[item.itemName] || 0}
                          className="border border-gray-300 rounded p-2"
                        >
                          {[...Array(item.stockAmount + 1).keys()].map((quantity) => (
                            <option key={quantity} value={quantity}>
                              {quantity}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Student's Grade"
              value={studentGrade}
              onChange={handleStudentGradeChange}
              className="border border-gray-300 rounded p-2 w-1/3 mr-5"
            />
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

    <ToastContainer />

    </div>
  );
  
}

export default Home;
