/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// import { Checkbox } from "@mui/material"
// import TextField from "@mui/material/TextField";
// import { useState } from "react";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// const SelectVariants = ({selectedProducts}) => {
//     // console.log(selectedProducts)
//     const [selectedVariants, setSelectedVariants] = useState([]);
// const [selectProductName, setSelectProductName] = useState('')
// console.log(selectProductName)
//     const productNames = selectedProducts.map(product => product.name);
//     console.log(productNames);

//     const handleChange = (event) => {
//         setSelectProductName(event.target.value);
//         setSelectedVariants([]);
//       };

//     const handleCheckboxChange = (event, variant) => {
//         const { checked } = event.target;
//         setSelectedVariants((prevSelectedVariants) => {
//           if (checked) {
//             return [...prevSelectedVariants, variant];
//           } else {
//             // Remove the product from the selected products array if it's unchecked
//             return prevSelectedVariants.filter(v => v.id !== variant.id);
//           }
//         });
//       };

//       // Check if a product is selected
//       const isVariantSelected = (variant) => {
//         return selectedVariants.some(v => v.id === variant.id);
//       };
//   return (
//     <div>
//         <div>
//         <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
//         <InputLabel id="demo-simple-select-standard-label">Select Product</InputLabel>
//         <Select
//           labelId="demo-simple-select-standard-label"
//           id="demo-simple-select-standard"
//           value={selectProductName}
//           onChange={handleChange}
//           label="Select Product"
//         >
//          {
//             productNames?.map((productName, idx)=> (
//                 <MenuItem key={idx} value={productName}>{productName}</MenuItem>
//             ))
//          }
//         </Select>
//       </FormControl>
//         </div>
//           <table className="w-full border-separate">
//           <thead>
//             <tr className="text-center bg-[#0F9ED5] text-white ">
//               <th className="px-1 py-2 hidden md:block">ID</th>
//               <th className="px-1 py-2">Color</th>
//               <th className="px-1 py-2">Specification</th>
//               <th className="px-1 py-2">Size</th>
//               <th className="px-1 py-2">Quantity</th>
//               <th className="px-1 py-2">Select</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedProducts?.map((variant, idx) => (
//               <tr
//                 key={idx}
//                 className="text-sm lg:font-medium  odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
//               >
//                 <td className=" px-1 py-2 hidden md:block">{idx + 1}</td>
//                 <td className="px-1 py-2">{variant.color}</td>
//                 <td className="px-1 py-2">{variant.specification}</td>
//                 <td className=" px-1 py-2 ">{variant.size}</td>
//                 <td className=" px-1 py-2 ">
//               <TextField
//               size="small"
//                 sx={{ maxWidth:100, width: "100%" }}
//              label="Quantity" variant="standard"
//                 type="number"
//                 defaultValue={''}
//               />

//                 </td>
//                 <td className="px-1 py-2 text-red-400 space-x-1">
//                   <Checkbox
// checked={isVariantSelected(variant)}
// onChange={(e) => handleCheckboxChange(e, variant)}
// inputProps={{ "aria-label": "controlled" }}

//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//     </div>
//   )
// }

// export default SelectVariants

import { Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AuthContext } from "../../providers/AuthProvider";

const SelectVariants = ({ selectedProducts }) => {
    const { setSelectedDetails} = useContext(AuthContext);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectProductName, setSelectProductName] = useState("");
  const productNames = selectedProducts.map((product) => product.name);

  const handleChange = (event) => {
    setSelectProductName(event.target.value);
    setSelectedVariants([]);
  };

  const handleCheckboxChange = (event, variant) => {
    const { checked } = event.target;
    setSelectedVariants((prevSelectedVariants) => {

      if (checked) {
const result = [...prevSelectedVariants, { ...variant, quantity: 0 }]
// console.log("result", result)
    const details = result.map((v) => ({
      variant_id: v.id,
      quantity: v.quantity,
    }));
    setSelectedDetails(details);
return result;
      } else {
       const result = prevSelectedVariants.filter((v) => v.id !== variant.id);
        const details = result.map((v) => ({
            variant_id: v.id,
            quantity: v.quantity,
          }));
          setSelectedDetails(details);
          return result;
      }
    });
  };

  const handleQuantityChange = (event, variant) => {
    const quantity = parseInt(event.target.value, 10);

    setSelectedVariants((prevSelectedVariants) => {
      return prevSelectedVariants.map((v) => {
        if (v.id === variant.id) {
          return { ...v, quantity: quantity };
        }
        return v;
      });
    });
  };

  const isVariantSelected = (variant) => {
    return selectedVariants.some((v) => v.id === variant.id);
  };

  const selectedProduct = selectedProducts.find(
    (product) => product.name === selectProductName
  );

  return (
    <div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            id="product-select"
            value={selectProductName}
            onChange={handleChange}
            label="Select Product"
            defaultValue={selectProductName[0]}
          >
            {productNames?.map((productName, idx) => (
              <MenuItem key={idx} value={productName}>
                {productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedProduct && (
        <table className="w-full border-separate">
          <thead>
            <tr className="text-center bg-[#0F9ED5] text-white">
              <th className="px-1 py-2 hidden md:block">ID</th>
              <th className="px-1 py-2">Color</th>
              <th className="px-1 py-2">Specification</th>
              <th className="px-1 py-2">Size</th>
              <th className="px-1 py-2">Quantity</th>
              <th className="px-1 py-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.variants.map((variant, idx) => (
              <tr
                key={variant.id}
                className="text-sm lg:font-medium odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
              >
                <td className="px-1 py-2 hidden md:block">{idx + 1}</td>
                <td className="px-1 py-2">{variant.color}</td>
                <td className="px-1 py-2">{variant.specification}</td>
                <td className="px-1 py-2">{variant.size}</td>
                <td className="px-1 py-2">
                  <TextField
                    size="small"
                    sx={{ maxWidth: 100, width: "100%" }}
                    label="Quantity"
                    variant="standard"
                    type="number"
                    required
                    value={
                      selectedVariants.find((v) => v.id === variant.id)
                        ?.quantity || ""
                    }
                    onChange={(e) => handleQuantityChange(e, variant)}
                    disabled={!isVariantSelected(variant)}
                  />
                </td>
                <td className="px-1 py-2 text-red-400 space-x-1">
                  <Checkbox
                    checked={isVariantSelected(variant)}
                    onChange={(e) => handleCheckboxChange(e, variant)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SelectVariants;
