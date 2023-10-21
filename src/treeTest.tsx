// App.js
import React, { useState } from "react";
import "./App.css";

const ResizableBox = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const onDrag = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="container">
      <div
        className="inner-box"
        style={{
          width: `${200 * scale}px`,
          height: `${200 * scale}px`,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        draggable="true"
        onDrag={onDrag}
      />
      <div className="controls">
        <label>
          Scale:
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={onScaleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ResizableBox;
