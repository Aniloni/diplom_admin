import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from '@mui/material/Pagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import styled from '@emotion/styled';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import ProvisionCategories from "../../API/ProvisionCategories";


const StyledTableContainer = styled(TableContainer)({
    borderRadius: '28px',
    border: '1px solid var(--brownOpacity60)',
    overflow: 'hidden',
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: 'var(--white)',
    '& th': {
        color: 'var(--blackContent)',
        border: '1px solid var(--brownOpacity60)',
        fontFamily: "PT Sans",
        fontSize: "16px",
        fontWeight: "400",
        textAlign: "left",
        height: "66px",
    },
});

const StyledTableCell = styled(TableCell)({
    border: '1px solid var(--brownOpacity60)',
    padding: '15px',
    fontFamily: "PT Sans",
    fontSize: "16px",
    fontWeight: "400",
    height: "66px",
});

const customTheme = createTheme({
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '28px !important',
                    overflow: 'hidden',
                    paddingTop: '30px',
                    paddingLeft: '0',
                    minWidth: '970px',
                    maxWidth: '970px',
                }
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: 0,
                }
            }
        }
    },
});

// Сортировка по дате
function descendingComparator(a, b) {
    const dateA = new Date(a.created_at.split('.').reverse().join('-'));
    const dateB = new Date(b.created_at.split('.').reverse().join('-'));
    if (dateB < dateA) {
        return -1;
    }
    if (dateB > dateA) {
        return 1;
    }
    return 0;
}

function getComparator(order) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b)
        : (a, b) => -descendingComparator(a, b);
}

const BasicTable = function (props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');


    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);

    // useEffect(() => {
    //     const fetchData = async () => {

    //         let today = new Date();
    //         let lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    //         const response = await ProvisionCategories.list({
    //             date_from: lastMonth,
    //             date_to: today,
    //             page: page,
    //             city: props.city
    //         })
    //         setRows(response)
    //     }
    //     fetchData();
    // }, [page, props.city])


    // const getProvisionCategories = async (uid) => {
    //     setSelectedRow(await ProvisionCategories.get({uid: uid}))
    // }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = React.useMemo(() =>
        [...rows].sort(getComparator(order, orderBy)), [order, orderBy]);

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (row) => {
        // getProvisionCategories(row.uid)
        setOpen(true); // Открываем модальное окно
    };

    const handleClose = () => {
        setOpen(false); // Закрываем модальное окно
    };

    const handleChangePage = (event, value) => {
        setPage(value)
    }

    return (
        <div>
            <StyledTableContainer component={Paper} sx={{width: "970px"}}>
                <Table sx={{width: "970px"}}>
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'date'}
                                    direction={orderBy === 'date' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'date')}
                                >
                                    Дата
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Офис МФЦ</TableCell>
                            <TableCell>Название услуги</TableCell>
                            <TableCell>Получена с</TableCell>
                            <TableCell>Длительность</TableCell>
                            <TableCell>Результат</TableCell>
                            <TableCell>Оценка</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} onClick={() => handleRowClick(row)} // Добавляем обработчик клика
                                      style={{cursor: "pointer"}}>
                                <StyledTableCell align="center" width="92px" component="th"
                                                 scope="row">{row.created_at}</StyledTableCell>
                                <StyledTableCell align="left" width="206px">{row.office}</StyledTableCell>
                                <StyledTableCell align="left" width="231px">{row.category}</StyledTableCell>
                                <StyledTableCell align="center"
                                                 width="118px">{row.use_phone ? 'Телефон заявителя' : 'Зона СПС'}</StyledTableCell>
                                <StyledTableCell align="center" width="125px">{row.time}</StyledTableCell>
                                <StyledTableCell align="left"
                                                 width="124px">{row.is_success ? 'Оказана' : 'Консультация'}</StyledTableCell>
                                <StyledTableCell align="right" width="73px">{row.rating}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <Pagination
                onChange={handleChangePage}
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{
                    mt: '15px',
                    '& .MuiPaginationItem-root': {
                        borderColor: 'var(--brownOpacity60)',
                        color: 'var(--blackContent)',
                        minWidth: '30px',
                        fontFamily: "PT Sans",
                        fontSize: "16px",
                        fontWeight: "400",
                    },
                    '& .Mui-selected': {
                        backgroundColor: 'var(--beigeOpacity10)',
                    },
                }}
            />

            <ThemeProvider theme={customTheme}>
                {/* Модальное окно */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    width="970px"
                >
                    <DialogTitle
                        sx={{
                            color: 'var(--blackContent)',
                            fontSize: "32px",
                            fontWeight: "400",
                            padding: "0px",
                            marginBottom: "30px",
                            marginLeft: "50px",
                        }}
                    >
                        Карточка заявителя
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 50,
                                top: 30,
                                color: "var(--blackContent)",
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        {selectedRow && (
                            <Table
                                sx={{
                                    "& td": {
                                        color: 'var(--blackContent)',
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        padding: "15px 22px",
                                        border: "1px solid var(--brownOpacity60)",
                                        textAlign: "left",
                                        height: "66px",
                                        borderLeft: "none",
                                    },
                                    "& tr td:last-child": {
                                        borderRight: "none",
                                    },
                                }}
                            >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>ФИО заявителя</TableCell>
                                        <TableCell>{selectedRow.citizen}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Дата обращения</TableCell>
                                        <TableCell>{selectedRow.created_at}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ФИО сотрудника</TableCell>
                                        <TableCell>{selectedRow.user}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Офис МФЦ</TableCell>
                                        <TableCell>{selectedRow.office}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Телефон</TableCell>
                                        <TableCell>{selectedRow.phone ?? '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>СНИЛС</TableCell>
                                        <TableCell>{selectedRow.snils ?? '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Название компании</TableCell>
                                        <TableCell>{selectedRow.company_name ?? '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Название услуги</TableCell>
                                        <TableCell>{selectedRow.categories}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Обращение в зоне СПС / с телефона заявителя</TableCell>
                                        <TableCell>{selectedRow.use_phone ? 'С телефона заявителя' : 'Обращение в зоне СПС'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Время оказания услуги</TableCell>
                                        <TableCell>{selectedRow.time}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Результат (оказана/консультация)</TableCell>
                                        <TableCell>{selectedRow.is_success ? 'Оказана': 'Консультация'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Причина почему не получилось</TableCell>
                                        <TableCell>{selectedRow.reason ?? '-'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Оценка</TableCell>
                                        <TableCell>{selectedRow.rating}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Отзыв заявителя</TableCell>
                                        <TableCell>{selectedRow.comment}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )}
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default BasicTable;
