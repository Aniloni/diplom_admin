import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../../components/buttons/Button";
import InputModal from "../../components/inputs/input-model/input-modal";
import styled from "@emotion/styled";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OptionModal from '../option/option-modal/option-modal';
import "./tableOffice.scss";
// import OfficeService from "../../API/OfficeService";

// Стили для модального окна
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

// Данные сотрудников
// const employees = [
//   {
//     id: 1,
//     snils: "123456678",
//     name: "Иванов Иван Иванович",
//     office: "МФЦ Первомайского района",
//   },
//   {
//     id: 2,
//     snils: "876543219",
//     name: "Петров Пётр Петрович",
//     office: "МФЦ Центрального района",
//   },
// ];

// Стили таблицы
const StyledTableContainer = styled(TableContainer)({
  borderRadius: "28px",
  border: "1px solid var(--brownOpacity60)",
  overflow: "hidden",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "var(--white)",
  "& th": {
    color: "var(--blackContent)",
    border: "1px solid var(--brownOpacity60)",
    fontFamily: "PT Sans",
    fontSize: "20px",
    fontWeight: "400",
    textAlign: "center",
    height: "66px",
  },
});

const StyledTableCell = styled(TableCell)({
  border: "1px solid var(--brownOpacity60)",
  fontFamily: "PT Sans",
  fontSize: "20px",
  fontWeight: "400",
  height: "66px",
});

const TableOffice = (props) => {
  const [openDialog, setOpenDialog] = useState({ type: null, employee: null }); // Управление модальными окнами
  const [editableData, setEditableData] = useState(null); // Данные для редактирования
  const [office, setOffice] = useState({}); // Состояние для выбора офиса
  const [employees, setEmployees] = useState([]); // Сотрудники офиса

  // const sendResponse = async () => {
  //   console.log(office)
  //   const response = await OfficeService.list_user(props.office_obj.id)
  //   setEmployees(response.data);
  // }


  // useEffect(() => {
  //   if (!props.plug) {
  //     setOffice(props.office_obj)
  //     sendResponse()
  //   }
  // }, [props.plug, props.office_obj])

  // const handleOpenDialog = (type, employee) => {
  //   setOpenDialog({ type, employee });

    // setEditableData({
    //   snils: employee.snils,
    //   lastName: employee.last_name,
    //   firstName: employee.first_name,
    //   middleName: employee.sur_name
    // });
  // };

  const handleCloseDialog = () => {
    setOpenDialog({ type: null, employee: null });
    setEditableData(null);
  };

  // Функция для обработки изменения в полях ввода
  // const handleInputChange = (field, value) => {
  //   setEditableData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  return (
    <div>
      <StyledTableContainer component={Paper} sx={{ width: "972px" }}>
        <Table sx={{ width: "972px" }}>
          <StyledTableHead>
            <TableRow>
              <TableCell>ФИО Сотрудника МФЦ</TableCell>
              <TableCell>Изменить данные сотрудника</TableCell>
              <TableCell>Уволить сотрудника</TableCell>
              <TableCell>Перевод в другой офис</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.uid}>
                <StyledTableCell align="left" width="444px">
                  {employee.first_name} {employee.sur_name} {employee.last_name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="210px"
                  style={{ cursor: "pointer" }}
                  //onClick={() => handleOpenDialog("edit", employee)}
                >
                  Изменить
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="149px"
                  style={{ cursor: "pointer" }}
                  //onClick={() => handleOpenDialog("fire", employee)}
                >
                  Уволить
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  width="165px"
                  style={{ cursor: "pointer" }}
                  //onClick={() => handleOpenDialog("transfer", employee)}
                >
                  Перевод
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {/* Модальное окно для увольнения */}
      {openDialog.type === "fire" && openDialog.employee && (
        <ThemeProvider theme={customTheme}>
        <Dialog
          open
          onClose={handleCloseDialog}
          aria-labelledby="modal-title-fire"
        >
          <DialogTitle id="modal-title-fire">
            Уволить сотрудника
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 25,
                top: 25,
                color: "var(--blackContent)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <InputModal
              label="СНИЛС"
              required
              value={openDialog.employee.snils}
            />
            <InputModal
              label="Фамилия"
              required
              value={openDialog.employee.name.split(" ")[0]}
            />
            <InputModal
              label="Имя"
              required
              value={openDialog.employee.name.split(" ")[1]}
            />
            <InputModal
              label="Отчество"
              required
              value={openDialog.employee.name.split(" ")[2]}
            />
            <InputModal
              label="Название офиса"
              required
              className="officeName"
              value={openDialog.employee.office}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="btn_office btn_fire"
              onClick={() => { handleCloseDialog(); }}
            >
              удалить сотрудника
            </Button>
          </DialogActions>
        </Dialog>
        </ThemeProvider>
      )}
      {/* Модальное окно для изменения данных */}
      {openDialog.type === "edit" && openDialog.employee && (
      <ThemeProvider theme={customTheme}>
        <Dialog
          open
          onClose={handleCloseDialog}
          aria-labelledby="modal-title-edit"
        >
          <DialogTitle id="modal-title-edit">
            Изменить данные сотрудника
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 25,
                top: 25,
                color: "var(--blackContent)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
          <InputModal
                label="СНИЛС"
                required
                value={editableData.snils}
                //onChange={(e) => handleInputChange("snils", e.target.value)}
              />
              <InputModal
                label="Фамилия"
                required
                value={editableData.lastName}
                //onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <InputModal
                label="Имя"
                required
                value={editableData.firstName}
                //onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <InputModal
                label="Отчество"
                required
                value={editableData.middleName}
                //onChange={(e) => handleInputChange("middleName", e.target.value)}
              />
          </DialogContent>
          <DialogActions>
            <Button
              className="btn_office btn_edit"
              onClick={() => { handleCloseDialog(); }}
            >
              изменить данные
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      )}

      {/* Модальное окно для перевода */}
      {openDialog.type === "transfer" && openDialog.employee && (
      <ThemeProvider theme={customTheme}>
        <Dialog
          open
          onClose={handleCloseDialog}
          aria-labelledby="modal-title-transfer"
        >
          <DialogTitle id="modal-title-transfer">
            Перевести сотрудника в другой офис
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 25,
                top: 25,
                color: "var(--blackContent)",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <InputModal
              label="СНИЛС"
              required
              value={openDialog.employee.snils}
            />
            <InputModal
              label="Фамилия"
              required
              value={openDialog.employee.last_name}
            />
            <InputModal
              label="Имя"
              required
              value={openDialog.employee.first_name}
            />
            <InputModal
              label="Отчество"
              required
              value={openDialog.employee.sur_name}
            />
            <OptionModal
              label="Название офиса"
              required
              options={props.office_list}
              value={office.title}
              onChange={(e) => setOffice(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="btn_office btn_transfer"
              onClick={() => {
                handleCloseDialog();
              }}
            >
              перевести сотрудника
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
      )}
    </div>
  );
};

export default TableOffice;
