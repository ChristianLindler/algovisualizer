import React from 'react'
import { colors, makeStyles } from '@material-ui/core'
import { theme } from '../../../theme'

const useStyles = makeStyles(() => ({
	barBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '300px',
        justifyContent: 'center',
        borderRadius: 40,
    }
}))

const Chart = ({heights, highlighted}) => {
    const classes = useStyles()
    return (
        <div className={classes.barBox}>
            {heights.map((height, index) => {
                const backgroundColor = !highlighted.includes(index) ? theme.colors.primary.main : theme.colors.secondary.main
                return(
                    <div
                        key={index}
                        className="bar"
                        style={{
                            height: `${height}px`,
                            width: '10px',
                            backgroundColor: backgroundColor,
                            margin: '3px',
                            borderRadius: 3
                        }}
                    ></div>
                )
            })}
        </div>
    )
}

export default Chart