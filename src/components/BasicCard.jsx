import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import deleteTask from '../code/delete-task';

export default function BasicCard(props) {
  
  const removeTask = () => {
    deleteTask(props.setList, props.id);
  }

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{props.taskName}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
        </IconButton>
      </div>
      
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Task urgency:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {props.taskUrgency}
          </Typography>
        </div>
        <Button
          onMouseDown={removeTask}
          variant="solid"
          size="md"
          color="primary"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}