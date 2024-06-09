/* eslint-disable react/prop-types */
import { Box, TextField } from "@mui/material";
import { useContext,} from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const OrderInfo = ({ handleSubmitOrder }) => {
  const {selectedDetails} = useContext(AuthContext);
  const totalQuantities = selectedDetails.map(item => item.quantity).reduce((acc, quantity) => acc + quantity, 0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newOrderData = {name: data.name, email: data.email, address: data.address,total_quantity: totalQuantities, details: selectedDetails}
    handleSubmitOrder(newOrderData); 
  
  };


  return (
    <form  id="order-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    <Box sx={{ display: 'flex', justifyContent: 'center',}}>
    <Box className="grid grid-cols-2 gap-2 w-11/12 md:w-2/3  justify-items-center">

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
            {...register("email", {
              required: "email is required",
            })}
            id="outlined-email-input"
            label="Email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500">*Email is required</span>
          )}
        </Box >

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
        />
        {errors.address && (
          <span className="text-red-500">*Address is required</span>
        )}
      </Box>

      <Box sx={{ width: "100%" }}>
              <TextField
              size="small"
                sx={{ width: "100%" }}
                id="outlined-quantity-input"
                label="Quantity"
                type="text"
                inputProps={{ readOnly: true }}
                defaultValue={totalQuantities}
              />
            </Box>

      </Box>
    </Box>


    </form>
  )
}

export default OrderInfo;