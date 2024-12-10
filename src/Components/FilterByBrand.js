import React from "react";

// Context
import { useFilter } from "../Providers/Context/filter_context";
import { buttons } from "../utils/helper";

const FilterByBrand = () => {
  const { filters, updateFilters } = useFilter();

  return (
    <section className="flex items-center gap-2 text-lg mb-5 px-3 pb-4 lg:p-0 lg:pb-4 no-scrollbar overflow-x-auto border-b">
      {buttons.map((item) => (
        <button
          onClick={updateFilters}
          value={item.name.toLowerCase()}
          name="brand"
          key={item.id}
          className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-full bg-white cursor-pointer ${
            item.name.toLowerCase() === filters.brand.toLowerCase() &&
            "bg-orange-600 text-white"
          }`}
        >
          {item.imageURL && (
            <img
              className="block w-10 h-8 pointer-events-none"
              src={item.imageURL}
              alt={`${item.name} Logo`}
            />
          )}
          <p
            className="pointer-events-none"
            name="brand"
            value={item.name.toLowerCase()}
            onClick={updateFilters}
          >
            {item.name}
          </p>
        </button>
      ))}
    </section>
  );
};

export default FilterByBrand;
