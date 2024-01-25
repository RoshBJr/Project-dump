import {useState, Fragment, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomSelect from './CustomSelect';
import { modifyTask  } from '../code/add-task';

export default function TaskFormModify(props) {
  const [open, setOpen] = useState(false);
  const [urgency, setUrgency] = useState(props.taskUrgency);
  const [container, setContainer] = useState(props.dropid);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("clicked");
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      if(inputRef) inputRef.current.select();
    }, 100)
  };

  const handleClose = () => {
    setOpen(false);
    props.setModify(false);
  };
  

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const taskName = formJson.taskname;
            if(taskName == "") return;
            modifyTask(props.taskList, props.setList, urgency, props.taskName, container);
            setContainer('');
            setUrgency('');
            handleClose();
          },
        }}
      >
        <DialogTitle >Task it 🗒️</DialogTitle>
        <DialogContent>
        <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                    <span className=''>Task Name</span>
                    <input
                      autoComplete='off'
                      ref={inputRef}
                      className='criss'
                      type="text"
                      name='taskname'
                      placeholder='Enter new task'
                    
                    />
                </div>
                <CustomSelect
                    value={urgency}
                    setValue={setUrgency}
                    label={"Task urgency"}
                    options={props.urgOptions}
                />
                
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Modify</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
