import React, { useState } from "react";
import { SketchPicker } from "react-color";

function PostInput({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Default color

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newNote = {
      title,
      content,
      color: selectedColor,
    };

    addNote(newNote);

    setTitle("");
    setContent("");
    setShowColorPicker(false);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((toggle) => !toggle);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  return (
    <div className="inputContainer">
      <form
        className="PostInput"
        onSubmit={handleSubmit}
        style={{ backgroundColor: selectedColor }}
      >
        <input
          type="text"
          placeholder="Title.."
          className="title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Write a note.."
          className="content"
          value={content}
          onChange={handleContentChange}
          required={true}
        />
        <div className="btn">
          <img
            className="colorPicker"
            alt="colorPicker"
            src="./colorPicker.png"
            onClick={toggleColorPicker}
          />
          <button type="submit">Post</button>
          <div className="colorPickerContainer">
            {showColorPicker && (
              <SketchPicker
                color={selectedColor}
                onChange={handleColorChange}
                className="SketchPicker"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostInput;
