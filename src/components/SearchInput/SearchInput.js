import React from "react";
import { SearchIcon } from "../../assets/icons";
import "./SearchInput.scss";

const SearchInput = ({ name, value, onChange }) => {
  return (
    <div className="flex justify-between items-center px-3 py-2 border border-media-primary-gray rounded-2xl">
      <input
        type="text"
        name={name}
        value={value}
        placeholder="Cari ..."
        className="text-xs search"
        onChange={onChange}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
