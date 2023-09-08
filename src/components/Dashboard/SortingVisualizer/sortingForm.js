import {
    Grid,
    TextField,
    Button,
    makeStyles,
    Select,
    MenuItem,
    Slider
} from '@material-ui/core'
import { theme } from '../../../theme'

const numRows = 20 
const numCols = 50
const startPos = {row: (numRows - 1)/2, col: 0}
const endPos = {row: (numRows - 1)/2, col: numCols - 1}

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
        width: '100%',
    },
    button: {
        backgroundColor: theme.colors.secondary.main,
        borderRadius: 10,
        width: '100%'
    },
}))

const SortingForm = ({shuffleHeights, numBars, setNumBars, timeoutLength, setTimeoutLength, algorithm, setAlgorithm, sort, isSorting}) => {
    const classes = useStyles()

    const handleSpeedChange = (event, newValue) => {
        const maxSpeed = 100
        const minSpeed = 0
        const scaledTimeout = (maxSpeed - newValue) / (maxSpeed - minSpeed) * 100;
        setTimeoutLength(scaledTimeout);
    }

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
            <Grid item xs={6} className={classes.item}>
                <h4>Speed</h4>
                <Slider
                    value={100 - timeoutLength}
                    onChange={handleSpeedChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="speed-slider"
                    min={0}
                    max={100}
                    className={classes.slider}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label='Num Bars'
                    value={numBars}
                    onChange={(event) => setNumBars(event.target.value <= 50 ? event.target.value : numBars)}
                    className={classes.input}
                />
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