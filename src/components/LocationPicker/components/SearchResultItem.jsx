import React from "react";

const SearchResultItem = ({ result, onClick, showBorder = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full cursor-pointer px-3 py-2 text-left text-xs hover:bg-accent hover:text-accent-foreground ${
        showBorder ? "border-t" : ""
      }`}
    >
      <div className="truncate font-medium">{result.display.split(",")[0]}</div>
      <div className="truncate text-[10px] text-muted-foreground">
        {result.display.split(",").slice(1).join(",").trim()}
      </div>
    </button>
  );
};

export default SearchResultItem;
