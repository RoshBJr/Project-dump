import { arrayRemove, arrayUnion, doc, updateDoc, } from "firebase/firestore";
import { bd, collImages } from "./init";
import { ajd } from "../Appli";
import { formaterDateNumerique } from "./util";

export default async function aimer(etatCoeur, setEtatCoeur, util, jour) {
    if(util === null) {
        const elToast = document.querySelector('.msgToast');
        elToast.classList.add('afficher');
        setTimeout(() => {
            elToast.classList.remove('afficher')
        }, 3000 );
        return;
    }
    setEtatCoeur(!etatCoeur);
    const ref = doc(bd, collImages, formaterDateNumerique(jour));
    await updateDoc(ref, { 
        aime: etatCoeur ? arrayRemove(util.uid) : arrayUnion(util.uid)
    });
}

// export async function observerEtatCoeur(idjInfo, util, setEtatCoeur) {
//     if(!util) return setEtatCoeur(false);
//     if(!idjInfo.aime.includes(util.uid)) return setEtatCoeur(false);
//     setEtatCoeur(true);
// }