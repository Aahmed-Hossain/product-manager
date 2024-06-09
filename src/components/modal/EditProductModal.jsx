/* eslint-disable react/prop-types */
import  { useState } from "react";
import { useForm , useFieldArray} from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box,FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const EditProductModal = ({ closeModal, product,refetch }) => {
    const {id, name, brand, type, origin, variants} = product;

    const [typeValue, setTypeValue] = useState(type);
  
    const handleChange = (event) => {
        setTypeValue(event.target.value);
    };
    const cleanedVariants = variants.map(({ color, specification, size }) => ({
        color,
        specification,
        size,
      }));
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      brand,
      type: typeValue,
      origin,
      variants: cleanedVariants,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(data.variants)
    const updatedProduct = {
      name: data.name,
      brand: data.brand,
      type: data.type,
      origin: data.origin,
      variants: data.variants
    }
    axios.put(`https://reactjr.coderslab.online/api/products/${id}`,updatedProduct).then((res) => {
      console.log(res);
      toast.success(`Product updated successfully.`);
      refetch();
      reset();
      closeModal();
    }).catch((err) => {
      console.error("Errors:", err);
      if (err.response) {
        toast.error(`Something went wrong`);
        // console.error("Error data:", err.response.data);
        // console.error("Error status:", err.response.status);
        // console.error("Error headers:", err.response.headers);
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%] max-h-full overflow-y-auto">
        <h3 className="font-bold text-lg text-center my-2 text-black">
          Update the Product
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
                defaultValue={name}
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
                defaultValue={brand}
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
          defaultValue={typeValue}
          onChange={handleChange}
          autoWidth
          label="Type"
        >
          <MenuItem sx={{ width: "100%" }} value={'Mug'}>Mug</MenuItem>
          <MenuItem sx={{ width: "100%" }} value={'Cup'}>Cup</MenuItem>
          <MenuItem sx={{ width: "100%" }} value={'Glass'}>Glass</MenuItem>
 
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
              defaultValue={origin}
            />
            {errors.origin && (
              <span className="text-red-500">Origin is required</span>
            )}
          </Box>


          </Box>
        </Box>

          
<h3 className="text-xl font-semibold my-8 md:my-24 text-center text-black">Variants</h3>






{fields.map((field, idx) => (
            <Box key={idx} className="flex justify-between gap-2 w-full">
              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  {...register(`variants.${idx}.color`, {
                    required: "Color is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-color-input`}
                  label="Color"
                  type="text"
                  defaultValue={field.color}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  {...register(`variants.${idx}.specification`, {
                    required: "Specification is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-specification-input`}
                  label="Specification"
                  type="text"
                  defaultValue={field.specification}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                size="small"
                  {...register(`variants.${idx}.size`, {
                    required: "Size is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-size-input`}
                  label="Size"
                  type="text"
                  defaultValue={field.size}
                />
              </Box>
            </Box>
          ))}









{/* {
    variants?.map((variant, idx)=> (
<Box key={idx} className="flex justify-between gap-2 w-full">
              <Box  sx={{ width: "100%" }}>
                <TextField
                 {...register("color", {
                    required: "Color is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-color-input`}
                  label="Color"
                  type="text"
              defaultValue={variant?.color}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                {...register("specification", {
                    required: "Specification is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-specification-input`}
                  label="Specification"
                  type="text"
                  defaultValue={variant?.specification}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                 {...register("size", {
                    required: "Size is required",
                  })}
                  sx={{ width: "100%" }}
                  id={`outlined-size-input`}
                  label="Size"
                  type="text"
                  defaultValue={variant?.size}
                />
              </Box>
            </Box>
    ))
} */}


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

export default EditProductModal;
