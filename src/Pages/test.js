  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-xl p-4">
        <h1 className="text-2xl font-bold mb-4">Locker</h1>
        <p className="text-gray-600 mb-4">Select and update the quantities you have checked out from the Locker so we can keep track of our stockpile.</p>
        <div className="overflow-x-auto">
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