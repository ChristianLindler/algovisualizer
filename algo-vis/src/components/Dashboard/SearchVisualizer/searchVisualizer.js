import { aStar, bfs } from "./searchAlgos"
import { Grid, Paper, makeStyles } from "@material-ui/core"
import PathGrid from './PathGrid/pathGrid'
import { useState } from "react"
import { theme } from "../../../theme"
import SearchForm from "./searchForm"

const numRows = 9
const numCols = 19
const offset = 3
const startCell = {row: Math.floor(numRows/2), col: offset}
const endCell = {row: Math.floor(numRows/2), col: (numCols - 1 - offset)}

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor: theme.colors.primary.light,
        height: '100vh',
    },
	paper: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary.white,
        padding: 10,
        margin: 10,
    }
}))

const SearchVisualizer = () => {
    const emptyGrid = Array.from({ length: numRows }, () =>
    Array(numCols).fill('cell')
    )
    const initialGrid = emptyGrid.map((row, rowIndex) => 
        row.map((cell, colIndex) => {
        if (rowIndex === startCell.row && colIndex === startCell.col) {
            return 'start'
        } else if (rowIndex === endCell.row && colIndex === endCell.col) {
            return 'end'
        } else {
            return cell
        }
        })
    )
    const classes = useStyles()

    const [grid, setGrid] = useState(initialGrid)
    const [searchAlgorithm, setSearchAlgorithm] = useState('bfs')
    const [timeoutLength, setTimeoutLength] = useState(0)
    const [isSearching, setIsSearching] = useState(false)



    const search = async() => {
        setIsSearching(true)
        switch(searchAlgorithm) {
            case 'bfs':
                await bfs(grid, startCell, endCell, setGrid, timeoutLength)
                break
            case 'a star':
                await aStar(grid, startCell, endCell, setGrid, timeoutLength)
                break
            default:
        }
        setIsSearching(false)
    }


    return (
        <Grid container>
            <Grid item xs={8}>
                <Paper className={classes.paper} elevation={5}>
                    <PathGrid grid={grid} setGrid={setGrid} startCell={startCell} endCell={endCell}/>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper} elevation={5}>
                    <SearchForm
                        algorithm={searchAlgorithm}
                        setAlgorithm={setSearchAlgorithm}
                        timeoutLength={timeoutLength}
                        setTimeoutLength={setTimeoutLength}
                        search={search}
                        setGrid={setGrid}
                        initialGrid={initialGrid}
                        isSearching={isSearching}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SearchVisualizer