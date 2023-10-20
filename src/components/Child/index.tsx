import React, { useCallback, useState } from "react";
import { Wrapper } from "../Parent/styles";

export const Child: React.FC = () => {
  const [children, setChildren] = useState<{ id: number }[]>([]);

  const onAddNewChild = useCallback(() => {
    setChildren((prevChildren: { id: number }[]) => [
      ...prevChildren,
      { id: prevChildren.length + 1 },
    ]);
    console.log('huy')
  }, []);
  return (
    <div style={{ margin: `0 10px`, }}>
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
        <button onClick={onAddNewChild}>Add Child</button>
      </div>

      {children.length > 1 && (
        <div
          style={{
            height: "30px",
            width: "2px",
            backgroundColor: "black",
            margin: "0 auto",
          }}
        />
      )}

      {children.length > 0 ? (
        children.length> 1 ? (
          <>
            {/* child wrapper */}
            <Wrapper>
              {Array.from({ length: children.length }).map(() => (
                <Child />
              ))}
            </Wrapper>
          </>
        ) : (
          <Child />
        )
      ) : null}
    </div>
  );
};
