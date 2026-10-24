import "./index.css";

const CategoryFilter = ({ categories, value, onChange }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Category:</label>

      <select id="category" value={value} onChange={onChange}>
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;