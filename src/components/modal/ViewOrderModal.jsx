/* eslint-disable react/prop-types */

import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const ViewOrderModal = ({ closeModal, order }) => {
  const { name, address, details, email, total_quantity } = order;
  console.log(order);
  const variants = details?.map((item) => item.variant);
  console.log(variants);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 md:px-8 py-4 md:py-6 w-[90%] max-h-full overflow-y-auto">
        <h3 className="font-bold text-lg text-center my-2 text-black">
          Create New Product
        </h3>
        <form className="space-y-4">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginY: "10px",
                justifyContent: "center",
              }}
            >
              <Box className="grid grid-cols-2 gap-2 w-10/12 md:w-2/3  justify-items-center">
                <Box sx={{ width: "100%" }}>
                  <TextField
                    size="small"
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
                    size="small"
                    sx={{ width: "100%" }}
                    id="outlined-brand-input"
                    label="Email"
                    type="email"
                    inputProps={{ readOnly: true }}
                    defaultValue={email}
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-address-input"
                    label="Address"
                    type="text"
                    inputProps={{ readOnly: true }}
                    defaultValue={address}
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-address-input"
                    label="Total Quantity"
                    type="text"
                    inputProps={{ readOnly: true }}
                    defaultValue={total_quantity}
                  />
                </Box>
              </Box>
            </Box>
            {variants.length === 0 ? (
              <div className="text-xl font-bold">No Variants</div>
            ) : (
              <table className="w-full border-separate">
                <thead>
                  <tr className="text-center bg-[#0F9ED5] text-white">
                    <th className="px-1 py-2 hidden md:block">ID</th>
                    <th className="px-1 py-2">Color</th>
                    <th className="px-1 py-2">Specification</th>
                    <th className="px-1 py-2">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {variants?.map((variant, idx) => (
                    <tr
                      key={variant.id}
                      className="text-sm lg:font-medium odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
                    >
                      <td className="px-1 py-2 text-black hidden md:block">
                        {idx + 1}
                      </td>
                      <td className="px-1 py-2 text-black">{variant.color}</td>
                      <td className="px-1 py-2 text-black">
                        {variant.specification}
                      </td>
                      <td className="px-1 py-2 text-black">{variant.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-[#83CBEB] hover:bg-[#5ebae2] text-white py-1 rounded-md border-2 border-blue-500 px-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewOrderModal;
