import React, { ReactNode, useState, MouseEvent, useCallback } from "react";

interface IndividualProps {
  name: string;
  parent?: string;
  children?: ReactNode;
  onAddChild?: (parent: string, childId: number) => void;
  onDragStart?: (e: MouseEvent, name: string) => void;
}

interface Position {
  top: number;
  left: number;
  pos3: number;
  pos4: number;
}

const individualStyle = {
  position: "absolute",
  padding: "10px",
  textAlign: "left",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const Individual: React.FC<IndividualProps> = ({
  name,
  parent,
  children,
  onAddChild,
  onDragStart,
}) => {
  const [childIdCounter, setChildIdCounter] = useState(1);
  const [childComponents, setChildComponents] = useState<JSX.Element[]>([]);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    pos3: 0,
    pos4: 0,
  });
  const [dragging, setDragging] = useState(false);

  const handleAddChild = () => {
    if (onAddChild && parent) {
      const childId = childIdCounter;
      onAddChild(parent, childId);
      setChildIdCounter(childIdCounter + 1);
      const newChildComponent = (
        <Individual
          key={childId}
          name={`Child ${childId}`}
          parent={name}
          onAddChild={onAddChild}
        />
      );
      setChildComponents((prev) => [...prev, newChildComponent]);
    }
  };

  const startDragging = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setDragging(true);
      setPosition({
        ...position,
        pos3: e.clientX,
        pos4: e.clientY,
      });
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener(
        "mousemove",
        handleDragging as unknown as EventListener
      );
    },
    [position]
  );

  const handleDragging = useCallback(
    (e: MouseEvent) => {
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
    },
    [dragging, position]
  );

  const stopDragging = useCallback(() => {
    setDragging(false);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener(
      "mousemove",
      handleDragging as unknown as EventListener
    );
  }, [handleDragging]);

  const { top, left } = position;

  return (
    <div
      style={{
        border: "1px solid black",
        // position: "absolute",
        padding: "10px",
        textAlign: "left",
        // border: "1px solid #ccc",
        borderRadius: "5px",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        // top: `${top}px`,
        // left: `${left}px`,
      }}
      // draggable
      // onMouseDown={startDragging}
    >
      <p>{name}</p>
      {childComponents.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            left: "20px",
          }}
        >
          {childComponents}
        </div>
      )}
      <button onClick={handleAddChild}>Add Child</button>
    </div>
  );
};

export const FamilyTree: React.FC = () => {
  const [childrenCounts, setChildrenCounts] = useState<{
    [parent: string]: number;
  }>({ Grandfather: 1 });

  const handleAddChild = (parent: string, childId: number) => {
    setChildrenCounts((prev) => ({
      ...prev,
      [parent]: (prev[parent] || 0) + 1,
    }));
    console.log(`Adding child to ${parent} with ID ${childId}`);
  };

  const renderChildren = (parent: string, count: number) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        {[...Array(count)].map((_, index) => (
          <Individual
            key={index}
            name={`Child ${index + 1}`}
            parent={parent}
            onAddChild={handleAddChild}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, zIndex: 9 }}>
      <Individual
        name="Grandfather"
        onAddChild={handleAddChild}
        parent="Grandfather"
      >
        <div style={{ padding: "10rem", marginTop: "20px" }}>
          {renderChildren("Grandfather", childrenCounts.Grandfather)}
        </div>
      </Individual>
    </div>
  );
};
