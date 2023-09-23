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
            Amount: increment(-1*quantityToCheckout)
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
        <div className="grid grid-cols-3 gap-4">
          {inventoryData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded p-2">
              <h2 className="text-lg font-semibold">{item.itemName}</h2>
              <select
                onChange={(e) => handleQuantityChange(item.itemName, parseInt(e.target.value))}
                value={checkoutQuantities[item.itemName] || 0}
              >
                {[...Array(item.stockAmount + 1).keys()].map((quantity) => (
                  <option key={quantity} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </select>
            </div>
          ))}
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
      <ToastContainer/>
    </div>
  );
}

export default Locker;
