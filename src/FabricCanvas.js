import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Create the canvas and add objects on mount
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    setCanvas(fabricCanvas);

    // Create the rectangles
    const rect1 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: "blue",
      left: 50,
      top: 50
    });

    const rect2 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: "red",
      left: 200,
      top: 50
    });

    // Create the text element
    const text = new fabric.Text("Hello", {
      fontSize: 20,
      fill: "white",
      left: 120,
      top: 60
    });

    // Group the objects
    const group = new fabric.Group([rect1, rect2, text], {
      left: 100,
      top: 100
    });

    fabricCanvas.add(group);

    return () => fabricCanvas.dispose(); // Cleanup
  }, []);

  // Group objects
  const groupObjects = () => {
    if (canvas) {
      const activeObj = canvas.getActiveObject();
      console.log(activeObj);
      if (activeObj) {
        const activeGroup = activeObj.toGroup();
        const objectsInGroup = activeGroup.getObjects();

        activeGroup.clone(function(newGroup) {
          canvas.remove(activeGroup);
          objectsInGroup.forEach(function(object) {
            canvas.remove(object);
          });
          canvas.add(newGroup);
          canvas.setActiveObject(newGroup);
          canvas.requestRenderAll();
        });
      }
    }
  };

  // Ungroup objects
  const ungroupObjects = () => {
    if (canvas) {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "group") {
        const items = activeObj._objects;
        canvas.remove(activeObj);
        items.forEach(function(item) {
          canvas.add(item);
        });
        canvas.renderAll();
      }
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={400} height={400} />
      <button onClick={groupObjects}>Group</button>
      <button onClick={ungroupObjects}>Ungroup</button>
    </div>
  );
};

export default FabricCanvas;
