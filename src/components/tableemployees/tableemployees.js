import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from '@emotion/styled';

const StyledTableHead = styled(TableHead)({
    backgroundColor: 'var(--white)',
    '& th': {
        color: 'var(--blackContent)',
        borderBottom: '1px solid var(--brownOpacity60)',
        fontFamily: "PT Sans",
        fontSize: "16px",
        fontWeight: "400",
        height: "66px",
    },
});

const StyledNameCell = styled(TableCell)({
    fontSize: '16px',
    fontWeight: '400',
    color: 'var(--blackContent)',
    textAlign: 'left',
    borderBottom: '2px solid var(--yourColor)', // Измените цвет на нужный вам
  });

const StyledTableCell = styled(TableCell)({
    borderBottom: '1px solid var(--brownOpacity60)',
    color: 'var(--blackContent)',
    padding: '16px',
    fontFamily: "PT Sans",
    fontSize: "16px",
    fontWeight: "400",
    height: "66px",
    maxWidth: '100px', 
});


const StyledTableContainer = styled(TableContainer)({
    border: '2px solid var(--brownOpacity60)', 
    borderRadius: '28px', 
    overflow: 'hidden',
});

const TableEmployees = () => {
  function createData(name) {
    return {
      name,
      history: [
        {
          date: '2020-01-05',
          service: 'Выдача паспорта',
          received: 'Зона СПС',
          time: '00:15:50',
          result: 'Оказана',
          mark: 5,
        },
        {
          date: '2020-02-05',
          service: 'Выдача паспорта',
          received: 'Зона СПС',
          time: '00:29:50',
          result: 'Оказана',
          mark: 4,
        },
      ],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          {/* ФИО слева */}
          <StyledNameCell component="th" scope="row">
            {row.name}
          </StyledNameCell>
          {/* Иконка раскрытия справа */}
          <TableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0, padding: 0 }}> {/* Убираем отступы */}
                <Table
                  size="small"
                  aria-label="purchases"
                  sx={{ borderRadius: '28px', margin: 0, padding: 0 }} // Убираем отступы у таблицы
                >
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Дата</TableCell>
                      <TableCell>Название услуги</TableCell>
                      <TableCell>Получена с</TableCell>
                      <TableCell>Длительность</TableCell>
                      <TableCell>Результат</TableCell>
                      <TableCell>Оценка</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <StyledTableCell>{historyRow.date}</StyledTableCell>
                        <StyledTableCell>{historyRow.service}</StyledTableCell>
                        <StyledTableCell align="right">{historyRow.received}</StyledTableCell>
                        <StyledTableCell align="right">{historyRow.time}</StyledTableCell>
                        <StyledTableCell align="right">{historyRow.result}</StyledTableCell>
                        <StyledTableCell align="left">{historyRow.mark}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      history: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          service: PropTypes.string.isRequired,
          received: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          result: PropTypes.string.isRequired,
          mark: PropTypes.number.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  const rows = [
    createData('Иванов Иван Иванович'),
    createData('Петров Петр Петрович'),
    createData('ФИО'),
  ];

  return (
    <>
      {rows.map((row) => (
        <StyledTableContainer component={Paper} key={row.name}>
          <Table aria-label="collapsible table">
          <TableBody sx={{ borderBottom: '2px solid white' }}>
              <Row row={row} />
            </TableBody>
          </Table>
        </StyledTableContainer>
      ))}
    </>
  );
};

export default TableEmployees;
