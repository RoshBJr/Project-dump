import { collection, doc, setDoc, deleteDoc, getDoc, onSnapshot} from "firebase/firestore";
import { bd, collImages, collComs } from "./init";
import { formaterDateNumerique } from "./util";

// lire info une image
export async function lireUne(jour, setIdj) {

    onSnapshot(doc(bd,collImages,jour), doc => {
        setIdj(doc.data());
    })

    const idj = await getDoc(doc(bd, collImages, jour));
    return idj.data();
}

export function observerComs(jour, setComs) {
    onSnapshot(collection(bd, collImages, jour, collComs), docs => {
        const lesdocs = [];
        docs.forEach(doc => {
            console.log(doc.id);
            lesdocs.push(doc.data())
        })
        setComs(lesdocs);
    });
}

export async function ajoutCom(jour, utilInfo, comUtil) {
    
    const refCom = doc(collection(bd, collImages, jour, collComs));
    await setDoc(refCom,
                [{
                    idUtil: utilInfo.uid,
                    nomUtil: utilInfo.displayName,
                    texte: comUtil,
                    timestamp: new Date().getTime(),
                    votes: {}
                }][0]);
}

export function ajoutComUtil(setComUtil, evt) {
    evt.preventDefault();
    if(evt.target.value == '') return;
    setComUtil(evt.target.value);
    evt.target.value = '';
}

// supprimer un commentaire
export async function supprimer(idCom, jour) {
    await deleteDoc(doc(bd, collImages, formaterDateNumerique(jour), collComs, idCom));
}