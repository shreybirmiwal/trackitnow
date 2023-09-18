import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

//search bar
//scroll view of all the items availble
//grade level
//quanitity
//submit


function Locker() {

    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const inventoryCollection = collection(db, 'inventory');

        const fetchData = async () => {
          try {

            const querySnapshot = await getDocs(collection(db, "inventory"));
            var inventoryArray = []
            querySnapshot.forEach((doc) => {

                const data = doc.data();
                const itemName = doc.id;
                const stockAmount = data.Amount;
                inventoryArray.push({ itemName, stockAmount });
                console.log(itemName + " " + stockAmount)

            });
    
            setInventoryData(inventoryArray);

          } catch (error) {
            console.error('Error fetching inventory data: ', error);
          }
        };
    
        fetchData();
        console.log(inventoryData)
      }, []);

    return (
        <div className='flex flex-col items-center'>
            
            <ul className='overflow-y-scroll h-96 w-full'>
                {inventoryData.map((item, index) => (
                    <li key={index}>

                        <div className='flex flex-row justify-center bg-gray-200'>
                            <h1>{item.itemName}</h1>
                        </div>

                        : {item.stockAmount}
                    </li>
                ))}
            </ul>

            <div className="flex flex-row w-full sm:w-56 items-center justify-center bg-gray-200 hover:bg-gray-400 rounded-md shadow-md cursor-pointer">
                <h1 className='p-5 text-2xl font-bold text-center'> Submit </h1>
            </div>
        </div>
    )
}

export default Locker