import React from 'react';

function CheckoutCard({ Grade, Items, Time }) {
  // Convert Firebase timestamp to JavaScript Date object
  const timestampDate = Time ? Time.toDate() : null;
  // Format the date using toLocaleString
  const formattedDate = timestampDate
    ? timestampDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    : '';

  return (
    <div className="grid grid-cols-6 gap-4 bg-blue-400 p-4 mt-4 rounded-md shadow-md">

      <div className="col-span-1 flex items-start justify-start ml-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>

      <div className="col-span-2 text-white text-sm">
        {formattedDate}
      </div>

      <div className="col-span-2 overflow-x-auto">
        {Object.entries(Items).map(([item, amount]) => (
          <p key={item} className="text-white">{`${item}: ${amount}`}</p>
        ))}
      </div>

      <div className="col-span-1 text-white">
        <p className="font-semibold">Grade: {Grade}</p>
      </div>
    </div>
  );

}

export default CheckoutCard;
