import { useEffect, useContext, useState } from 'react';
import { PouceBasPlein, PouceBasVide, PouceHautPlein, PouceHautVide } from '../media/icones';
import './ReactionCom.scss';
import { count } from '../code/commentaire-modele';
import { actionPouce, pouceHaut } from '../code/aimerCom';
import { UtilCtx } from '../Appli';

export default function ReactionCom(props) {

   const util = useContext(UtilCtx);

   function afficherToast() {
      const elT = document.querySelector('.msgToast');
      elT.classList.add('afficher');
        setTimeout(() => {
            elT.classList.remove('afficher')
        }, 3000 );
   }


   return(
      <div className="ctnReaction">
      <div className="ctnPouceHaut">
         <div onClick={util ? () => actionPouce(props,1, util.uid, props.dateAjd): afficherToast} className="icone">
            {util && props.votes[util.uid] === 1 ? <PouceHautPlein/> : <PouceHautVide/> }
         </div>
         <span className="compteur">{count(1, props.votes)}</span>
      </div>
      <div className="ctnPouceHaut">
         <div onClick={util ? () => actionPouce(props,-1, util.uid, props.dateAjd): afficherToast} className="icone">
            {util && props.votes[util.uid] === -1 ? <PouceBasPlein/> : <PouceBasVide/> }
         </div>
         <span className="compteur">{count(-1, props.votes)}</span>
      </div>
      </div>
   );
}