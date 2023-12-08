import { formaterDateNumerique } from "./util";

export function prochainJour(jour,setAjd, ajd) {
    let dateNouv = new Date(ajd.setTime(ajd.getTime() + (jour)));

    if(parseInt(formaterDateNumerique(new Date())) < parseInt(formaterDateNumerique(dateNouv))) return retournerJourMM(formaterDateNumerique(new Date()), setAjd);
    setAjd(dateNouv);
}

export function precedentJour(jour, dateMM, setAjd, ajd) {
    let dateNouv = new Date(ajd.setTime(ajd.getTime() + (jour)));

    if(parseInt(formaterDateNumerique(dateNouv)) < dateMM[0]) return retournerJourMM(dateMM[0], setAjd);
    setAjd(dateNouv);
}

export function retournerJourMM(date, setAjd) {
    console.log(annee(date),mois(date),jour(date));
    setAjd(new Date(annee(date),mois(date),jour(date)));
}

function annee(date) {
    return Number(String(date).substring(0, 4));
}
function mois(date) {
    return Number(String(date).substring(4, 6)) -1;
}
function jour(date) {
    return Number(String(date).substring(6, 8));
}