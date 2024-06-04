import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize canvas
    const canvas = new fabric.Canvas(canvasRef.current);

    // Add an object to the canvas
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 50,
      height: 50,
      hasControls: true, // Disable resizing and rotation controls
    });
    canvas.add(rect);

    // Enable object selection and movement
    canvas.selection = false;
    canvas.on('mouse:down', (event) => {
      if (event.target) {
        const selectedObject = event.target;
        selectedObject.set('opacity', 0.5);
        canvas.renderAll();
      }
    });

    canvas.on('mouse:up', (event) => {
      if (event.target) {
        const selectedObject = event.target;
        selectedObject.set('opacity', 1);
        canvas.renderAll();
      }
    });

    // Clean up on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
    </div>
  );
};

export default FabricCanvas;
