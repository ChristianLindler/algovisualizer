import {
    Grid,
    TextField,
    Button,
    makeStyles,
    Select,
    MenuItem,
    Slider,
} from '@material-ui/core'
import { theme } from '../../../theme'

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

const SearchForm = ({algorithm, setAlgorithm, search, timeoutLength, setTimeoutLength, isSearching, resetAll, resetPath, pathUsed}) => {
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
                    <MenuItem value={'bfs'}>BFS</MenuItem>
                    <MenuItem value={'a star'}>A Star</MenuItem>
                    <MenuItem value={'bidirectional a star'}>Bidirectional A Star</MenuItem>
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
                <Button onClick={() => resetAll()} className={classes.button} disabled={isSearching}>Reset All</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => resetPath()} className={classes.button} disabled={isSearching}>Reset Path</Button>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={search} className={classes.button} disabled={isSearching || pathUsed}>Search</Button>
            </Grid>
        </Grid>
    )
}

export default SearchForm