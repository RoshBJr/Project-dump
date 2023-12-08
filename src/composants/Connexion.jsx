import { BtnLogOut, GLogo } from '../media/icones';
import './Connexion.scss';
import { deConnexion, connexion } from '../code/connexion';
import { useContext, useState} from 'react';
import { UtilCtx } from '../Appli';
import { ajoutComUtil } from '../code/images-modele';

export default function Connexion({setComUtil}) {
    const util = useContext(UtilCtx);
    const [text, setText] = useState('');

     return(
        util ?
        <div className="containerCnt">
            <div className="infoUtil">
                <img src={util.photoURL} className="avatar"/>
                <span className="nom">{util.displayName}</span>
                <span onClick={deConnexion} className="deCnx"><BtnLogOut/></span>
            </div>
            <textarea className='comUtil'
                onKeyDown={evt => evt.key === 'Enter' ? ajoutComUtil(setComUtil,evt) : null}
                name="commentaire"
                placeholder='Entrez votre commentaire ici.' ></textarea>
        </div>
        :

        <div className="containerCnx" onClick={connexion}>
           <div className="logo"><GLogo/></div>
           <span className="text">Connexion avec Google</span>
        </div>
        
    );
}