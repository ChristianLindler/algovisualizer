import { aStar, bfs, bidirectionalAStar } from "./searchAlgos"
import { Grid, Paper, makeStyles } from "@material-ui/core"
import PathGrid from './PathGrid/pathGrid'
import { useState } from "react"
import { theme } from "../../../theme"
import SearchForm from "./searchForm"

const initialWalls = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
]

const numRows = 9
const numCols = 19
const offset = 3
const startPos = {row: Math.floor(numRows/2), col: offset}
const endPos = {row: Math.floor(numRows/2), col: (numCols - 1 - offset)}

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: theme.colors.primary.light,
        height: '100vh',
    },
	paper: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.colors.primary.white,
        padding: 10,
        margin: 10,
    }
}))

const SearchVisualizer = () => {
    const emptyGrid = Array.from({ length: numRows }, (_, rowIndex) =>
        Array.from({ length: numCols }, (_, colIndex) => {
            if (rowIndex === startPos.row && colIndex === startPos.col) {
                return { type: 'start', forwardParent: null, backwardParent: null, forwardCost: 0, backwardCost: null }
            } else if (rowIndex === endPos.row && colIndex === endPos.col) {
                return { type: 'end', forwardParent: null, backwardParent: null, forwardCost: null, backwardCost: 0 }
            } else {
                return { type: 'cell', forwardParent: null, backwardParent: null, forwardCost: null, backwardCost: null }
            }
        })
    )

    const initialGrid = emptyGrid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {

            return (initialWalls[rowIndex] && initialWalls[rowIndex][colIndex]) === 1 ? { ...cell, type: 'wall' } : cell
        })
    })

    const classes = useStyles()

    const [grid, setGrid] = useState(initialGrid)
    const [searchAlgorithm, setSearchAlgorithm] = useState('bidirectional a star')
    const [timeoutLength, setTimeoutLength] = useState(50)
    const [isSearching, setIsSearching] = useState(false)
    const [pathUsed, setPathUsed] = useState(false)

    const resetAll = async() => {
        setGrid(emptyGrid)
        setPathUsed(false)
    }

    const resetPath = async() => {
        const newGrid = grid.map((row, rowIndex) => {
            return row.map((cell, colIndex) => {
                if (['wall'].includes(cell.type)) {
                    return cell
                } else {
                    return emptyGrid[rowIndex][colIndex]
                }
            })
        })
        setPathUsed(false)
        setGrid(newGrid)
    }

    const search = async() => {
        setIsSearching(true)
        setPathUsed(true)
        switch(searchAlgorithm) {
            case 'bfs':
                await bfs(grid, startPos, endPos, setGrid, timeoutLength)
                break
            case 'a star':
                await aStar(grid, startPos, endPos, setGrid, timeoutLength)
                break
            case 'bidirectional a star':
                await bidirectionalAStar(grid, startPos, endPos, setGrid, timeoutLength)
                break
            default:
        }
        setIsSearching(false)
    }


    return (
        <Grid container>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper} elevation={5}>
                    <h3>Pathfinder Parameters</h3>
                    <SearchForm
                        algorithm={searchAlgorithm}
                        setAlgorithm={setSearchAlgorithm}
                        timeoutLength={timeoutLength}
                        setTimeoutLength={setTimeoutLength}
                        search={search}
                        resetAll={resetAll}
                        resetPath={resetPath}
                        isSearching={isSearching}
                        pathUsed={pathUsed}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper className={classes.paper} elevation={5}>
                    <h5>*Press grid cells to create walls</h5>
                    <PathGrid grid={grid} setGrid={setGrid} startPos={startPos} endPos={endPos}/>
                </Paper>         
            </Grid>
        </Grid>
    )
}

export default SearchVisualizer