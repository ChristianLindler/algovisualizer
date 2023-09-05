import {
    Grid,
    TextField,
    Button,
    makeStyles,
    Select,
    MenuItem
} from '@material-ui/core'
import { theme } from '../../../theme'

const numRows = 20 
const numCols = 50
const startCell = {row: (numRows - 1)/2, col: 0}
const endCell = {row: (numRows - 1)/2, col: numCols - 1}

const useStyles = makeStyles(() => ({
	container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '300px',
        justifyContent: 'center',
        margin: 10
    },
    input: {
        width: '100%'
    },
    button: {
        backgroundColor: theme.colors.secondary.main,
        borderRadius: 10,
        width: '100%'
    },
}))

const SortingForm = ({shuffleHeights, numBars, setNumBars, timeoutLength, setTimeoutLength, algorithm, setAlgorithm, sort, isSorting}) => {
    const classes = useStyles()
    return(
        <Grid className={classes.container} container>
            <Grid item xs={6} className={classes.item}>
                <Select label='Algorithm' value={algorithm} onChange={(event) => setAlgorithm(event.target.value)} className={classes.input}>
                    <MenuItem value={'Bubble Sort'}>Bubble Sort</MenuItem>
                    <MenuItem value={'Insertion Sort'}>Insertion Sort</MenuItem>
                    <MenuItem value={'Quick Sort'}>Quick Sort</MenuItem>
                    <MenuItem value={'Merge Sort'}>Merge Sort</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6}>
                <TextField label='Speed' value={timeoutLength} onChange={(event)=> setTimeoutLength(event.target.value)} className={classes.input}/>
            </Grid>
            <Grid item xs={6}>
                <TextField label='Num Bars' value={numBars} onChange={(event) => setNumBars(event.target.value)} className={classes.input}/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={shuffleHeights} className={classes.button} disabled={isSorting}>Shuffle</Button>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={sort} className={classes.button} disabled={isSorting}>Sort</Button>
            </Grid>
        </Grid>
    )
}

export default SortingForm