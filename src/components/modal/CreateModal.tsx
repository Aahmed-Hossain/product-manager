import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";

const CreateModal = ({ closeModal,refetch }) => {
  const [type, setType] = useState('');
  const [variants, setVariants] = useState([{ id: Date.now() }]);

  const handleChange = (event) => {
    setType(event.target.value);
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newProduct = {
      _methods: "PUT",
      name: data.name,
      brand: data.brand,
      type: data.type,
      origin: data.origin,
      variants: data.variants
    }
    console.log('newProduct' ,newProduct)
    axios.post(`https://reactjr.coderslab.online/api/products`,newProduct).then((res) => {
      toast.success(`Product created successfully.`);
      refetch();
      reset();
      closeModal();
    }).catch((err) => {
      if (err.response) {
        toast.error(`Something went wrong`);
        // console.error("Error data:", err.response.data);
        // console.error("Error status:", err.response.status);
        // console.error("Error headers:", err.response.headers);
      }
    });
  };

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };
  const removeVariant = (id) => {
    setVariants(variants.filter(variant => variant.id !== id));
  };
const  productType = ['Glass', 'Mug', 'Jug','Plate', 'Cup' ]
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%] max-h-full overflow-y-auto">
        <h3 className="font-bold text-lg text-center my-2">
          Create New Product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Box sx={{ display: 'flex', justifyContent: 'center',}}>
        <Box className="grid grid-cols-2 gap-2 w-10/12 md:w-2/3  justify-items-center">

            <Box sx={{ width: "100%" }}>
              <TextField
              size="small"
                sx={{ width: "100%" }}
                {...register("name", { required: "Type is required" })}
                id="outlined-name-input"
                label="Name"
                type="text"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <TextField
              size="small"
                sx={{ width: "100%" }}
                {...register("brand", {
                  required: "brand is required",
                })}
                id="outlined-brand-input"
                label="Brand"
                type="text"
              />
              {errors.brand && (
                <span className="text-red-500">Brand is required</span>
              )}
            </Box >

            <Box sx={{ width: "100%" }}>
            <FormControl sx={{ width: "100%" }}>
 <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select 
        size="small"
        sx={{ width: "100%" }}
        {...register("type", {
          required: "Type is required",
        })}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={type}
          onChange={handleChange}
          autoWidth
          label="Type"
        >

{
  productType?.map(product=>
    ( <MenuItem sx={{ width: "100%" }} value={product}>{product}</MenuItem>)
  )
}
        </Select>
        </FormControl>
          {errors.items && (
            <span className="text-red-500">*Type is required</span>
          )}
        </Box>


        
            <Box sx={{ width: "100%" }}>
            <TextField
            size="small"
              sx={{ width: "100%" }}
              {...register("origin", {
                required: "origin is required",
              })}
              id="outlined-origin-input"
              label="Origin"
              type="text"
            />
            {errors.origin && (
              <span className="text-red-500">Origin is required</span>
            )}
          </Box>


          </Box>
        </Box>

          
<h3 className="text-xl font-semibold my-8 md:my-24 text-center">Variants</h3>

{variants.map((variant, index) => (
            <Box key={variant.id} className="flex justify-between gap-2 w-full">
              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  sx={{ width: "100%" }}
                  {...register(`variants[${index}].color`, { required: "Color is required" })}
                  id={`outlined-color-input-${variant.id}`}
                  label="Color"
                  type="text"
                />
                {errors.variants?.[index]?.color && (
                  <span className="text-red-500">Color is required</span>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  sx={{ width: "100%" }}
                  {...register(`variants[${index}].specification`, { required: "Specification is required" })}
                  id={`outlined-specification-input-${variant.id}`}
                  label="Specification"
                  type="text"
                />
                {errors.variants?.[index]?.specification && (
                  <span className="text-red-500">Specification is required</span>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  sx={{ width: "100%" }}
                  {...register(`variants[${index}].size`, { required: "Size is required" })}
                  id={`outlined-size-input-${variant.id}`}
                  label="Size"
                  type="text"
                />
                {errors.variants?.[index]?.size && (
                  <span className="text-red-500">Size is required</span>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Button
                  sx={{
                    backgroundColor: '#83CBEB',
                    color: 'white',
                    '&:hover': { backgroundColor: '#66B2D6', color: 'white' }
                  }}
                  onClick={addVariant}
                >
                  <AddIcon />
                </Button>
                {variants.length > 1 && (
                  <Button
                    sx={{
                      backgroundColor: '#83CBEB',
                      color: 'white',
                      '&:hover': { backgroundColor: '#66B2D6', color: 'white' }
                    }}
                    onClick={() => removeVariant(variant.id)}
                  >
                    <RemoveIcon />
                  </Button>
                )}
              </Box>
            </Box>
          ))}


          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
              onClick={closeModal}
            >
              Close
            </button>
            <button type="submit" className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
