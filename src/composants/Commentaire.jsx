import { BtnSupp, PouceBasPlein } from '../media/icones';
import './Commentaire.scss';
import ReactionCom from './ReactionCom';
import { useContext } from 'react';
import { UtilCtx } from '../Appli';
import { supprimerCom } from '../code/commentaire-modele';

export default function Commentaire({props, dateAjd}) {
    
    const util = useContext(UtilCtx);
    
    return(
        <div className="commentaire">
            {
                util && util.uid === props.idUtil ?
                <div onClick={() => supprimerCom(props.id, dateAjd)}
                className="btnSupp"><BtnSupp/></div>
                :
                <></>
            }
            <span className="nom">{props.nomUtil}</span>
            <p className="com">{props.texte}</p>
            <ReactionCom
                dateAjd={dateAjd}
                votes={props.votes}
                nom={props.nomUtil}
                texte={props.texte}
                timestamp={props.timestamp}
                idUtil={props.idUtil}
                idCom={props.id}
            />
        </div>
    );
}