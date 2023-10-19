import { useCallback, useState } from "react";
import { Wrapper } from "./styles";

const Child = () => {
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const onAddNewChild = useCallback(
    () => setChildrenCount((prevValue) => prevValue + 1),
    []
  );

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
        <button onClick={onAddNewChild}>Add Child</button>
      </div>

      {childrenCount > 1 && (
        <div
          style={{
            height: "30px",
            width: "2px",
            backgroundColor: "black",
            margin: "0 auto",
          }}
        />
      )}

      {childrenCount > 0 ? (
        childrenCount > 1 ? (
          <>
            {/* child wrapper */}
            <Wrapper>
              {Array.from({ length: childrenCount }).map(() => (
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

export const Parent = () => {
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const onAddNewChild = useCallback(
    () => setChildrenCount((prevValue) => prevValue + 1),
    []
  );

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

      {childrenCount > 1 && (
        <div
          style={{
            height: "30px",
            width: "2px",
            backgroundColor: "black",
            margin: "0 auto",
          }}
        />
      )}

      {childrenCount > 0 ? (
        childrenCount > 1 ? (
          <>
            {/* child wrapper */}
            <Wrapper>
              {Array.from({ length: childrenCount }).map(() => (
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
