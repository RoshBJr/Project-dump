import './Appli.scss';
import {lireUne } from './code/images-modele';
import Aime from './composants/Aime';
import Connexion from './composants/Connexion';
import ImgInfo from './composants/ImgInfo';
import ListCommentaires from './composants/ListCommentaires';
import { auth, bd, collUtilisateurs } from './code/init';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { formaterDateNumerique } from './code/util';
import { lesImages } from './code/commentaire-modele';
import { BtnCom } from './media/icones';
import { scrollToCom } from './code/evt';

export const UtilCtx = createContext(null);
export const IdjCtx = createContext(null);
export const ajd = new Date();

export default function Appli() {

  // État de connexion d'un utilisateur
  const [util, setUtil] = useState(null);
  const [comUtil, setComUtil] = useState('');
  const [idjData, setIdjData] = useState([]);
  const [dateAjd, setAjd] = useState(ajd);
  const [dateMM, setDateMM] = useState([]);

  useEffect(
    () => {
      lireUne(formaterDateNumerique(dateAjd), setIdjData).
      then(data => setIdjData(data));
    },[dateAjd]
  );

  useEffect(() => {
    async function imgs() {
      await setDateMM(lesImages(setDateMM));
    }
    imgs();
  },[]);

  useEffect(
      () => onAuthStateChanged(auth, u => {
          if(u) {
              //créer le document correspondant à cet utilisateur dans Firestore
              setDoc(doc(bd, collUtilisateurs, u.uid), {
                  nom: u.displayName,
                  avatar: u.photoURL,
                  courriel: u.email
              }, {merge: true});
          }
          setUtil(u);
      }),
      []
  );

  return (
    <div className="Appli">
      <div className="msgToast">Cette action requiert d'être connecté(e).</div>
      <UtilCtx.Provider value={util}>
      <IdjCtx.Provider value={idjData}>
        <Aime dateAjd={dateAjd}/>
        <div onClick={scrollToCom} className="scrollCom"><BtnCom/></div>
        <ImgInfo dateMM={dateMM} setAjd={setAjd} ajd={dateAjd} />
        <aside>
          <Connexion setComUtil={setComUtil} />
          <ListCommentaires dateAjd={dateAjd} comUtil={comUtil} setComUtil={setComUtil} />
        </aside>
      </IdjCtx.Provider>
      </UtilCtx.Provider>
    </div>
  );
}
