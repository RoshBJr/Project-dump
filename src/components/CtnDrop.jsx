import { useEffect, useState } from 'react';
import {Droppable} from '../components/Droppable';

export default function CtnDrop(props) {
  const [parent, setParent] = useState([]);

  useEffect(() => {
    console.log(props.mainParent);
    if(props.mainParent.length !== 0) {
      let id = props.id - 1;
      let key = Object.keys(props.mainParent[id])[0];
      setParent(props.mainParent[id][key]);
    }
  }, [props.mainParent])

  return (
      <Droppable id={`droppable${props.id}`}>
        <div className="container-drop">
          {parent.length !== 0 ? 
            props.drag.map(item => {
              if(parent.includes(item.props.id)) {
                return(item)
              }
            })
            : 
            <h2 className="text">Drop here</h2>
          }
        </div>
      </Droppable>
  );
}