import React, { useCallback, useState, MouseEvent,forwardRef, useImperativeHandle } from "react";
import { Wrapper } from "./styles";

interface ChildProps {
  id: number;
  color?: string;
  onDelete: (id: number) => void;
  onAddNewChild: () => void;
}


const Child: React.FC<ChildProps> = ({ id, onDelete,color }) => {
  const [children, setChildren] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(true);


  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const onAddNewChildLocal = useCallback(() => {
    const childColor = getRandomColor();
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

  const childColor = color || "#000000";

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
          padding: "10px",
          width: "150px",
          margin: "0 auto",
        }}
      >
  
        {isSaved ? (
          <>
            <span
              style={{
                backgroundColor: childColor,
                padding: '10px',
                color: 'white'
              }}
            >{name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"
              style={{ marginLeft: '5px', cursor: 'pointer' }}
              onClick={onEditName} >
              <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                fill="orange" />
            </svg>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              style={{ outline: 'none', width: '5rem', borderRadius: '5px' }}
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
            />
  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 512 512"
              onClick={name.trim() !== '' ? onSaveName : undefined}
              style={{ pointerEvents: name.trim() !== '' ? 'auto' : 'none', cursor: 'pointer' }}
            >
              <path
                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                fill={name.trim() !== '' ? "#14e648" : 'grey'}
              />
            </svg>
  
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"
              onClick={() => onDelete(id)}
              style={{ cursor: 'pointer' }}>
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                fill='#ea0606' />
            </svg>
          </div>
        )}
        {isSaved &&
          <>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"
              style={{
                marginLeft: '5px',
                marginRight: '5px',
                cursor: 'pointer'
              }}
              onClick={onAddNewChildLocal}>
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                fill="green"
              /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"
              style={{ cursor: 'pointer' }}
              onClick={() => onDelete(id)}>
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                fill='#ea0606' />
            </svg>
          </>
        }
      </div>
  
      {children.length > 0 && (
        <Wrapper>
          {children.map((childId) => (
            <Child
              key={childId}
              id={childId}
              color={childColor}
              onDelete={onDeleteChildLocal}
              onAddNewChild={onAddNewChildLocal}
            />
          ))}
        </Wrapper>
      )}
    </div>
  );
  
};


export interface Position {
  top: number;
  left: number;
  pos3: number;
  pos4: number;
}

export interface ParentRef {
  getInitialPosition: () => Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const Parent: React.ForwardRefRenderFunction<ParentRef> = (props, ref) => {
  const [children, setChildren] = useState<number[]>([]);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    pos3: 0,
    pos4: 0,
  });

  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Position>({ ...position });

  const startDragging = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLInputElement).tagName === "INPUT") {
        return;
      }
      e.preventDefault();
      setDragging(true);
      setInitialPosition({
        top: 0,
        left: 0,
        pos3: 0,
        pos4: 0,
      }); 
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

  const getInitialPosition = useCallback(() => {
    return initialPosition;
  }, [initialPosition]);

  useImperativeHandle(
    ref,
    () => ({
      getInitialPosition,
      setPosition,
    }),
    [getInitialPosition, setPosition]
  );

  const { top, left } = position;

  const colorHierarchy = ["#FFA500", "#0000FF", "#808080"];
  const parentColor = colorHierarchy[children.length % colorHierarchy.length];

  const onAddNewChild = useCallback(() => {
    const childColor = children.length < 4 ? "#FFA500" : "#0000FF";
    setChildren((prevChildren) => [...prevChildren, prevChildren.length + 1]);
  }, [children]);

  const onDeleteChild = useCallback((childId: number) => {
    setChildren((prevChildren) => prevChildren.filter((cId) => cId !== childId));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        cursor: dragging ? "grabbing" : "grab",
        top: `${top}px`,
        left: `${left}px`,
      }}
      draggable
      onMouseDown={startDragging}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{  padding: "10px", display:'flex', alignItems:'center',backgroundColor:'#FFA500' }}>
          <span>Add Category</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"
              style={{
                marginLeft: '5px',
                marginRight: '5px',
                cursor: 'pointer'
              }}
              onClick={onAddNewChild}>
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                fill="green"
              /></svg>
        </div>

        {children.length > 0 && (
         <Wrapper>
         {children.map((childId) => (
           <Child
             key={childId}
             id={childId}
             color={parentColor}
             onDelete={onDeleteChild}
             onAddNewChild={onAddNewChild}
           />
         ))}
       </Wrapper>
        )}
      </div>
    </div>
  );
};

export default forwardRef(Parent);
