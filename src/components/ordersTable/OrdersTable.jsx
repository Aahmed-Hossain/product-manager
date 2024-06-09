import AddButton from "../shared/button/AddButton";
import Pagination from "../shared/pagination/Pagination";
import SearchInput from "../shared/button/SearchInput";
import Header from "../shared/header/Header";
import useAllOrders from "../../hooks/useAllOrders";
import { Box, CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";
import CreateOrderModal from "../modal/CreateOrderModal";
import axios from "axios";
import { toast } from "react-toastify";
import ViewOrderModal from "../modal/ViewOrderModal";
import EditOrderModal from "../modal/EditOrderModal";
const OrdersTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };
  const closeModal = () => {
    setShowCreateModal(false);
    setShowViewOrderModal(false)
    setShowEditOrderModal(false)
  };

  const openViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewOrderModal(true);
  };
  const openEditOrderModal = (order) => {
    setSelectedOrder(order);
    setShowEditOrderModal(true);
  };

  const [allOrders, refetch, isLoading, handleChangePage,
    currentPage,
    handleSearch,
    seachQuery, ] = useAllOrders();
    const totolPage = useMemo(()=>Math.ceil(allOrders?.data?.total/10),[allOrders?.data?.total])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: "12rem",
        }}
      >
        <CircularProgress sx={{ color: "#0F9ED5" }} />
      </Box>
    );

    const handleDelete = (id) => {
      axios.delete(`https://reactjr.coderslab.online/api/orders/${id}`)
        .then((response) => {
          console.log(response)
          toast.success(`Order Deleted Successfully `);
          refetch();
        })
        .catch((error) => {
          console.error("Error deleting the item:", error);
        });
    };
  return (
    <div className="mt-48">
      <Header>{"Orders"}</Header>
      <div className="px-1 md:px-4">
        <div className="flex justify-between mt-12 mb-3">
          <AddButton onClick={openCreateModal}>Create</AddButton>
          {showCreateModal && <CreateOrderModal closeModal={closeModal} refetch={refetch} />}
          <SearchInput seachQuery={seachQuery} handleSearch={handleSearch}  />
        </div>
        <table className="w-full border-separate">
          <thead>
            <tr className="text-center bg-[#0F9ED5] text-white ">
              <th className="px-1 py-2 hidden md:block">ID</th>
              <th className="px-1 py-2">Name</th>
              <th className="px-1 py-2">Email</th>
              <th className="px-1 py-2 hidden md:block">Address</th>
              <th className="px-1 py-2 ">Total Quantity</th>
              <th className="px-1 py-2 hidden md:block">Created At</th>
              <th className="px-1 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.data?.data?.map((order, idx) => (
              <tr
                key={idx}
                className="text-sm lg:font-medium  odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
              >
                <td className=" px-1 py-2 hidden md:block">{idx + 1}</td>
                <td className="px-1 py-2">{order.name}</td>
                <td className="px-1 py-2">{order.email}</td>
                <td className=" px-1 py-2 hidden md:block ">{order.address}</td>
                <td className=" px-1 py-2 ">{order.total_quantity}</td>
                <td className="px-1 py-2 hidden md:block">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-1 py-2 text-red-400 space-x-1">
                  <button
                   onClick={() => openViewModal(order)}
                  className=" hover:text-red-600">
                    View
                  </button>
                  {showViewOrderModal && <ViewOrderModal closeModal={closeModal}  order={selectedOrder}/>}
               
                  |
                  <button
                  onClick={()=>openEditOrderModal(order)}
                  className=" hover:text-red-600">
                    Edit

                  </button>
                  {showEditOrderModal && <EditOrderModal closeModal={closeModal}  order={selectedOrder}/>}
                  |
                  <button 
                  onClick={()=>handleDelete(order.id)}
                  className=" hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
       currentPage={currentPage}
       totalPages={totolPage ?? 1}
       onPageChange={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  );
};

export default OrdersTable;