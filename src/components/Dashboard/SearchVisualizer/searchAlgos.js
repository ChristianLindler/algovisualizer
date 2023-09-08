import { Heap } from 'heap-js'

const getNeighbors = (grid, row, col) => {
  const neighbors = []
  if (row > 0) neighbors.push({row: row - 1, col: col})
  if (row < grid.length - 1) neighbors.push({row: row + 1, col: col})
  if (col > 0) neighbors.push({row: row, col: col - 1})
  if (col < grid[0].length - 1) neighbors.push({row: row, col: col + 1})
  return neighbors
}

export const bfs = async (grid, startPos, endPos, setGrid, timeoutLength) => {
  const queue = []
  queue.push({ row: startPos.row, col: startPos.col })

  while (queue.length > 0) {
    const currentCell = queue.shift()
    const row = currentCell.row
    const col = currentCell.col

    if (grid[row][col].type === 'visited') {
      continue
    }
    if (grid[row][col].type === 'cell') {
      grid[row][col].type = 'visited'
      setGrid([...grid])
      await new Promise(resolve => setTimeout(resolve, timeoutLength))
    }

    const neighbors = getNeighbors(grid, row, col)

    for (const neighbor of neighbors) {
      if (!['start', 'wall', 'visited'].includes(grid[neighbor.row][neighbor.col].type)) {
        grid[neighbor.row][neighbor.col].forwardParent = {row: row, col: col}
        grid[neighbor.row][neighbor.col].forwardCost = 1 + grid[row][col].forwardCost
        setGrid([...grid])

        // Check if we are at the end cell
        if (grid[neighbor.row][neighbor.col].type === 'end') {
          let curr = currentCell
          while (grid[curr.row][curr.col].forwardParent) {
            grid[curr.row][curr.col].type = 'path'
            curr = grid[curr.row][curr.col].forwardParent
          }
          setGrid([...grid])
          return (grid[endPos.row][endPos.col].forwardCost)
        }
        queue.push({ row: neighbor.row, col: neighbor.col })
      }
    }
  }
}

const manhattanDistance = (cell, endPos) => {
  return Math.abs(cell.row - endPos.row) + Math.abs(cell.col - endPos.col)
}

export const aStar = async (grid, startPos, endPos, setGrid, timeoutLength) => {
  const customPriorityComparator = (a, b) => a.distance - b.distance
  const frontier = new Heap(customPriorityComparator)
  const explored = new Set()

  // Initialize estimated distance
  startPos.distance = manhattanDistance(startPos, endPos)
  frontier.push(startPos)

  while (!frontier.isEmpty()) {
    const currentCell = frontier.pop()

    // Check if we are at the end cell
    if (grid[currentCell.row][currentCell.col].type === 'end') {
      let curr = grid[currentCell.row][currentCell.col].forwardParent
      while (grid[curr.row][curr.col].forwardParent) {
        grid[curr.row][curr.col].type = 'path'
        curr = grid[curr.row][curr.col].forwardParent
      }
      setGrid([...grid])
      return (grid[endPos.row][endPos.col].forwardCost)
    }

    const cellPos = JSON.stringify({row: currentCell.row, col: currentCell.col})
    if (explored.has(cellPos)) continue
    explored.add(cellPos)
    if (grid[currentCell.row][currentCell.col].type !== 'start') {
      grid[currentCell.row][currentCell.col].type = 'visited'
    }
    setGrid([...grid])
    await new Promise((resolve) => setTimeout(resolve, timeoutLength))

    const neighbors = getNeighbors(grid, currentCell.row, currentCell.col);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      const cost = grid[currentCell.row][currentCell.col].forwardCost + 1 // Assuming a cost of 1 to move from one cell to an adjacent one
      if (!['start', 'wall', 'visited'].includes(grid[neighbor.row][neighbor.col].type)) {
        if (!explored.has(JSON.stringify(neighbor)) || grid[neighbor.row][neighbor.col].forwardCost > cost) {
          neighbor.distance = cost + manhattanDistance(neighbor, endPos);
          frontier.push(neighbor)
          grid[neighbor.row][neighbor.col].forwardCost = cost
          grid[neighbor.row][neighbor.col].forwardParent = {row: currentCell.row, col: currentCell.col}
          setGrid([...grid])
        }
      }
    }
  }
}

export const bidirectionalAStar = async (grid, startPos, endPos, setGrid, timeoutLength) => {
  const customPriorityComparator = (a, b) => a.distance - b.distance
  const forwardFrontier = new Heap(customPriorityComparator)
  const backwardFrontier = new Heap(customPriorityComparator)
  const forwardExplored = new Set()
  const backwardExplored = new Set()
  let mu = Infinity
  let midpoint = null

  startPos.distance = manhattanDistance(startPos, endPos)
  forwardFrontier.push(startPos)

  endPos.distance = manhattanDistance(endPos, startPos)
  backwardFrontier.push(endPos)

  while (forwardFrontier.size() > 0 && backwardFrontier.size() > 0) {
    const forwardCell = forwardFrontier.pop()
    var cellPos = JSON.stringify({row: forwardCell.row, col: forwardCell.col})
    
    // If we have met in the middle
    if (backwardExplored.has(cellPos)) {
      const gridCell = grid[forwardCell.row][forwardCell.col]
      const pathCost = gridCell.forwardCost + gridCell.backwardCost
      if (pathCost < mu) {
        mu = pathCost
        midpoint = forwardCell
      }
    }

    if (!forwardExplored.has(cellPos)) {
      forwardExplored.add(cellPos)
      if (grid[forwardCell.row][forwardCell.col].type !== 'start') {
        grid[forwardCell.row][forwardCell.col].type = 'visited'
        setGrid([...grid])
        await new Promise((resolve) => setTimeout(resolve, timeoutLength))
      }

      expandBidirectionalNeighbors(
        forwardFrontier,
        forwardExplored,
        forwardCell,
        grid,
        setGrid,
        timeoutLength,
        backwardExplored,
        mu,
        midpoint,
        endPos,
        'forward'
      )
    }

    // Stopping condition
    if (forwardFrontier.peek().distance + backwardFrontier.peek().distance >= mu) {
      break
    }

    // Backward pass
    const backwardCell = backwardFrontier.pop()
    cellPos = JSON.stringify({row: backwardCell.row, col: backwardCell.col})

    // If we have met in the middle
    if (forwardExplored.has(cellPos)) {
      const gridCell = grid[forwardCell.row][forwardCell.col]
      const pathCost = gridCell.forwardCost + gridCell.backwardCost
      if (pathCost < mu) {
        midpoint = backwardCell
        mu = pathCost
      }
      
    }

    if (!backwardExplored.has(cellPos)) {
      backwardExplored.add(cellPos)
      if (grid[backwardCell.row][backwardCell.col].type !== 'end') {
        grid[backwardCell.row][backwardCell.col].type = 'visited'
        setGrid([...grid])
        await new Promise((resolve) => setTimeout(resolve, timeoutLength))
      }

      expandBidirectionalNeighbors(
        backwardFrontier,
        backwardExplored,
        backwardCell,
        grid,
        setGrid,
        timeoutLength,
        forwardExplored,
        mu,
        midpoint,
        startPos,
        'backward'
      )
    }
    // Stopping condition
    if (forwardFrontier.peek().distance + backwardFrontier.peek().distance >= mu) {
      break
    }
  }

  const midpointLoc = { row: midpoint.row, col: midpoint.col }
  let curr = midpointLoc
  // Reconstruct path from midpoint to start for the forward direction
  while (curr !== undefined) {
    if (grid[curr.row][curr.col].type !== 'start') {
      grid[curr.row][curr.col].type = 'path'
      curr = grid[curr.row][curr.col].forwardParent
    } else {
      break
    }
  }
  // Reconstruct path from midpoint to end for the backward direction
  curr = grid[midpointLoc.row][midpointLoc.col].backwardParent
  while (curr !== undefined && curr !== null) {
    if (grid[curr.row][curr.col].type !== 'end') {
      grid[curr.row][curr.col].type = 'path'
      curr = grid[curr.row][curr.col].backwardParent
    } else {
      break
    }
  }

  setGrid([...grid]);
}

const expandBidirectionalNeighbors = (
  frontier,
  explored,
  currentCell,
  grid,
  setGrid,
  timeoutLength,
  oppositeExplored,
  mu,
  midpoint,
  goal,
  direction
) => {
  const neighbors = getNeighbors(grid, currentCell.row, currentCell.col)
  // New cost of all neighbors is 1 + cost to get to parent cell
  const neighborCost = (direction === 'forward') ? 1 + grid[currentCell.row][currentCell.col].forwardCost : 1 + grid[currentCell.row][currentCell.col].backwardCost

  for (const neighbor of neighbors) {
    // If we are allowed to travel to that neighbor
    if (!['start', 'wall', 'visited'].includes(grid[neighbor.row][neighbor.col].type)) {
      // THe current cost to get to the neighbor (if it exists)
      const currentCost = (direction === 'forward') ? grid[neighbor.row][neighbor.col].forwardCost : grid[neighbor.row][neighbor.col].backwardCost
      // If the neighbor is unexplored or we have found a cheaper path
      if (!explored.has(neighbor) || neighborCost < currentCost) {
        const neighborLoc = {row: neighbor.row, col: neighbor.col}
        // Set the parent and cost for each neighbor
        if (direction === 'forward') {
          grid[neighborLoc.row][neighborLoc.col].forwardParent = {row: currentCell.row, col: currentCell.col}
          grid[neighborLoc.row][neighborLoc.col].forwardCost = neighborCost
          setGrid(grid)
        } else {
          grid[neighborLoc.row][neighborLoc.col].backwardParent = {row: currentCell.row, col: currentCell.col}
          grid[neighborLoc.row][neighborLoc.col].backwardCost = neighborCost
          setGrid(grid)
        }
        neighbor.distance = neighborCost + manhattanDistance(neighbor, goal)
        frontier.push(neighbor)
      }
    }
  }
}