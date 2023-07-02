import { makeStyles } from '@mui/styles'
import React from 'react'
import { } from '@mui/styles'
import { Container, Typography } from '@mui/material'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        marginTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}))

const Banner = () => {

    const classes = useStyles()

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        styles={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}
                    >
                        Crypto Tracker
                    </Typography>

                    <Typography
                        variant='subtitle2'
                        styles={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat"
                        }}
                    >
                        Get all the Info regarding your favourite Crypto Currency
                    </Typography>

                </div>

                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner
