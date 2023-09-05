import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { theme } from '../../theme'

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: theme.colors.primary.main,
	},
	title: {
		color: theme.typography.primary.color,
		fontFamily: theme.typography.primary.fontFamily,
		fontSize: theme.typography.primary.fontSize,
		flexGrow: 1,
	},
}))

const Header = () => {
	const classes = useStyles()
  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar>
        <Typography className={classes.title}>
          Algo Visualizer
        </Typography>
			</Toolbar>
		</AppBar>
  )
}
export default Header