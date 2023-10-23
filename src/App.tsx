
import React, { ChangeEvent, useRef, useState } from "react";
import Parent, { ParentRef, Position,  } from "./components/Parent";



const App: React.FC = () => {
  const [containerScale, setContainerScale] = useState<number>(1);
  const parentRef = useRef<ParentRef>(null);

  const onContainerScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContainerScale(parseFloat(e.target.value));
  };

  const resetParentPosition = () => {
    const initialPosition: Position = parentRef.current?.getInitialPosition() || { top: 0, left: 0, pos3: 0, pos4: 0 };
    parentRef.current?.setPosition(initialPosition);
  };

  return (
    <div style={{border:'5px solid black', height:'100vh'}}>
      <div style={{display:'flex', alignItems:'center', padding:'20px', gap:'5rem'}}>
      <label style={{display:'flex', alignItems:'center'}}>
        Container Scale:
        <input
        style={{cursor:'pointer'}}
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={containerScale}
          onChange={onContainerScaleChange}
        />
      </label>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
      style={{
        height:'2rem',
        cursor:"pointer"
      }}
        onClick={resetParentPosition}>
        <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
      fill="#005af5"/>
      </svg>
      </div>
      <div
        style={{
          paddingTop: "5rem",
          transform: `scale(${containerScale})`,
        }}
      >
        <Parent ref={parentRef}  />
      </div>
    </div>
  );
};

export default App;



