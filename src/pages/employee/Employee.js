// import Button from "../../components/buttons/Button";
import AddEmployee from "../../components/addEmployee/addEmpoyee";
import AddOffice from '../../components/addOffice/addOffice'
import TableOffice from "../../components/tableOffice/tableOffice";
import arrow from "../../img/arrow.svg";
import React, {useState, useEffect} from 'react';
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
import DeleteOffice from '../../components/deleteOffice/deleteOffice'
import AverageCards from'../../components/AverageCards/AverageCards'
import Search from "../../components/search/Search";
import TableEmployees from "../../components/tableemployees/tableemployees"
import "./Employee.scss";
// import OfficeService from "../../API/OfficeService";
// import UserService from "../../API/UserService";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Employee = () => {
    const [selectedOffice, setSelectedOffice] = useState({title: 'Загрузка...', plug: true});
    const [plug, setPlug] = useState(true);

    const [offices, setOffices] = useState([]);

    // const sendResponse = async () => {
    //     const response = await OfficeService.List()
    //     const office_current = await OfficeService.getCurrentOffice()

    //     setOffices(response.data);
    //     setSelectedOffice(office_current.data)
    //     setPlug(false)
    // }

    // const updateSelectedOffice = async (office) => {
    //     const office_current = await OfficeService.getOffice(office.id)
    //     setSelectedOffice(office_current.data);
    //     setPlug(false)
    // }

    // useEffect(() => {
    //     sendResponse();
    // }, [])

    const [open, setOpen] = useState(false);  // Состояние для открытия модального окна

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOfficeSelect = (office) => {
        // updateSelectedOffice(office)
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
                        paddingRight: '50px',
                        minWidth: '1104px',
                        maxWidth: '1184px',
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

    return (
        <div >
            <AverageCards/>
            <div className="office">
                    <h1>Информация о сотрудниках</h1>
                    <button className="AverageHeaderBtn" onClick={handleClickOpen}>
                        <p>{selectedOffice.title}</p> {/* Изменяемый текст на кнопке */}
                        <img src={arrow} alt="arrow"/>
                    </button>
            </div>

             {/* Модальное окно для выбора офиса*/}
             <ThemeProvider theme={customTheme}>
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle sx={{m: 0, p: 0}}>
                            Офис МФЦ
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
                                {offices.map((office) => (
                                    <Grid item xs={3} key={office.name}>
                                        <Button onClick={() => handleOfficeSelect(office)}>{office.title}</Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                        <DialogActions/>
                    </BootstrapDialog>
                </ThemeProvider>

                <Search></Search>

                <TableEmployees></TableEmployees>
        </div>
    );
};

export default Employee;
