import React from "react";

const Filter = ({ onChange, }) => {
  return (
    <>
      <label>
        <input onChange={onChange} placeholder="filter by name" />
      </label>
    </>
  );
};

export default Filter;
