import { Heap } from 'heap-js'

const getNeighbors = (grid, row, col) => {
  const neighbors = []
  if (row > 0) neighbors.push({row: row - 1, col: col})
  if (row < grid.length - 1) neighbors.push({row: row + 1, col: col})
  if (col > 0) neighbors.push({row: row, col: col - 1})
  if (col < grid[0].length - 1) neighbors.push({row: row, col: col + 1})
  return neighbors
}

export const bfs = async (grid, startCell, endCell, setGrid, timeoutLength) => {
  const queue = []
  const parents = new Map()

  queue.push({ row: startCell.row, col: startCell.col })

  while (queue.length > 0) {
    const currentCell = queue.shift()
    const row = currentCell.row
    const col = currentCell.col

    if (grid[row][col] === 'visited') {
      continue
    }
    if (grid[row][col] === 'cell') {
      grid[row][col] = 'visited'
      setGrid([...grid])
      await new Promise(resolve => setTimeout(resolve, timeoutLength))
    }

    const neighbors = getNeighbors(grid, row, col)

    for (const neighbor of neighbors) {
      const neighborRow = neighbor.row
      const neighborCol = neighbor.col
      const neighborKey = `${neighborRow},${neighborCol}`

      if (!['start', 'wall', 'visited'].includes(grid[neighborRow][neighborCol])) {
        parents.set(neighborKey, `${row},${col}`)

        // Check if we are at the end cell
        if (neighborRow === endCell.row && neighborCol === endCell.col) {
          let curr = `${currentCell.row},${currentCell.col}`
          while (parents.has(curr)) {
            const [currRow, currCol] = curr.split(',').map(Number);
            grid[currRow][currCol] = 'path';
            curr = parents.get(curr);
          }
          setGrid([...grid]);
          return;
        }

        queue.push({ row: neighborRow, col: neighborCol })
      }
    }
  }
}




export const aStar = async (grid, startCell, endCell, setGrid, timeoutLength, heuristic) => {
  const customPriorityComparator = (a, b) => a.f - b.f
  const frontier = new Heap(customPriorityComparator)
  const explored = new Set()
  const parents = new Map()

  // Initialize g and f values for the start cell
  startCell.g = 0;
  startCell.f = heuristic(startCell, endCell);
  frontier.push(startCell)

  while (!frontier.isEmpty()) {
    const currentCell = frontier.pop()

    // Check if we are at the end cell
    if (grid[currentCell.row][currentCell.col] === 'end') {
      let curr = parents.get(currentCell);
      while (parents.has(curr)) {
        grid[curr.row][curr.col] = 'path';
        curr = parents.get(curr);
      }
      setGrid([...grid]);
      return
    }

    if (explored.has(currentCell)) continue
    explored.add(currentCell)
    if (grid[currentCell.row][currentCell.col] != 'start') {
      grid[currentCell.row][currentCell.col] = 'visited'
    }

    setGrid([...grid])
    await new Promise((resolve) => setTimeout(resolve, timeoutLength))

    const neighbors = getNeighbors(grid, currentCell.row, currentCell.col);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const tentativeG = currentCell.g + 1; // Assuming a cost of 1 to move from one cell to an adjacent one
      if (!['start', 'wall', 'visited'].includes(grid[neighbor.row][neighbor.col])) {
        if (!explored.has(neighbor) || tentativeG < neighbor.g) {
          // Update g and f values for the neighbor
          neighbor.g = tentativeG;
          neighbor.f = tentativeG + heuristic(neighbor, endCell);
          frontier.push(neighbor)
          parents.set(neighbor, currentCell)
        }
      }
    }
  }
}

// manhattan
export const manhattanDistance = (cell, endCell) => {
  return Math.abs(cell.row - endCell.row) + Math.abs(cell.col - endCell.col)
}


// manhattan
export const euclidianDistance = (cell, endCell) => {
  return Math.sqrt((cell.row - endCell.row)**2 + (cell.col - endCell.col)**2)
}