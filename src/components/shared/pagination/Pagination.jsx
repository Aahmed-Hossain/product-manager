/* eslint-disable react/prop-types */
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
//   const handleClick = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   return (
//     <div className="flex justify-center space-x-2 my-4">
//       <button
//         className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
//           currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//         }`}
//         onClick={() => handleClick(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         {'<'}
//       </button>
//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index + 1}
//           className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
//             currentPage === index + 1 ? 'text-white bg-blue-500' : 'text-black'
//           }`}
//           onClick={() => handleClick(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
//           currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//         }`}
//         onClick={() => handleClick(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         {'>'}
//       </button>
//     </div>
//   );
// };

// export default Pagination;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = (currentPage, totalPages) => {
    const maxVisiblePages = 4;
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center space-x-2 my-4">
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {visiblePages.map(page => (
        <button
          key={page}
          className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
            currentPage === page ? 'text-white bg-blue-500' : 'text-black'
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#83CBEB] ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;

