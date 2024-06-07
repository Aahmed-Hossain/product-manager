/* eslint-disable react/prop-types */

import TextField from "@mui/material/TextField";
import { Box,FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ViewModal = ({ closeViewModal,product }) => {
    const {name, brand, type, origin, variants} = product;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%]">
        <h3 className="font-bold text-lg text-center my-2 text-black">
          Create New Product
        </h3>
        <form  className="space-y-4">
        <Box sx={{ display: 'flex', justifyContent: 'center',}}>
        <Box className="grid grid-cols-2 gap-2 w-10/12 md:w-2/3  justify-items-center">

            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-name-input"
                label="Name"
                type="text"
                inputProps={{ readOnly: true }}
                defaultValue={name}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-brand-input"
                label="Brand"
                type="text"
                inputProps={{ readOnly: true }}
                defaultValue={brand}
              />
            </Box >

            <Box sx={{ width: "100%" }}>
            <FormControl sx={{ width: "100%" }}>
 <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select 
        sx={{ width: "100%" }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="Type"
          inputProps={{ readOnly: true }}
                defaultValue={type}
        >
          <MenuItem sx={{ width: "100%" }} value={'Mug'}>Mug</MenuItem>

          <MenuItem sx={{ width: "100%" }} value={'Cup'}>Cup</MenuItem>
          <MenuItem sx={{ width: "100%" }} value={'Glass'}>Glass</MenuItem>
 
        </Select>
        </FormControl>
        </Box>
            <Box sx={{ width: "100%" }}>
            <TextField
              id="outlined-origin-input"
              label="Origin"
              type="text"
              inputProps={{ readOnly: true }}
              defaultValue={origin}
            />
          </Box>


          </Box>
        </Box>

<h3 className="text-xl font-semibold my-8 md:my-24 text-center text-black">Variants</h3>

{
    variants?.map((variant, idx)=> (
<Box key={idx} className="flex justify-between gap-2 w-full">
              <Box  sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  id={`outlined-color-input`}
                  label="Color"
                  type="text"
                  inputProps={{ readOnly: true }}
              defaultValue={variant?.color}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  id={`outlined-specification-input`}
                  label="Specification"
                  type="text"
                  inputProps={{ readOnly: true }}
                  defaultValue={variant?.specification}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "100%" }}
                  id={`outlined-size-input`}
                  label="Size"
                  type="text"
                  inputProps={{ readOnly: true }}
                  defaultValue={variant?.size}
                />
              </Box>

            </Box>
    ))
}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
              onClick={closeViewModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewModal;
