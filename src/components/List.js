import React from 'react';
const List = (props) => { // we're using an arrow function and const variable type, a ES6 features
  const list = props.listItems.map((el, i) => (
    <li
      key={i}
      style={
        el.done
          ? { textDecoration: 'line-through', fontSize: '20px', height: 40 }
          : { textDecoration: 'none', fontSize: '20px', color: "red", height: 40 }
      }>
      <span onClick={props.onClick.bind(null, i)}>{el.item}</span>
      <button onClick={props.onRemove.bind(null, i)} className="btn btn-danger pull-right">x</button>
    </li>
  ));
  return (
    <div>
      {list}
    </div>
  )
};

export default List;