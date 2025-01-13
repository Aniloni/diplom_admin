import '../addEmployee/addEmpoyee.scss'
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import InputModal from "../../components/inputs/input-model/input-modal";
import Button from "../../components/buttons/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import OfficeService from "../../API/OfficeService";

// Стили для модального окна
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

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
            margin:'25px',
            padding:0,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '28px !important',
            overflow: 'hidden',
            marginTop: '25px',
            padding:0,
            minWidth: '708px',
            maxWidth: '708px',
          },
        },
      },
      MuiDialogContent:{
        styleOverrides:{
          root:{
            color:' var(--blackContent)',
            border: 'none !important',
            padding:'25px 25px 0 25px !important',
          },
        },
      },
      MuiDialogActions:{
        styleOverrides:{
          root:{
            justifyContent: 'flex-start',
            marginBottom: '25px',
            padding: '0 !important',
          }
        }
      }
    },
  });
  

const AddOffice = () => {
    const [open, setOpen] = useState(false); // Состояние для управления открытием/закрытием модального окна
    const [officeName, setOfficeName] = useState('');
    const [city, setCity] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');

    const handleClickOpen = () => {
        setOpen(true);  // Открыть модальное окно
    };

    const handleClose = () => {
        setOpen(false); // Закрыть модальное окно
    };

    // const handleOfficeClickAdd = () => {
    //     OfficeService.add_office({
    //         title: officeName,
    //         city: city,
    //         address: officeAddress,
    //     })
    //     setOpen(false); // Закрыть модальное окно
    // }

    return(
        <>
         <Button className={"btn_office one"} onClick={handleClickOpen}>добавить офис</Button>
         <ThemeProvider theme={customTheme}>
            {/* Модальное окно для добавления офиса */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    Добавить офис МФЦ
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 25,
                            top: 32,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <InputModal 
                        label="Название офиса"
                        required
                        value={officeName}
                        onChange={(e) => setOfficeName(e.target.value)}
                        className="officeName"
                    />
                    <InputModal
                        label="Город"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <InputModal
                        label="Адрес"
                        required
                        value={officeAddress}
                        onChange={(e) => setOfficeAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="btn_office one modal" onClick={{/*handleOfficeClickAdd*/}}>
                        добавить офис
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            </ThemeProvider>
        </>
    );
}

export default AddOffice;