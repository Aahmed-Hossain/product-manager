import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

const CreateModal = ({ closeCreateModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success(`Added the Food:`);
    closeCreateModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%]">
        <h3 className="font-bold text-lg text-center my-2">
          Create New Product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Box sx={{ display: 'flex', justifyContent: 'center',}}>
        <Box className="grid grid-cols-2 gap-2 w-10/12 md:w-2/3  justify-items-center">
            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                {...register("name", { required: "Name is required" })}
                id="outlined-name-input"
                label="Food Title"
                type="text"
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                {...register("description", {
                  required: "Description is required",
                })}
                id="outlined-description-input"
                label="Food Description"
                type="text"
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </Box >

            <Box sx={{ width: "100%" }}>
              <TextField
                sx={{ width: "100%" }}
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                id="outlined-price-input"
                label="Food Price"
                type="number"
                inputProps={{ step: "0.01" }}
              />
              {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
            </Box>


            <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              id="outlined-price-input"
              label="Food Price"
              type="number"
              inputProps={{ step: "0.01" }}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </Box>


          </Box>
        </Box>

          

          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register("color", {
                required: "Color is required",
              })}
              id="outlined-color-input"
              label="Color"
              type="text"
            />
            {errors.price && (
              <span className="text-red-500">Color is required</span>
            )}
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register("specification", {
                required: "specification is required",
              })}
              id="outlined-specification-input"
              label="Specification"
              type="text"
            />
            {errors.price && (
              <span className="text-red-500">Specification is required</span>
            )}
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "100%" }}
              {...register("size", {
                required: "size is required",
              })}
              id="outlined-size-input"
              label="Size"
              type="text"
            />
            {errors.price && (
              <span className="text-red-500">Size is required</span>
            )}
          </Box>
          

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-2 py-1 rounded-md bg-red-200"
              onClick={closeCreateModal}
            >
              Close
            </button>
            <button type="submit" className="px-2 py-1 rounded-md bg-green-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
