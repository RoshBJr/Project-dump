import {useContext} from 'react';
import dateAjd from '../code/dateAjd';
import './ImgInfo.scss';
import { IdjCtx} from '../Appli';
import { precedentJour, prochainJour, retournerJourMM } from '../code/basculerJour';

export default function ImgInfo({dateMM, setAjd, ajd}) {
    const idjInfo = useContext(IdjCtx);

    return(
        <div className="imgInfo">
            <img className='imgFond' src={idjInfo.url}/>
            <div className="containerInfo">
                <div className="containerBtn">
                    <span onClick={() => retournerJourMM(dateMM, setAjd)} className='btn '>|--</span>
                    <span onClick={() => precedentJour(-24*60*60*1000, dateMM, setAjd, ajd)} className='btn '>|-</span>
                    <span onClick={() => prochainJour(24*60*60*1000,setAjd, ajd)} className='btn '>-|</span>
                    <span onClick={() => setAjd(new Date())} className='btn '>--|</span>
                    <p className='date'>{dateAjd(ajd)}</p>
                </div>
                <p className="imgDesc">{idjInfo.description ? idjInfo.description: "Aucune description"}</p>
            </div>
        </div>
    );
}