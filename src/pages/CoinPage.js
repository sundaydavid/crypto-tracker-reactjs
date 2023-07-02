import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../context/CryptoContext'
import axios from 'axios'
import { SingleCoin } from '../config/api'
import { makeStyles } from '@mui/styles'
import CoinInfo from '../components/CoinInfo'
import { LinearProgress, Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import { numberWithComas } from '../components/Carousel'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",

        "@media (max-width: 960px)": {
            flexDirection: "column",
            alignItems: "center"
        }
    },
 
    sidebar: {
        width: "30%",

        "@media (max-width: 960px)": {
            width: "100%"
        },

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    },

    heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat"
    },

    description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify"
    },

    marketData: {
        alignSelf:"start",
        padding:25,
        paddingTop:10,
        width:"100%",

        "@media (max-width: 960px)": {
            display: "flex",
            justifyContent:"space-around"
        },

        "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center"
        },

        "@media (max-width: 0px)": {
            alignItems: "start"
        },

    }
}))

const CoinPage = () => {

    const { id } = useParams()
    const [coin, setCoin] = useState()

    const { currency, symbol } = CryptoState()

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data)
    }

    useEffect(() => {
        fetchCoin()
    }, [])

    console.log(coin)

    const classes = useStyles()

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />

                <Typography
                    varient="h3"
                    className={classes.heading}
                >
                    {coin?.name}
                </Typography>

                <Typography varient="subtitle" className={classes.description}>
                    {HTMLReactParser(coin?.description.en.split(". ")[0])}.
                </Typography>

                <div className={classes.marketData}>

                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{ fontFamily: "Montserrat" }}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{ fontFamily: "Montserrat" }}>
                            {symbol}{" "}
                            {numberWithComas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant='h5' className={classes.heading}>
                            Market Cap: {" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='h5' style={{ fontFamily: "Montserrat" }}>
                            {symbol}{" "}
                            {numberWithComas(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                .toString().slice(0, -6)
                            )}
                        </Typography>
                    </span>
                </div>
            </div>

            {/*Chart*/}
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinPage
