import {useContext, useEffect, useState} from 'react';
import { Coeur } from '../media/icones';
import { IdjCtx } from '../Appli';
import './Aime.scss';
import aimer from '../code/aimer';
import { UtilCtx } from '../Appli';

export default function Aime({dateAjd}) {

    const util = useContext(UtilCtx);
    const idjInfo = useContext(IdjCtx);
    const [etatCoeur, setEtatCoeur] = useState(false);

    useEffect(
        () => {
            // console.log(idjInfo);
            if(!util) return setEtatCoeur(false);
            if(!idjInfo.aime) return;
            if(!idjInfo.aime.includes(util.uid)) return setEtatCoeur(false);
            setEtatCoeur(true);
        },[util, idjInfo]
    );

    return(
         <div className="containerAime">
            <div onClick={() => aimer(etatCoeur,setEtatCoeur, util, dateAjd)} className="aime"><Coeur etatCoeur={etatCoeur}/></div>
            <span className="compteur">{idjInfo.aime ? idjInfo.aime.length: 0}</span>
         </div>
    );
}