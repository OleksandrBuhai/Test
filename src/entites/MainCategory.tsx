import React, { useState, MouseEvent, useCallback } from 'react';

interface Position {
  top: number;
  left: number;
  pos3: number;
  pos4: number;
}

const DraggableDiv: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    pos3: 0,
    pos4: 0,
  });
  const [dragging, setDragging] = useState(false);

  const startDragging = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setPosition({
      ...position,
      pos3: e.clientX,
      pos4: e.clientY,
    });
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('mousemove', handleDragging as unknown as EventListener);
  }, [position]);

  const handleDragging = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (dragging) {
      const { pos3, pos4 } = position;
      const newPos = {
        pos1: pos3 - e.clientX,
        pos2: pos4 - e.clientY,
        pos3: e.clientX,
        pos4: e.clientY,
      };
      setPosition({
        top: position.top - newPos.pos2,
        left: position.left - newPos.pos1,
        ...newPos,
      });
    }
  }, [dragging, position]);

  const stopDragging = useCallback(() => {
    setDragging(false);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('mousemove', handleDragging as unknown as EventListener);
  }, [handleDragging]);

  const { top, left } = position;

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 9,
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
        border: '1px solid #d3d3d3',
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div
        style={{
          padding: '10px',
          cursor: 'move',
          zIndex: 10,
          backgroundColor: '#2196F3',
          color: '#fff',
        }}
        onMouseDown={startDragging}
      >
        Click here to move
      </div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>
  );
};

export default DraggableDiv;
