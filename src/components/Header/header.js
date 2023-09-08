import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { theme } from '../../theme'

const useStyles = makeStyles(() => ({
	header: {
		backgroundColor: theme.colors.primary.main,
		display: 'flex',
		alignItems: 'flex-start'
	},
	title: {
		color: theme.typography.primary.color,
		fontFamily: theme.typography.primary.fontFamily,
		fontSize: theme.typography.primary.fontSize,
		flex: 1,
	},
	logo: {
		width: 40,
		height: 'auto',
		margin: 10
	}
}))

const Header = () => {
	const classes = useStyles()
  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar>
	  	<img src={require('./algoIcon.png')} alt="Logo" className={classes.logo}/>
        <Typography className={classes.title}>
          Algo Visualizer
        </Typography>
			</Toolbar>
		</AppBar>
  )
}
export default Header