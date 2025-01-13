import React, {useEffect, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import InputModal from "../../components/inputs/input-model/input-modal";
import Button from "../../components/buttons/Button";
import OptionModal from '../option/option-modal/option-modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './addEmpoyee.scss'
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
            padding: 0,
          }
        }
      }
    },
  });
  

const AddEmployee = () =>{
    const [open, setOpen] = useState(false); // Состояние для управления открытием/закрытием модального окна
    const [snils, setSnils] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [office, setOffice] = useState(''); // Состояние для выбора офиса

    const [officeList, setOfficeList] = useState([]);

    // const sendResponse = async () => {
    //     const response = await OfficeService.List()

    //     response.data.forEach(element => {
    //         element.label = element.title;
    //         element.value = element.id;
    //     });
    //     setOfficeList(response.data)
    // }

    // useEffect(() => {
    //     sendResponse();
    // }, []);

    const handleClickOpen = () => {
        setOpen(true);  // Открыть модальное окно
    };

    const handleClose = () => {
        setOpen(false); // Закрыть модальное окно
    };

    return(
        <>
         <Button className={"btn_office three"} onClick={handleClickOpen}>добавить сотрудника</Button>
         <ThemeProvider theme={customTheme}>
            {/* Модальное окно для добавления сотрудника */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    Добавить сотрудника
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
                        label="СНИЛС"
                        required
                        value={snils}
                        onChange={(e) => setSnils(e.target.value)}
                    />
                    <InputModal
                        label="Фамилия"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <InputModal
                        label="Имя"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <InputModal
                        label="Отчество"
                        required
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />

                    <InputModal
                        label="Пароль"
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     <InputModal
                        label="Роль"
                        required
                        type="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <OptionModal
                        label="Название офиса"
                        required
                        options={officeList}
                        value={office}
                        onChange={(e) => setOffice(e.target.value)}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button className="btn_office three modal" onClick={handleClose}>
                        добавить сотрудника
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            </ThemeProvider>
        </>
    );
}

export default AddEmployee;