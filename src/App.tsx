import React from 'react';
import { NewTest } from './Newtest';
import Tree from './treeTest';
import { FamilyTree } from './test';

// Interface for Individual component props


const App: React.FC = () => (
  <div>
    
    <FamilyTree/>
   <NewTest/>
   {/* <Tree/> */}
{/*   <DraggableDiv/> */}
  </div>
);

export default App;
