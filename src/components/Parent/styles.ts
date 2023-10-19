import styled from "styled-components";

export const Wrapper = styled.div`
  border-top: 2px solid black;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  &::before {
    content: " ";
    position: absolute;
    top: -2px;
    left: 0;
    height: 3px;
    width: 95px;
    background: white;
    z-index: 2;
  }

  &::after {
    content: " ";
    position: absolute;
    top: -2px;
    right: 0;
    height: 3px;
    width: 95px;
    background: white;
    z-index: 2;
  }
`;
