import "./index.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search products..."
      />

      <button type="button">Search</button>
    </div>
  );
};

export default SearchBar;