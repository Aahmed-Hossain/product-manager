/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import useAllOrders from "../../hooks/useAllOrders";

const EditOrderModal = ({ closeModal, order }) => {
  const [, refetch] = useAllOrders();
  const { address, email, name, total_quantity, details, id } = order;

  const variantDetails = details?.map((variant) => ({
    quantity: variant.quantity,
    variant_id: variant.variant.id,
  }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address,
      email,
      name,
      total_quantity,
      details,
    },
  });

  const onSubmit = (data) => {
    const updatedOrder = {
      _methods: "PUT",
      name: data.name,
      email: data.email,
      address: data.address,
      total_quantity: data.total_quantity,
      details: variantDetails,
    };
    axios
      .put(`https://reactjr.coderslab.online/api/orders/${id}`, updatedOrder)
      .then((res) => {
        console.log(res);
        toast.success(`Order Updated successfully.`);
        refetch();
        reset();
        closeModal();
      })
      .catch((err) => {
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
          Update Order
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box className="grid grid-cols-2 gap-2 w-11/12 md:w-2/3  justify-items-center">
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
                  {...register("email", {
                    required: "Email is required",
                  })}
                  id="outlined-brand-input"
                  label="Email"
                  type="email"
                  defaultValue={email}
                />
                {errors.brand && (
                  <span className="text-red-500">Email is required</span>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  size="small"
                  sx={{ width: "100%" }}
                  {...register("address", {
                    required: "address is required",
                  })}
                  id="outlined-address-input"
                  label="Address"
                  type="text"
                  defaultValue={address}
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </Box>

              <Box sx={{ width: "100%" }}>
                <TextField
                  size="small"
                  sx={{ width: "100%" }}
                  {...register("total_quantity", {
                    required: "total_quantity is required",
                  })}
                  id="outlined-total_quantity-input"
                  label="Total Quantity"
                  type="number"
                  defaultValue={total_quantity}
                />
                {errors.total_quantity && (
                  <span className="text-red-500">
                    Total Quantity is required
                  </span>
                )}
              </Box>
            </Box>
          </Box>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className=" bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
