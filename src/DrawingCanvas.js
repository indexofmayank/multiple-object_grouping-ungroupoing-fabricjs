// src/DrawingCanvas.js

import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricCanvasRef.current = canvas;
    
    let isDrawing = false;
    let line, origX, origY;

    canvas.on('mouse:down', function(o) {
      isDrawing = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      const points = [pointer.x, pointer.y, pointer.x, pointer.y];
      line = new fabric.Line(points, {
        strokeWidth: 2,
        fill: 'black',
        stroke: 'black',
        originX: 'center',
        originY: 'center'
      });
      canvas.add(line);
    });

    canvas.on('mouse:move', function(o) {
      if (!isDrawing) return;
      const pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });

    canvas.on('mouse:up', function(o) {
      isDrawing = false;
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />;
};

export default DrawingCanvas;
