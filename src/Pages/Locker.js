import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

function Locker() {
    const [inventoryData, setInventoryData] = useState([]);
    const [checkoutQuantities, setCheckoutQuantities] = useState({}); // State to store checkout quantities for each item

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

    // Function to handle quantity selection for an item
    const handleQuantityChange = (itemName, quantity) => {
        setCheckoutQuantities({ ...checkoutQuantities, [itemName]: quantity });
    };

    // Function to handle submission
    const handleSubmit = () => {
        // Here, you can access the selected checkout quantities from the checkoutQuantities state
        // and update your database accordingly.
        console.log("Checkout quantities:", checkoutQuantities);
    };

    return (
        <div className='flex flex-col items-center'>
            <ul className='overflow-y-scroll h-96 w-full'>
                {inventoryData.map((item, index) => (
                    <li key={index}>
                        <div className='flex flex-row justify-between bg-gray-200 p-2'>
                            <h1>{item.itemName}</h1>
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
                    </li>
                ))}
            </ul>

            <div
                className="flex flex-row w-full sm:w-56 items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-md shadow-md cursor-pointer"
                onClick={handleSubmit}
            >
                <h1 className='p-5 text-2xl font-bold text-center'> Submit </h1>
            </div>
        </div>
    )
}

export default Locker;
