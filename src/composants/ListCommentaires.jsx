import { useContext, useEffect, useState } from 'react';
import Commentaire from './Commentaire';
import './ListCommentaires.scss';
import { ajoutCom } from '../code/images-modele';
import { UtilCtx} from '../Appli';
import { observer } from '../code/commentaire-modele';
import { formaterDateNumerique } from '../code/util';

export default function ListCommentaires({comUtil, dateAjd, setComUtil}) {
    
    const utilInfo = useContext(UtilCtx);
    const [coms, setComs] = useState([]);

    useEffect(() =>  observer(formaterDateNumerique(dateAjd), setComs),[dateAjd]);
    useEffect(() => {
        if(utilInfo === null || comUtil === '') return;
        ajoutCom(formaterDateNumerique(dateAjd), utilInfo, comUtil);
        setComUtil('');
    },[comUtil])

     return(
         <div className="containerComs">
            {
                coms.map(
                    com => <Commentaire key={com.timestamp} dateAjd={dateAjd} props={com}/>
                )
            }
         </div>
    );
}