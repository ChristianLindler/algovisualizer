import React, { useState } from 'react'
import Cell from './Cell/cell'
import { makeStyles } from '@material-ui/core'
import { bfs } from '../searchAlgos'
import { initialGrid } from '../searchVisualizer'



const useStyles = makeStyles(() => ({
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const PathGrid = ({grid, setGrid, startCell, endCell}) => {
  const classes = useStyles()

  const handleCellClick = (row, col) => {
    const newGrid = [...grid]
    const cellType = newGrid[row][col]

    if (cellType === 'cell') {
      newGrid[row][col] = 'wall'
    } else if (cellType === 'wall') {
      newGrid[row][col] = 'cell'
    }

    setGrid(newGrid)
  }

  return (
    <div className={classes.gridContainer}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              type={grid[rowIndex][colIndex]}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PathGrid