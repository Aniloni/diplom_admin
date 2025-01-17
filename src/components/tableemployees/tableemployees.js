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
import TableSortLabel from '@mui/material/TableSortLabel';

const StyledTableHead = styled(TableHead)({
    backgroundColor: 'var(--white)',
    '& th': {
        color: 'var(--blackContent)',
        borderBottom: '2px solid var(--brownOpacity60)',
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
    // borderBottom: '1px solid var(--brownOpacity60)', // Измените цвет на нужный вам
    padding:'8px 32px'
  });

const StyledTableCell = styled(TableCell)({
    borderBottom: '2px solid var(--brownOpacity60)',
    color: 'var(--blackContent)',
    padding: '16px',
    fontFamily: "PT Sans",
    fontSize: "16px",
    fontWeight: "400",
    maxWidth: '100px', 
});


const StyledTableContainer = styled(TableContainer)({
    border: '2px solid var(--brownOpacity60)', 
    borderRadius: '28px', 
    overflow: 'hidden',
    width: '950px',
});

const TableEmployees = () => {
  function createData(name) {
    return {
      name,
      history: [
        {
          date: '2020.01.05',
          service: 'Выдача паспорта',
          received: 'Зона СПС',
          time: '00:15:50',
          result: 'Оказана',
          mark: 5,
        },
        {
          date: '2020.02.05',
          service: 'Выдача паспорта',
          received: 'Зона СПС',
          time: '00:29:50',
          result: 'Оказана',
          mark: 4,
        },
      ],
    };
  }

  // Сортировка по дате
function descendingComparator(a, b) {
  const dateA = a.date ? new Date(a.date.split('.').reverse().join('-')) : new Date(0);
  const dateB = b.date ? new Date(b.date.split('.').reverse().join('-')) : new Date(0);
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

  function Row(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedHistory = React.useMemo(() => {
        return [...props.row.history].sort(getComparator(order));
    }, [props.row.history, order]);
    
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          {/* ФИО слева */}
          <StyledNameCell component="th" scope="row"  sx={ { borderBottom: open ? '2px solid var(--brownOpacity60)' : 'none'  } }>
            {row.name}
          </StyledNameCell>
          {/* Иконка раскрытия справа */}
          <TableCell align="right"     sx={ { borderBottom: open ? '2px solid var(--brownOpacity60)' : 'none'  } }>    
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
                      <TableCell>
                      <TableSortLabel
                        active={orderBy === 'date'}
                        direction={orderBy === 'date' ? order : 'asc'}
                        onClick={(event) => handleRequestSort(event, 'date')}
                      >
                          Дата
                      </TableSortLabel>
                      </TableCell>
                      <TableCell>Название услуги</TableCell>
                      <TableCell>Получена с</TableCell>
                      <TableCell>Длительность</TableCell>
                      <TableCell>Результат</TableCell>
                      <TableCell>Оценка</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {sortedHistory.map((historyRow) => (
                      <TableRow key={historyRow.date}  sx={{
                        '&:last-child td, &:last-child th': { borderBottom: 'unset' }, // Убираем границу последней строки
                      }}>
                        <StyledTableCell>{historyRow.date}</StyledTableCell>
                        <StyledTableCell>{historyRow.service}</StyledTableCell>
                        <StyledTableCell>{historyRow.received}</StyledTableCell>
                        <StyledTableCell>{historyRow.time}</StyledTableCell>
                        <StyledTableCell>{historyRow.result}</StyledTableCell>
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
        <StyledTableContainer sx={{margin:'10px 30px'}} component={Paper} key={row.name}>
          <Table aria-label="collapsible table">
          <TableBody sx={{
                '& .MuiTableRow-root': { borderBottom: '2px solid white' }, // Убираем нижнюю границу
              }}>
              <Row row={row} />
            </TableBody>
          </Table>
        </StyledTableContainer>
      ))}
    </>
  );
};

export default TableEmployees;
