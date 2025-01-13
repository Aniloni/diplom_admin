import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'var(--beigeOpacity10)',
  fontFamily: "PT Sans",
  color: 'black',
  height: '66px',
  fontSize: '16px',
  borderRadius: '10px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));
 
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontFamily: "PT Sans",
  fontSize: '18px',
  color: 'black', 
  transition: 'all 0.2s ease-out', 
  transform: 'translate(15px, 23px) scale(1)', 
  '&.MuiInputLabel-shrink': {
    transform: 'translate(15px, -24px) scale(0.9)',
    color: 'black', 
  },
  '&.Mui-focused': {
    color: 'black', 
  },
}));
const Option = (props) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{  margin: 0, minWidth: 136 }}>
        <StyledInputLabel id="demo-simple-select-helper-label"  >{props.label}</StyledInputLabel>
        <StyledSelect
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label={props.label}
          onChange={handleChange}
        >
        {props.data.map((element, index) => (
          <MenuItem key={index} value={element}>
            {element}
          </MenuItem>
        ))}
        </StyledSelect>
      </FormControl>
    </div>
  );
}
export default Option;