import React from "react";
import { NewTest } from "./Newtest";
import Tree from "./treeTest";
import { FamilyTree } from "./test";
import { Parent } from "./components/Parent";

// Interface for Individual component props

const App: React.FC = () => (
  <div >
    {/* <FamilyTree /> */}
    {/* <NewTest /> */}
    {/* <Tree/> */}
    {/*   <DraggableDiv/> */}
    <Parent />
  </div>
);

export default App;
