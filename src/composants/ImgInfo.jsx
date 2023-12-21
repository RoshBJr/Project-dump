import {useContext} from 'react';
import dateAjd from '../code/dateAjd';
import './ImgInfo.scss';
import { IdjCtx} from '../Appli';
import { precedentJour, prochainJour, retournerJourMM } from '../code/basculerJour';
import SingleArrow from '../media/single-arrow.svg';
import DoubleArrow from '../media/double-arrow.svg';

export default function ImgInfo({dateMM, setAjd, ajd}) {
    const idjInfo = useContext(IdjCtx);

    return(
        <div className="imgInfo">
            <img className='imgFond' src={idjInfo.url}/>
            <div className="containerInfo">
                <div className="containerBtn">
                    <span onClick={() => retournerJourMM(dateMM, setAjd)} className='btn left'>
                        <img src={DoubleArrow} alt="Double arrow left" />
                    </span>
                    <span onClick={() => precedentJour(-24*60*60*1000, dateMM, setAjd, ajd)} className='btn left'>
                        <img src={SingleArrow} alt="single arrow left" />
                    </span>
                    <span onClick={() => prochainJour(24*60*60*1000,setAjd, ajd)} className='btn '>
                        <img src={SingleArrow} alt="single arrow right" />
                    </span>
                    <span onClick={() => setAjd(new Date())} className='btn '>
                        <img src={DoubleArrow} alt="Double arrow right" />
                    </span>
                </div>
                <p className="imgDesc">{idjInfo.description ? idjInfo.description: "Aucune description"}</p>
                <p className='date'>{dateAjd(ajd)}</p>
            </div>
        </div>
    );
}