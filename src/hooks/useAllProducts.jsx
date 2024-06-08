import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { debounce } from "../utils/debounce";

const useAllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [seachQuery, setSearchQuery] = useState('');

  const {
    data: allProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get(
        `https://reactjr.coderslab.online/api/products?search=${seachQuery}&per_page=10&page=${currentPage}`
      );
      return res.data;
    },
  });

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  const debouncedRefetch = useCallback(
    debounce(() => refetch(), 700),
    []
  );

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    debouncedRefetch();
  };
  return [
    allProducts,
    refetch,
    isLoading,
    handleChangePage,
    currentPage,
    handleSearch,
    seachQuery,
  ];
};

export default useAllProducts;
