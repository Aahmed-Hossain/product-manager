/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";
import useAllProducts from "../../hooks/useAllProducts";
import SearchInput from "../shared/button/SearchInput";
import { useContext, useState } from "react";
import SelectVariants from "../createOrders/SelectVariants";
import OrderInfo from "../createOrders/OrderInfo";
import { AuthContext } from "../../providers/AuthProvider";

const CreateOrderModal = ({ closeModal }) => {
    const { selectedDetails} = useContext(AuthContext);
    console.log("selectedDetails from modal", selectedDetails)
    const [activeComponent, setActiveComponent] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
  const [allProducts, , , , , handleSearch, seachQuery] = useAllProducts();
  
  const handleCheckboxChange = (event, product) => {
    const { checked } = event.target;
    setSelectedProducts((prevSelectedProducts) => {
      if (checked) {
        return [...prevSelectedProducts, product];
      } else {
        // Remove the product from the selected products array if it's unchecked
        return prevSelectedProducts.filter(p => p.id !== product.id);
      }
    });
  };

  // Check if a product is selected
  const isProductSelected = (product) => {
    return selectedProducts.some(p => p.id === product.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[99%] md:w-[90%] max-h-full overflow-y-auto">
        <h3 className="font-bold text-lg text-center my-4 ">
        {activeComponent ===1 && <div>  Select Products</div>}
        {activeComponent ===2 && <div>   Select Variants</div>}
        {activeComponent ===3 && <div>  User Information</div>}
        </h3>

{
    activeComponent === 1 && (
        <div className="px-1 md:px-4">
        <div className="flex justify-end mb-3">
          <SearchInput seachQuery={seachQuery} handleSearch={handleSearch} />
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

checked={isProductSelected(product)}
onChange={(e) => handleCheckboxChange(e, product)}
inputProps={{ "aria-label": "controlled" }}
              
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
{
    activeComponent ===2 && <SelectVariants selectedProducts={selectedProducts}   />
}
{
    activeComponent ===3 && <OrderInfo/>
}

        {/* close next button */}
        <div className="flex justify-end space-x-2 mt-4">
       {
        activeComponent === 1 && (
            <button
            type="button"
            className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
            onClick={closeModal}
          >
            Cancel
          </button>
        )
       }

          {
            activeComponent !== 1 && (
                <button onClick={()=> setActiveComponent(activeComponent-1)} className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
            Back
          </button>
            )
          }

          {
            activeComponent !== 3 && (
                <button onClick={()=> setActiveComponent(activeComponent+1)} className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
            Next
          </button>
            )
          }
          {
            activeComponent ===3 && (
                <button  className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
                Submit
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};
export default CreateOrderModal;
