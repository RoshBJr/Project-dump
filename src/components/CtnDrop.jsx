import { useEffect, useState } from 'react';
import {Droppable} from '../components/Droppable';

export default function CtnDrop(props) {
  const [parent, setParent] = useState([]);

  // useEffect(() => {
  //   // console.log(props.mainParent);
  //   if(props.mainParent.length !== 0) {
  //     let id = props.id - 1;
  //     let key = Object.keys(props.mainParent[id])[0];
  //     setParent(props.mainParent[id][key]);
  //   }
  // }, [props.mainParent])

  useEffect(() => {
    // console.log(props.mainParent[props.i]);
  }, [props.mainParent])
  return (
      <Droppable id={props.id}>
        <div className="container-drop">
          {props.mainParent.length !== 0 ?
            props.mainParent[props.i][props.id].length !== 0 ? 
              props.mainParent[props.i][props.id].map(item => {
                  return(item)
              })
              :
              <h2 className="text">Drop here</h2>
            : 
            <h2 className="text">Drop here</h2>
          }
        </div>
      </Droppable>
  );
}