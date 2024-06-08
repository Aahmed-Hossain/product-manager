/* eslint-disable react/prop-types */

const SearchInput = ({ seachQuery, handleSearch }) => {

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={seachQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        className="text-gray-400 font-semibold py-1 w-[10rem] md:w-[14rem] rounded-md border-2 border-[#83CBEB] text-xl mr-2 px-2"
      />
    </div>
  );
};
export default SearchInput;
