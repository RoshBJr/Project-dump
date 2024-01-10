import { useEffect, useState } from 'react';
import {Droppable} from '../components/Droppable';

export default function CtnDrop(props) {
  const [dropContent, setDropContent] = useState([]);

  useEffect(() => {
    // console.log("droppable " + props.id);
    // console.log(props.parent);
    // console.log(props.parent.includes(`droppable${props.id}`));
    // isDoubled();
    // console.log('parent ',props.parent);
    // console.log('dropcontent ', dropContent);

  }, [props.parent])
 

  return (
      
    <Droppable id={`droppable${props.id}`}>
      <div className="container-drop">
        {props.parent.length != 0 ? 
          props.drag.map(item => {
            const id = `${item.props.id}droppable${props.id}`;
            if(props.parent.includes(id)) {
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