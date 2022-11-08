import React from "react";

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <label>
          <input
            onChange={props.inputNameOnChange}
            value={props.inputNameValue}
            placeholder="name"
          />
        </label>
        <br />
        <label>
          <input
            onChange={props.inputPhoneOnChange}
            value={props.inputPhoneValue}
            placeholder="phone"
          />
        </label>

        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
