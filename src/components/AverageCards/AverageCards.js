import countIcon from "../../img/countIcon.svg";
import percentage from "../../img/percеntage.svg";
import timeIcon from "../../img/timeIcon.svg";
import smileOne from "../../img/smile/one.svg";
import smileTwo from "../../img/smile/two.svg";
import smileThree from "../../img/smile/three.svg";
import smileFour from "../../img/smile/four.svg";
import smileFive from "../../img/smile/five.svg";
import arrow from "../../img/arrow.svg";
import "../../components/AverageCards/AverageCards.scss";
import React, {useState, useEffect} from 'react';
import Calendar from "../Calendar/Calendar";
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Analytics from "../../API/Analytics";


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const today = new Date();
const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

const AverageCards = function (props) {
    const [average, setAverage] = useState('');
    const [rating, setRating] = useState('');

    const [selectedTown, setSelectedTown] = useState('(текущий месяц по УР)'); // Состояние для выбранного населенного пункта
    const [towns, setTown] = useState([]);

    const fetchData = async (town) => {

        if (town === null) {
            town = selectedTown;
        }
        setTown(await Analytics.City())

        let averageData = await Analytics.GetAverage({
            date_from: lastMonth,
            date_to: today,
            selectedTown: town,
        })

        setAverage(averageData);

        let rating = {};

        rating.one   = averageData.rating["1"] / (averageData.count / 100);
        rating.two   = averageData.rating["2"] / (averageData.count / 100);
        rating.three = averageData.rating["3"] / (averageData.count / 100);
        rating.four  = averageData.rating["4"] / (averageData.count / 100);
        rating.five  = averageData.rating["5"] / (averageData.count / 100);

        setRating(rating)
    }

    useEffect(() => {
        fetchData(null)
    }, [])
    const [open, setOpen] = useState(false);  // Состояние для открытия модального окна


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const customTheme = createTheme({
        components: {
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        border: 'none !important',
                        fontFamily: 'PT Sans',
                        fontSize: '32px',
                        fontWeight: 400,
                        color: 'var(--blackContent)',
                        marginLeft: '50px',
                        marginBottom: '60px',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: 'var(--blackContent) !important',
                        textTransform: 'capitalize',
                        width: '251px',
                        height: '70px',
                        fontFamily: 'PT Sans',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '20.7px',
                        textAlign: 'left !important',
                        justifyContent: 'flex-start',
                        paddingLeft: '43.17px',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: '28px !important',
                        overflow: 'hidden',
                        paddingTop: '30px',
                        paddingLeft: '50px',
                        minWidth: '1104px',
                        maxWidth: '1104px',
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        color: ' var(--blackContent)',
                        border: 'none !important',
                    },
                },
            },
        },
    });

    const handleTownSelect = (town) => {
        fetchData(town);
        setSelectedTown(town);  // Обновление выбранного города
        setOpen(false);         // Закрытие модального окна

        if (props.onCityChange) {
            props.onCityChange(town)
        }
    };

    return (
        <>
            <div className="AverageCardsWrapper">
                <div className="AverageHeader">
                    <h1>Средние показатели</h1>
                    <button className="AverageHeaderBtn" onClick={handleClickOpen}>
                        <p>{selectedTown}</p> {/* Изменяемый текст на кнопке */}
                        <img src={arrow} alt="arrow"/>
                    </button>
                </div>
                <div className="AverageCardsContent">
                    <div className="AverageCardsBody">
                        <div className="card">
                            <h3>Количество оказанных услуг</h3>
                            <div className="cardInfo">
                                <img src={countIcon} alt="countIcon"/>
                                <p>{average.count}</p>
                            </div>
                        </div>
                        <div className="card">
                            <h3>Процент оказаных услуг в зоне СПС</h3>
                            <div className="cardInfo">
                                <img src={percentage} alt="percentage"/>
                                <p>{average.average_success}</p>
                            </div>
                        </div>
                        <div className="card">
                            <h3>Время оказания услуги</h3>
                            <div className="cardInfo">
                                <img src={timeIcon} alt="timeIcon"/>
                                <p className="cardInfoTime">
                                    {average.seconds}
                                </p>
                            </div>
                        </div>
                        <div className="cardRating">
                            <div className="cardRateBody">
                                <div className="cardRateScale">
                                    <div className="progress progress-five" style={{width: `${rating.five}%`}}></div>
                                </div>
                                <img src={smileFive} alt="5"/>
                            </div>
                            <div className="cardRateBody">
                                <div className="cardRateScale">
                                    <div className="progress progress-four" style={{width: `${rating.four}%`}}></div>
                                </div>
                                <img src={smileFour} alt="4"/>
                            </div>
                            <div className="cardRateBody">
                                <div className="cardRateScale progress">
                                    <div className="progress progress-three" style={{width: `${rating.three}%`}}></div>
                                </div>
                                <img src={smileThree} alt="3"/>
                            </div>
                            <div className="cardRateBody">
                                <div className="cardRateScale">
                                    <div className="progress progress-two"  style={{width: `${rating.two}%`}}></div>
                                </div>
                                <img src={smileTwo} alt="2"/>
                            </div>
                            <div className="cardRateBody">
                                <div className="cardRateScale">
                                    <div className="progress progress-one"  style={{width: `${rating.one}%`}}></div>
                                </div>
                                <img src={smileOne} alt="1"/>
                            </div>
                        </div>
                    </div>
                    <div className="calendarContainer">
                        <p className="currentDateHeader">Текущая дата</p>
                        <Calendar/>
                    </div>

                </div>
                {/* Модальное окно для выбора населенного пункта */}
                <ThemeProvider theme={customTheme}>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle sx={{m: 0, p: 0}}>
                            Населенный пункт
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={(theme) => ({
                                    position: 'absolute',
                                    right: 50,
                                    top: 30,
                                    color: 'var(--blackContent)',
                                })}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={2}>
                                {towns.map((town) => (
                                    <Grid item xs={3} key={town}>
                                        <Button onClick={() => handleTownSelect(town)}>{town}</Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                        <DialogActions/>
                    </BootstrapDialog>
                </ThemeProvider>
            </div>
        </>
    );
};

export default AverageCards;
