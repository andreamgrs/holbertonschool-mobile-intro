import { useState } from "react";

//using props youy can pass data to our components, props are inmutable
interface Props {
  items: string[];
  heading: string;
  //To pass a function so the user can be redirect once click
  onSelectItem: (item: string) => void;
}
// you can add, items and heading, onSelectItem to not use props.
function ListGroup(props: Props) {
  //hook can have data that can change over time
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{props.heading}</h1>
      {props.items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {props.items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              props.onSelectItem(item);
            }} // terminar
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
