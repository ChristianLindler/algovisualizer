import { Grid, Paper, makeStyles } from "@material-ui/core"
import Chart from "./chart"
import { useState, useEffect } from "react"
import { bubbleSort, shuffleArray, getArray, insertionSort, quickSort } from './sortingAlgos'
import { theme } from "../../../theme"
import SortingForm from './sortingForm'


const max = 250
const min = 50

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

const SortingVisualizer = () => {
    const classes = useStyles() 

    const [numBars, setNumBars] = useState(40)
    const [highlighted, setHighlighted] = useState([])
    const [timeoutLength, setTimeoutLength] = useState(3)
    const [heights, setHeights] = useState(shuffleArray(getArray(numBars, max, min)))
    const [algorithm, setAlgorithm] = useState('Bubble Sort')
    const [isSorting, setIsSorting] = useState(false)
    
    
    const shuffleHeights = () => {
        setHeights(shuffleArray([...heights]))
    }

    const sort = async () => {
        setIsSorting(true)
        switch(algorithm) {
            case 'Bubble Sort':
                await bubbleSort(heights, setHeights, setHighlighted, timeoutLength)
                break
            case 'Insertion Sort':
                await insertionSort(heights, setHeights, setHighlighted, timeoutLength)
                break
            case 'QuickSort':
                await quickSort(heights, 0, heights.length - 1, setHeights, setHighlighted, timeoutLength)
            default:
        }
        setIsSorting(false)
    }

    useEffect(() => {
        setHeights(getArray(numBars, max, min))
    }, [numBars])

    return (
        <Grid container>
            <Grid item xs={8}>
                <Paper className={classes.paper} elevation={5}>
                    <Chart heights={heights} highlighted={highlighted} />
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={classes.paper} elevation={5}>
                    <SortingForm
                        shuffleHeights={shuffleHeights}
                        numBars={numBars}
                        setNumBars={setNumBars}
                        highlighted={highlighted}
                        timeoutLength={timeoutLength}
                        setTimeoutLength={setTimeoutLength}
                        algorithm={algorithm}
                        setAlgorithm={setAlgorithm}
                        sort={sort}
                        isSorting={isSorting}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SortingVisualizer