import search from "../../imgMFC/loupeSearch.svg";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
const StyledTextField = styled(TextField)({
  '& label': {
    fontFamily: "PT Sans",
    color:'var(--brownOpacity60)', 
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20.7px',
    textAlign: 'left',
    transform: 'translate(25px, 19px) scale(1)', // Положение лейбла по умолчанию
  },
  '& label.MuiInputLabel-shrink': {
    transform: 'translate(25px, -10px) scale(0.75)', 
  },
    '& label.Mui-focused': {
      color: 'var(--brownOpacity60)', 
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', 
      },
      '&:hover fieldset': {
        border: 'none', 
      },
      '&.Mui-focused fieldset': {
        border: 'none', 
      },
    },
  });

  const Search  = ({ width = 760.66 }) =>{
    return(
      <Paper
          component="form"
          sx={{ 
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center', 
              width: width,
              height: 44,
              boxShadow: 'none',
              backgroundColor: 'var(--beigeOpacity10)',
            }}
          >
          <StyledTextField
              label="ПОИСК"  // Это то, что сдвинется вверх
              variant="outlined"
              sx={{ ml: 1, flex: 1 }}
          />
          <IconButton type="button" sx={{ p: '10px', marginRight: '25px', borderRadius: '20px',}} aria-label="search">
          <img src={search} alt="Search" width="24" height="24" />
          </IconButton>
      </Paper>
    );
  };

  export default Search;