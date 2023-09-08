import SortingVisualizer from "./SortingVisualizer/sortingVisualizer"
import SearchVisualizer from "./SearchVisualizer/searchVisualizer"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    container: {
        padding: 5
    },
}))
const Dashboard = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <SortingVisualizer />
            <SearchVisualizer />
        </div>
    )
}

export default Dashboard