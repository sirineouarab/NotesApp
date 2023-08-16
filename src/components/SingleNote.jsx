import React from "react";
import "../App.css";

function SingleNote(props) {
  const del = () => {
    props.deleteNote(props.index);
  };

  const noteStyle = {
    background: props.color,
  };

  return (
    <div className="note" style={noteStyle}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <img
        className="delete"
        alt="delete"
        src="./delete.png"
        onClick={del}
      ></img>
    </div>
  );
}

export default SingleNote;
