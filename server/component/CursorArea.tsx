import { useState, useEffect, MouseEventHandler } from "react";
import { socket as ws } from "../utils/socket";
import Cursor from "./Cursor";

const CursorArea = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorMap, setCursorMap] = useState(new Map<string, JSX.Element>());

  useEffect(() => {
    if (ws) {
      ws.onopen = (event) => {
        ws.send(JSON.stringify({ id: "hello", color: "red" }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        updateOrCreateCursorFor(message);
      };
    }
  }, []);

  // if a cursor with the user id exists, updates it's information
  // if no cursor exists, create a new one with the information
  const updateOrCreateCursorFor = (message: {
    x: number;
    y: number;
    sender: string;
    color: number;
  }) => {
    const { sender, x, y, color } = message;

    setCursorMap(
      new Map(
        cursorMap.set(
          sender,
          <Cursor key={sender} x={x} y={y} color={`hsl(${color}, 100%, 50%)`} />
        )
      )
    );
  };

  // When the mouse is moved, send the x & y coords to the server
  const handleMouseMove: MouseEventHandler = (e) => {
    setMousePos({ x: e.pageX, y: e.pageY });
    const message = { x: e.clientX, y: e.clientY };
    ws.send(JSON.stringify(message));
  };

  return (
    <div onMouseMove={handleMouseMove} className="container">
      <>{[...cursorMap.values()]}</>

      <p>MouseX: {mousePos.x}</p>
      <p>MouseY: {mousePos.y}</p>
    </div>
  );
};

export default CursorArea;
