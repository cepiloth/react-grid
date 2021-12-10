import React, { Component, useEffect, useState, useRef } from "react";
import { render } from "react-dom";

import CanvasDraw from "react-canvas-draw";
import classNames from "./index.css";

export default function Demo() {
  const [color, setColor] = useState(0x000000);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [brushRadius, setBrushRadius] = useState(10);
  const [lazyRadius, setLazyRadius] = useState(12);
  const saveableCanvas = useRef();

  return (
    <div>
      <h1>React Canvas Draw</h1>
      <h2>Save & Load</h2>
      <p>
        This part got me most excited. Very easy to use saving and loading of
        drawings. It even comes with a customizable loading speed to control
        whether your drawing should load instantly (loadTimeOffset = 0) or
        appear after some time (loadTimeOffset 0){" "}
        <span>{`<CanvasDraw loadTimeOffset={10} />`}</span>
      </p>
      <p>Try it out! Draw something, hit "Save" and then "Load".</p>
      <div className={classNames.tools}>
        <button
          onClick={() => {
            localStorage.setItem("savedDrawing", saveableCanvas.getSaveData());
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            saveableCanvas.eraseAll();
          }}
        >
          Erase
        </button>
        <button
          onClick={() => {
            saveableCanvas.undo();
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            console.log(saveableCanvas.getDataURL());
            alert("DataURL written to console");
          }}
        >
          GetDataURL
        </button>
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Brush-Radius:</label>
          <input
            type="number"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Lazy-Radius:</label>
          <input
            type="number"
            value={lazyRadius}
            onChange={(e) => setLazyRadius(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      <CanvasDraw
        ref={saveableCanvas}
        brushColor={color}
        brushRadius={brushRadius}
        lazyRadius={lazyRadius}
        canvasWidth={width}
        canvasHeight={height}
      />
      <p>
        The following is a disabled canvas with a hidden grid that we use to
        load & show your saved drawing.
      </p>
      <button
        onClick={() => {
          this.loadableCanvas.loadSaveData(
            localStorage.getItem("savedDrawing")
          );
        }}
      >
        Load what you saved previously into the following canvas. Either by
        calling `loadSaveData()` on the component's reference or passing it the
        `saveData` prop:
      </button>
      <CanvasDraw
        disabled
        hideGrid
        ref={saveableCanvas}
        saveData={localStorage.getItem("savedDrawing")}
      />
      <p>
        The saving & loading also takes different dimensions into account.
        Change the width & height, draw something and save it and then load it
        into the disabled canvas. It will load your previously saved masterpiece
        scaled to the current canvas dimensions.
      </p>
    </div>
  );
}
