import React, { useState } from 'react';

interface TreeNodeProps {
  node: TreeNodeData;
  onClick: (node: TreeNodeData) => void;
}

interface TreeNodeData {
  text: string;
  children?: TreeNodeData[];
}

const getRandomNumber = () => Math.floor(Math.random() * 100);

const TreeNode: React.FC<TreeNodeProps> = ({ node, onClick }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => onClick(node)}>
    <div>{node.text}</div>
    {node.children && (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {node.children.map((child, index) => (
          <TreeNode key={index} node={child} onClick={() => {}} />
        ))}
      </div>
    )}
  </div>
);

const Tree: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNodeData>({
    text: 'Дерево',
  });

  const handleNodeClick = (currentNode: TreeNodeData) => {
    setTreeData((prevTreeData) => {
      const generateNewNode = (index: number): TreeNodeData => {
        const randomNumber = getRandomNumber();
        return {
          text: `${currentNode.text}.${index + 1}.${randomNumber}`,
          children: [
            { text: `${currentNode.text}.${index + 1}.${randomNumber}.1` },
            { text: `${currentNode.text}.${index + 1}.${randomNumber}.2` },
          ],
        };
      };

      const traverseAndGenerateChildren = (node: TreeNodeData) => {
        if (node.children) {
          return {
            ...node,
            children: node.children.map((child, index) => generateNewNode(index)),
          };
        }
        return node;
      };

      const updatedTreeData = traverseAndGenerateChildren(prevTreeData);
      return { ...updatedTreeData };
    });
  };

  return (
    <div>
      <h1>Дерево структури даних</h1>
      <TreeNode node={treeData} onClick={handleNodeClick} />
    </div>
  );
};

export default Tree;
