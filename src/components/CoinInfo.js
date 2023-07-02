import React, { useEffect, useState } from 'react'
import { CryptoState } from '../context/CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
  },
});

const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,

    "@media (max-width: 960px)": {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    }
  }
}))

const CoinInfo = ({ coin }) => {

  const [historicData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState()

  const { currency, symbol } = CryptoState()

  const fetHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    setHistoricalData(data.prices)
  }

  const classes = useStyles()

  useEffect(() => {
    fetHistoricData()
  }, [currency, days])


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* Chart */}
        {
          !historicData ? (
            <CircularProgress
              style={{ color: "gold" }}
              size={250}
              thickness={1}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />

<div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
            </>
          )
        }
        {/* Buttons */}
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo
