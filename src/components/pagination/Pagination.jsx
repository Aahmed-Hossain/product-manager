/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center space-x-2 my-4">
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#C1E5F5] ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#C1E5F5] ${
            currentPage === index + 1 ? 'text-white bg-blue-500' : 'text-black'
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md bg-[#C1E5F5] ${
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
