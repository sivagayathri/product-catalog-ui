import { useState, useEffect, useRef } from 'react';
import './filters.css';

const Filters = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (title) => {
    if (selectedCategories.includes(title)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== title));
    } else {
      setSelectedCategories([...selectedCategories, title]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="filters-row">
      <span>Search by Product Name</span>
      <input
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <span>Price Range</span>
      <select
        className="filter-select"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value=""></option>
        <option value="0-30">$0 - $30</option>
        <option value="31-60">$31 - $60</option>
        <option value="61-100">$61 - $100</option>
      </select>

      <span>Category</span>

      <div className="dropdown-container" ref={dropdownRef}>
        <div className="dropdown-display" onClick={toggleDropdown}>
          <span>
            {selectedCategories.length === 0
              ? ''
              : selectedCategories.join(', ')}
          </span>
          <span className="arrow">▼</span>
        </div>

        {open && (
          <div className="dropdown-menu">
            {categories.map((cat) => (
              <label key={cat.id} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.title)}
                  onChange={() => handleSelect(cat.title)}
                />
                {cat.title}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
