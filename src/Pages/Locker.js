import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Locker() {
  const [inventoryData, setInventoryData] = useState([]);
  const [checkoutQuantities, setCheckoutQuantities] = useState({});
  const [studentGrade, setStudentGrade] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        var inventoryArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const itemName = doc.id;
          const stockAmount = Number(data.Amount);
          inventoryArray.push({ itemName, stockAmount });
        });
        setInventoryData(inventoryArray);
        console.log(inventoryData)

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

  const handleSubmit = async () => {
    // Check if grade entered
    if (studentGrade !== '') {
      console.log("Checkout quantities:", checkoutQuantities);
      console.log("Student's Grade:", studentGrade);

      // Loop through checkout quantities and update the database
      for (const itemName in checkoutQuantities) {
        if (checkoutQuantities.hasOwnProperty(itemName)) {
          const quantityToCheckout = checkoutQuantities[itemName];
          console.log(itemName + " " + quantityToCheckout)

          const docRef = doc(db, "inventory", itemName);
          await updateDoc(docRef, {
            Amount: increment(-1 * quantityToCheckout)
          });

        }
      }

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
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-xl p-4">
        <h1 className="text-2xl font-bold mb-4">Locker</h1>
        <p className="text-gray-600 mb-4">Select and update the quantities you have checked out from the Locker so we can keep track of our stockpile.</p>
        <div className="overflow-x-auto">
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                {inventoryData.map((item, index) => (
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
      <h2> 38 checkouts this month! </h2>

      <ToastContainer />
    </div>
  );
  
}

export default Locker;
