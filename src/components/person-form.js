import React from "react";

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <label>
          name:
          <input
            onChange={props.inputNameOnChange}
            value={props.inputNameValue}
          />
        </label>
        <br />
        <label>
          number:
          <input
            onChange={props.inputPhoneOnChange}
            value={props.inputPhoneValue}
          />
        </label>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
