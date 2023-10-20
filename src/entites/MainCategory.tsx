import React, { useCallback, useState } from "react";
import { Wrapper } from "./styles";

interface ChildProps {
  id: number;
  onDelete: (id: number) => void;
  onAddNewChild: () => void;
}

const Child: React.FC<ChildProps> = ({ id, onDelete, onAddNewChild }) => {
  const [children, setChildren] = useState<number[]>([]);
 

  const onAddNewChildLocal = useCallback(() => {
    setChildren((prevChildren) => [...prevChildren, prevChildren.length + 1]);
  }, []);

  const onDeleteChildLocal = useCallback((childId: number) => {
    setChildren((prevChildren) => prevChildren.filter((cId) => cId !== childId));
  }, []);

  return (
    <div style={{ margin: `0 10px` }}>
      <div
        style={{
          height: "30px",
          width: "2px",
          backgroundColor: "black",
          margin: "0 auto",
        }}
      />
      <div
        style={{
          border: "1px solid red",
          padding: "10px",
          width: "150px",
          margin: "0 auto",
        }}
      >
        <p>{id}</p>
        <button onClick={onAddNewChildLocal}>Add Child</button>
        <button onClick={() => onDelete(id)}>Delete</button>

      </div>

      {children.length > 0 && (
        <Wrapper>
          {children.map((childId) => (
            <Child
              key={childId}
              id={childId}
              onDelete={onDeleteChildLocal}
              onAddNewChild={onAddNewChildLocal}
            />
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export const Parent: React.FC = () => {
  const [children, setChildren] = useState<number[]>([]);

  const onAddNewChild = useCallback(() => {
    setChildren((prevChildren) => [...prevChildren, prevChildren.length + 1]);
  }, []);

  const onDeleteChild = useCallback((childId: number) => {
    setChildren((prevChildren) => prevChildren.filter((cId) => cId !== childId));
  }, []);

  return (
    <div
      style={{
        border: "1px solid",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ border: "1px solid red", padding: "10px" }}>
        <button onClick={onAddNewChild}>Add Child</button>
      </div>

      {children.length > 0 && (
        <Wrapper>
          {children.map((childId) => (
            <Child
              key={childId}
              id={childId}
              onDelete={onDeleteChild}
              onAddNewChild={onAddNewChild}
            />
          ))}
        </Wrapper>
      )}
    </div>
  );
};
