import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import generate from '../code/generateIds';

export default function CustomSelect(props) {
  

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">{props.label}</InputLabel>
        <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={props.value}
            onChange={handleChange}
            label={props.label}
            
        >
          {
            props.options.map(option => {
              return(
                <MenuItem 
                  key={generate()} value={option}
                >
                  {option}
                </MenuItem>)
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}