import React, { useState, useEffect } from "react";
import "./Magnify.css"; // Create a CSS file for styling
import { Button } from "reactstrap";

const ImageZoom = ({ imageSrc }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.deltaY > 0) {
        // Scroll down
        if (!e.shiftKey) {
          // Normal scrolling, zoom out vertically
          setScale((prevScale) =>
            prevScale > 0.2 ? prevScale - 0.1 : prevScale
          );
        } else {
          // Shift key + scrolling, zoom out faster
          setScale((prevScale) =>
            prevScale > 0.1 ? prevScale - 0.2 : prevScale
          );
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        if (!e.shiftKey) {
          // Normal scrolling, zoom in vertically
          setScale((prevScale) => prevScale + 0.1);
        } else {
          // Shift key + scrolling, zoom in faster
          setScale((prevScale) => prevScale + 0.2);
        }
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 0.2 ? prevScale - 0.1 : prevScale));
  };

  const handleMove = (direction) => {
    if (direction === "up") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y - 15,
      }));
    } else if (direction === "down") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + 15,
      }));
    } else if (direction === "left") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x - 15,
      }));
    } else if (direction === "right") {
      setPosition((prevPosition) => ({
        ...prevPosition,
        x: prevPosition.x + 15,
      }));
    }
  };

  const handleImageClick = (e) => {
    // Calculate the zoom position based on the click coordinates
    const boundingBox = e.target.getBoundingClientRect();
    const clickX = e.clientX - boundingBox.left;
    const clickY = e.clientY - boundingBox.top;

    // Calculate the offsets based on the current scale
    const xOffset = (clickX - boundingBox.width / 2) * (scale - 1);
    const yOffset = (clickY - boundingBox.height / 2) * (scale - 1);

    setScale(2); // Example: Zoom level when clicking
    setPosition((prevPosition) => ({
      x: prevPosition.x - xOffset,
      y: prevPosition.y - yOffset,
    }));
  };

  return (
    <div className="image-zoom-container">
      <div className="zoom-controls">
        <Button size="sm" onClick={handleZoomIn} color="primary" outline>
          <strong>+</strong>
        </Button>
        <Button size="sm" onClick={handleZoomOut} color="primary" outline>
          <strong>-</strong>
        </Button>
        <Button
          size="sm"
          onClick={() => handleMove("up")}
          color="primary"
          outline
        >
          <strong>&uarr;</strong>
        </Button>
        <Button
          size="sm"
          onClick={() => handleMove("down")}
          color="primary"
          outline
        >
          <strong>&darr;</strong>
        </Button>
        <Button
          size="sm"
          onClick={() => handleMove("left")}
          color="primary"
          outline
        >
          <strong>&larr;</strong>
        </Button>
        <Button
          size="sm"
          onClick={() => handleMove("right")}
          color="primary"
          outline
        >
          <strong>&rarr;</strong>
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setScale(1);
            setPosition({ x: 5, y: 0 });
          }}
          color="primary"
          outline
        >
          <strong>Reset</strong>
        </Button>
      </div>
      <div className="image-zoom">
        <img
          src={imageSrc}
          alt="Image"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            width: "100%", // Keep the width at 100%
          }}
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default ImageZoom;
