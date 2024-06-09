import useAllProducts from "../../hooks/useAllProducts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddButton from "../shared/button/AddButton";
import Pagination from "../shared/pagination/Pagination";
import SearchInput from "../shared/button/SearchInput";
import Header from "../shared/header/Header";
import {  useMemo, useState } from "react";
import CreateModal from './../modal/CreateModal';
import ViewModal from "../modal/ViewModal";
import EditProductModal from "../modal/EditProductModal";
import axios from "axios";
import { toast } from "react-toastify";

const ProductTable = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowViewModal(false);
    setShowCreateModal(false);
    setShowEditModal(false);
  };

  
  const openViewModal = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const [allProducts, refetch , isLoading,handleChangePage, currentPage, handleSearch,
    seachQuery] = useAllProducts();
  const totolPage = useMemo(()=>Math.ceil(allProducts?.data?.total/10),[allProducts?.data?.total])

  
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
          marginY: "6rem",
        }}
      >
        <CircularProgress sx={{ color: "#0F9ED5" }} />
      </Box>
    );

  const handleDelete = (id) => {
    axios.delete(`https://reactjr.coderslab.online/api/products/${id}`)
      .then((response) => {
        console.log(response)
        toast.success(`Product Deleted Successfully `);
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting the item:", error);
      });
  };


  const confirmDelete = (id,product) => {
    toast.warn(
      <div>
        <p>{`Do you really want to delete ${product.name}?`}</p>
        <div className="flex gap-4">
          <button
            className="bg-red-300 px-3 my-2 rounded-md"
            onClick={() => {
              handleDelete(id);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-300 px-3 my-2 rounded-md"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        closeButton: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };
  return (
    <div className="">
      <Header>{"Product"}</Header>
      <div className="px-1 md:px-4">
        <div className="flex justify-between mt-12 mb-3">
          <AddButton  onClick={openCreateModal}>Create</AddButton>
          {showCreateModal && <CreateModal closeModal={closeModal} refetch={refetch} />}
          <SearchInput seachQuery={seachQuery} handleSearch={handleSearch}  />
        </div>
        <table className="w-full border-separate">
          <thead>
            <tr className="text-center bg-[#0F9ED5] text-white ">
              <th className="px-1 py-2 hidden md:block">ID</th>
              <th className="px-1 py-2">Name</th>
              <th className="px-1 py-2">Brand</th>
              <th className="px-1 py-2">Type</th>
              <th className="px-1 py-2 hidden md:block">Created At </th>
              <th className="px-1 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.data?.data?.map((product, idx) => (
              <tr
                key={idx}
                className="text-sm lg:font-medium  odd:bg-[#CCDFEF] even:bg-[#E7F0F7] text-center"
              >
                <td className=" px-1 py-2 hidden md:block">{idx + 1}</td>
                <td className="px-1 py-2">{product.name}</td>
                <td className="px-1 py-2">{product.brand}</td>
                <td className=" px-1 py-2 ">{product.type}</td>
                <td className="px-1 py-2 hidden md:block">
                  {formatDate(product.created_at)}
                </td>
                <td className="px-1 py-2 text-red-400 space-x-1">
                  <button onClick={() => openViewModal(product)} className="cursor-pointer hover:text-red-600">
                    View
                  </button>
                  {showViewModal && <ViewModal closeModal={closeModal}  product={selectedProduct}/>}
                  |
                  <button onClick={() => openEditModal(product)} className="cursor-pointer hover:text-red-600">
                    Edit
                  </button>
                  {showEditModal && <EditProductModal closeModal={closeModal} refetch={refetch}  product={selectedProduct}/>}
                  |
                  <button onClick={()=> confirmDelete(product.id, product)} className="cursor-pointer hover:text-red-600">
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

export default ProductTable;
