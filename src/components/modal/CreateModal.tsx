import React from 'react';
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
      <div className="bg-white rounded-md shadow-lg px-6 md:px-16 py-4 md:py-6">
        <h3 className="font-bold text-lg">Create New Food Item</h3>
        <p className="py-4">Fill out the form to add a new food item.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Box>
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

          <Box>
            <TextField
              sx={{ width: "100%" }}
              {...register("description", { required: "Description is required" })}
              id="outlined-description-input"
              label="Food Description"
              type="text"
              multiline
              rows={2}
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </Box>

          <Box>
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
          
          <Box>
            <TextField
              sx={{ width: "100%" }}
              {...register("image", { required: "Image URL is required" })}
              id="outlined-image-input"
              label="Image URL"
              type="text"
            />
            {errors.image && (
              <span className="text-red-500">Image URL is required</span>
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
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-green-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
