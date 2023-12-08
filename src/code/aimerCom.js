import { doc, updateDoc } from "firebase/firestore";
import { bd, collComs, collImages } from "./init";
import { ajd } from "../Appli";
import { formaterDateNumerique } from "./util";

export async function actionPouce(infoCom, val, idUtil, jour) {
    const ref = doc(bd, collImages, formaterDateNumerique(jour), collComs, infoCom.idCom);
    if(infoCom.votes[idUtil] === val) {
        let test = infoCom.votes;
        delete test[idUtil];
        return await updateDoc(ref,{votes: test});
    }
    const info = {
        votes: Object.assign(infoCom.votes, {[idUtil]: val})
    }
    await updateDoc(ref, info);
}