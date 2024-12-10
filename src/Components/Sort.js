import React from "react";

import { useFilter } from "../Providers/Context/filter_context";

const Sort = () => {
  const { sort, updateSort } = useFilter();

  return (
    <select
      name="sort"
      value={sort}
      onChange={updateSort}
      className="flex items-center gap-2 bg-transparent focus:outline-none border border-slate-700 focus:border-2 rounded-md px-2 py-1"
    >
      <option value="highest">Price : High-Low</option>
      <option value="lowest">Price : Low-High</option>
    </select>
  );
};

export default Sort;
