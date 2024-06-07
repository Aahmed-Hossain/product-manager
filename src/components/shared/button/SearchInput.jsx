import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
      setSearchTerm('');
    }
  };

  return (
    <div className='flex items-center'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        onClick={handleSearch}
        onKeyPress={handleKeyPress}
        placeholder="Search..."
        className='text-gray-400 font-semibold py-1 w-[10rem] md:w-[14rem] rounded-md border-2 border-[#83CBEB] text-xl mr-2 px-2'
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchInput;
