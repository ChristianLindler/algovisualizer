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

const PathGrid = ({grid, setGrid, startPos, endPos}) => {
  const classes = useStyles()

  const handleCellClick = (row, col) => {
    const newGrid = grid.map((rowArr, rowIndex) => {
      return rowArr.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          const updatedCell = { ...cell }
          if (updatedCell.type === 'cell') {
            updatedCell.type = 'wall'
          } else if (updatedCell.type === 'wall') {
            updatedCell.type = 'cell'
          }
          return updatedCell
        }
        return cell
      })
    })
  
    setGrid(newGrid)
  }

  return (
    <div className={classes.gridContainer}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              type={grid[rowIndex][colIndex].type}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default PathGrid