import React, { useState } from "react";

interface DynamicDivProps {
  id: number;
  name: string;
}

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <svg style={{ position: "absolute" }}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
  </svg>
);

const DynamicDiv: React.FC<DynamicDivProps> = ({}) => {
  const [childCount, setChildCount] = useState(0);
  const [children, setChildren] = useState<JSX.Element[]>([]);
  const [newChildName, setNewChildName] = useState("");
  const [linePositions, setLinePositions] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  const handleAddChild = () => {
    if (!newChildName) {
      alert("Please enter a name for the child.");
      return;
    }

    const newChild = <DynamicDiv key={childCount} id={childCount + 1} name={newChildName} />;
    setChildCount(childCount + 1);
    setChildren((prevChildren) => [...prevChildren, newChild]);
    setNewChildName(""); // Очищаємо поле для імені

    // Оновлюємо позиції ліній для нового елемента
    setLinePositions((prevLines) => [
      ...prevLines,
      { x1: 50, y1: 50 + 60 * (prevLines.length + 1), x2: 50, y2: 0 }, // Змініть ці значення залежно від вашого дизайну
    ]);
  };

  return (
    <div style={{ position: "relative", padding: "10px", margin: "10px", textAlign: children.length === 2 ? "center" : "left" }}>
      <div style={{ border: "1px solid black", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Enter name"
          value={newChildName}
          onChange={(e) => setNewChildName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddChild}>Add Child</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}>
        {linePositions.map((line, index) => (
          <Line key={index} {...line} />
        ))}
        {children}
      </div>
    </div>
  );
};

export const NewTest: React.FC = () => {
  const [children, setChildren] = useState<JSX.Element[]>([]);

  const handleAddChild = () => {
    const newChild = <DynamicDiv key={children.length} id={children.length + 1} name={`Child Div ${children.length + 1}`} />;
    setChildren((prevChildren) => [...prevChildren, newChild]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <div>
          Parent Div
          <button onClick={handleAddChild}>Add Child Div</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}>{children}</div>
      </div>
    </div>
  );
};
