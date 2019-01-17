import React from 'react';
const Input = (props) => {

  return (
    <form>
      <div
        className="form-group">
        <label
          style={{ marginTop: 40 }}
          htmlFor="listInput">
          879773877@qq.com
        </label>
        <input
          type="text"
          className="form-control"
          style={{ marginTop: 20 }}
          id="listItemInput"
          placeholder="Add new todo"
          value={props.value}
          onChange={props.onInputChange}
        />
        <button
          className="btn btn-primary"
          style={{ marginTop: 20 }}
          onClick={props.onSubmit}>
          Add Item
        </button>
      </div>
    </form>
  )
};
export default Input