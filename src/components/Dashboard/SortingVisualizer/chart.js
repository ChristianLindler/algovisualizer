import React from 'react'
import { useState, useEffect } from 'react'
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
    const [barWidth, setBarWidth] = useState(10)

    useEffect(() => {
        // Adjust bar width based on screen width
        const handleResize = () => {
          const screenWidth = window.innerWidth
          if (screenWidth <= 768) {
            setBarWidth(5)
          } else {
            setBarWidth(10)
          }
        }
    
        handleResize()
        window.addEventListener('resize', handleResize)
    
        return () => {
          window.removeEventListener('resize', handleResize);
        }
      }, [])
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
                            width: `${barWidth}px`,
                            backgroundColor: backgroundColor,
                            margin: `${barWidth/3}px`,
                            borderRadius: 3
                        }}
                    ></div>
                )
            })}
        </div>
    )
}

export default Chart