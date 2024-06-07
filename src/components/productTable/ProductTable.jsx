import useAllProducts from "../../hooks/useAllProducts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AddButton from "../shared/button/AddButton";
import Pagination from "../shared/pagination/Pagination";
import SearchInput from "../shared/button/SearchInput";
import Header from "../shared/header/Header";
import { useState } from "react";
import CreateModal from './../modal/CreateModal';
import ViewModal from "../modal/ViewModal";
import EditProductModal from "../modal/EditProductModal";
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


  const [allProducts, refetch , isLoading] = useAllProducts();
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
          marginTop: "6rem",
        }}
      >
        <CircularProgress sx={{ color: "#0F9ED5" }} />
      </Box>
    );
  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="">
      <Header>{"Product"}</Header>
      <div className="px-1 md:px-4">
        <div className="flex justify-between mt-12 mb-3">
          <AddButton onClick={openCreateModal}>Create</AddButton>
          {showCreateModal && <CreateModal closeModal={closeModal} refetch={refetch} />}
          <SearchInput onSearch={handleSearch} />
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
                  <button className="cursor-pointer hover:text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={1}
          totalPages={4}
          onPageChange={(page) => console.log(`Page changed to ${page}`)}
        />
      </div>
    </div>
  );
};

export default ProductTable;
