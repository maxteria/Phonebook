import React from "react";

const Filter = ({ onChange, text }) => {
  return (
    <>
      <label>
        {text}
        <input onChange={onChange} />
      </label>
    </>
  );
};

export default Filter;
