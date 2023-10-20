import React, { useCallback, useState } from "react";
import { Wrapper } from "./styles";

interface ChildProps {
  id: number;
  onDelete: (id: number) => void;
  onAddNewChild: () => void;
}

const Child: React.FC<ChildProps> = ({ id, onDelete }) => {
  const [children, setChildren] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(true);

  const onAddNewChildLocal = useCallback(() => {
    setChildren((prevChildren) => [...prevChildren, prevChildren.length + 1]);
  }, []);

  const onDeleteChildLocal = useCallback((childId: number) => {
    setChildren((prevChildren) => prevChildren.filter((cId) => cId !== childId));
  }, []);

  const onSaveName = () => {
    setIsSaved(true)
    setEditing(false)
  }

  const onEditName = () => {
    setName('')
    setIsSaved(false)
    setEditing(true)
  }

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
        {isSaved ? (
          <>
          <span>{name}</span>
          <button onClick={onEditName}>Edit Name</button>
          </>
        ) : (
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
            disabled={!editing}/>
            <button onClick={onSaveName} disabled={!name.trim()}>Save</button>
          </div>
        )}
        { isSaved && <button onClick={onAddNewChildLocal}>Add Child</button>}
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
