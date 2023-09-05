import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { theme } from '../../../../../theme'

const useStyles = makeStyles(() => ({
  cell: {
    width: '30px',
    height: '30px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  wall: {
    backgroundColor: '#333',
  },
  start: {
    backgroundColor: '#00cc00',
  },
  end: {
    backgroundColor: theme.colors.secondary.main,
  },
  visited: {
    backgroundColor: theme.colors.primary.main,
  },
  path: {
    backgroundColor: theme.colors.tertiary.main
  }
}))

const Cell = ({ onClick, type }) => {
  const classes = useStyles()
  return (
    <div
      className={`${classes.cell} ${classes[type]}`}
      onClick={onClick}
    ></div>
  )
}

export default Cell