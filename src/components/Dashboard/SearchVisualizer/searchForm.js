import {
    Grid,
    TextField,
    Button,
    makeStyles,
    Select,
    MenuItem
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

const SearchForm = ({algorithm, setAlgorithm, setGrid, initialGrid, search, timeoutLength, setTimeoutLength, isSearching, heuristic, setHeuristic}) => {
    const classes = useStyles()

    const resetGrid = () => {
        setGrid(initialGrid)
    }

    return(
        <Grid className={classes.container} container>
            <Grid item xs={12} className={classes.item}>
                <Select label='Algorithm' value={algorithm} onChange={(event) => setAlgorithm(event.target.value)} className={classes.input}>
                    <MenuItem value={'bfs'}>BFS</MenuItem>
                    <MenuItem value={'a star'}>A Star</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6} className={classes.item}>
                <Select label='Heuristic' value={heuristic} onChange={(event) => setHeuristic(event.target.value)} className={classes.input}>
                    <MenuItem value={'manhattan'}>Manhattan Distance</MenuItem>
                    <MenuItem value={'euclidian'}>Euclidian Distance</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6} className={classes.item}>
                <TextField label='Timeout Length' defaultValue={0} value={timeoutLength} onChange={(event) => setTimeoutLength(event.target.value)} fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={search} className={classes.button} disabled={isSearching}>Search</Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => setGrid(initialGrid)} className={classes.button} disabled={isSearching}>Reset</Button>
            </Grid>
        </Grid>
    )
}

export default SearchForm