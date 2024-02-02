import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Id, Task } from '../types';
import { ChangeEvent } from 'react';
import date from '../code/generateDate';

interface Props {
    task: Task;
    updateTask: (id: Id, content: string, urgValue: string, dateModified:string) => void;
}

export default function CustomSelect({task, updateTask}: Props) {
  

  function handleChange(e:any) {
    updateTask(task.id, task.content, e.target.value, date());
    
  };

  return (
    <div>
      <FormControl className='bg-gray-900 w-1/2 h-[50px]'>
        <InputLabel
          className='text-white'
          id="demo-simple-select-autowidth-label">
            Task Urgency
        </InputLabel>
        <Select
            className='text-white'
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={task.urgValue}
            onChange={handleChange}
            label="Task Urgency"
            
        >
          {
            task.urgency.map( (option, index) => {
              return(
                <MenuItem
                  className='bg-gray-900 text-white hover:bg-rose-500'
                  key={index} value={option}
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