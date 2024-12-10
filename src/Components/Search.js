import React from "react";

// icons
import { BiSearch } from "react-icons/bi";

// Context
import { useFilter } from "../Providers/Context/filter_context";

const Search = () => {
  const { filters, updateFilters } = useFilter();
  const { search } = filters;

  return (
    <div className="flex items-center justify-between mb-7 sm:w-2/4 lg:w-1/4 mx-3 bg-gray-200 px-4 py-2.5 xl:mx-0 text-lg rounded-full">
      <input
        type="text"
        name="search"
        value={search}
        onChange={updateFilters}
        placeholder="Search"
        className="bg-transparent w-full outline-none font-medium"
      />
      <BiSearch size="25px" />
    </div>
  );
};

export default Search;
