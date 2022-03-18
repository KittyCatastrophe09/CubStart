import React, { useState } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 19;
const FINISH_NODE_COL = 49;

const PathfindingVisualizer = () => {
  // BEGIN PART 5

  // YOUR CODE HERE
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };
  // END PART 5

  // BEGIN PART 6
  

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // YOUR CODE HERE
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      // YOUR CODE HERE
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = (start1, start2, end1, end2) => {
     const startNode = grid[start1][start2];
     const finishNode = grid[end1][end2];
     const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
     const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
     animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <>
      <button onClick={() => visualizeDijkstra(START_NODE_ROW,START_NODE_COL,FINISH_NODE_ROW, FINISH_NODE_COL)}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick = {() => visualizeDijkstra(parseInt(document.getElementById('start1')), parseInt(document.getElementById('start2')), 
      parseInt(document.getElementById('end1')), parseInt(document.getElementById('end2')))}>
      Change Start and End
      </button>
      Start Coordinates (one in each box)
      <input type="text" id="start1" />
      <input type="text" id="start2" />
      Finish Coordinates (one in each box)
      <input type="text" id="finish1" />
      <input type="text" id="finish2" />
      <div className="grid">
        { grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })} 
      </div>
    </>
  );
};

// END PART 6

// BEGIN PART 4

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// getInitialGrid creates an initial grid of nodes

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// createNode creates the nodes themselves

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); // Creates a shallow copy
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  //scrapped tell user there is no sol.
  if (newGrid[18][48].isWall && newGrid[18][49].isWall && newGrid[17][49].isWall) {
    console.warn('No solution')
  }
  return newGrid;
};

// getNewGridWithWallToggled means creating a copy with walls not existing if they existed and existing if they didn't

// END PART 4

export default PathfindingVisualizer;
