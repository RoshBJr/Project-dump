import {useState, Fragment, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomSelect from './CustomSelect';
import {createTask, modifyTask} from '../code/add-task';
import { updateTaskListModify } from '../code/update-tasklist';

export default function TaskForm(props) {
  const [open, setOpen] = useState(false);
  const [urgency, setUrgency] = useState('');
  const [container, setContainer] = useState('');
  const [taskName, setTaskName] = useState('');
  const [blMod, setBlMod] = useState(true);
  const [modTaskId, setModTaskId] = useState('');
  const inputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      if(inputRef) inputRef.current.select();
    }, 100)
  };

  const handleClose = () => {
    setOpen(false);
    setBlMod(true);
    setModTaskId('');
    setTaskName('');
    setContainer('');
    setUrgency('');
  };
  
  useEffect(()=> {
    // console.log(props.taskList);
    props.taskList.map(task => {
      if(task.blModify) {
        updateTaskListModify(props.setTaskList, task.dragid, false);
        setBlMod(false);
        setTaskName(task.taskName);
        setContainer(task.dropid);
        setUrgency(task.taskUrgency);
        setModTaskId(task.dragid);
        handleClickOpen();
      }
    });
  }, [props.taskList])

  return (
    <Fragment>
      <div className='fixed bottom-0 right-0 pr-5 pb-5'>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            setTaskName(formJson.taskname);
            if(taskName == "") return;
            if(blMod) {
              createTask(props.taskList, props.setTaskList, 
                urgency, taskName, container, props.containers, 
                props.urgOptions);
            } else {
              modifyTask(props.taskList, props.setTaskList, urgency, taskName, container,
                props.containers, props.urgOptions, modTaskId);
            }
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
                      onChange={e => setTaskName(e.target.value)}
                      placeholder='Enter new task'
                      value={taskName}
                    />
                </div>
                <CustomSelect
                    value={urgency}
                    setValue={setUrgency}
                    label={"Task urgency"}
                    options={props.urgOptions}
                />
                <CustomSelect
                    value={container}
                    setValue={setContainer}
                    label={"Task state"}
                    options={props.containers}
                />
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{blMod ? "Create": "Modify"}</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
