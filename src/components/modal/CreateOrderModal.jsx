/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";
import useAllProducts from "../../hooks/useAllProducts";
import SearchInput from "../shared/button/SearchInput"
import { useState } from "react";

const CreateOrderModal = ({closeModal}) => {
    const [allProducts,  , ,, , handleSearch,
        seachQuery] = useAllProducts();
        const [checked, setChecked] = useState(true);
        const handleChange = (event) => {
          setChecked(event.target.checked);
        };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%] max-h-full overflow-y-auto">
      <h3 className="font-bold text-lg text-center my-4 ">
        Create New Order
      </h3>

      <div className="px-1 md:px-4">
        <div className="flex justify-end mb-3">
          <SearchInput seachQuery={seachQuery} handleSearch={handleSearch}  />
        </div>
        <table className="w-full border-separate">
          <thead>
            <tr className="text-center bg-[#0F9ED5] text-white ">
              <th className="px-1 py-2 hidden md:block">ID</th>
              <th className="px-1 py-2">Name</th>
              <th className="px-1 py-2">Brand</th>
              <th className="px-1 py-2">Type</th>
              <th className="px-1 py-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.data?.data?.map((product, idx) => (
              <tr
                key={idx}
                className="text-sm lg:font-medium  odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
              >
                <td className=" px-1 py-2 hidden md:block">{idx + 1}</td>
                <td className="px-1 py-2">{product.name}</td>
                <td className="px-1 py-2">{product.brand}</td>
                <td className=" px-1 py-2 ">{product.type}</td>
                <td className="px-1 py-2 text-red-400 space-x-1">
                  
                <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


        {/* close next button */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
            Next
          </button>
        </div>
  
    </div>
  </div>
  )
}

export default CreateOrderModal