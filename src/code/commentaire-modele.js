import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { bd, collImages, collComs } from "./init";
import { supprimer } from "./images-modele";

/**
 * Obtenir les commentaires d'une image du jour.
 * @param {string} jour Chaîne indiquant le jour dans le format AAAAMMJJ
 * @returns {Array} Tableau contenant les commentaires (info complète)
 * de l'image de ce jour
 */
// export async function obtenir(jour) {
//     const lesComs = await getDocs(
//         query(
//             collection(bd, collImages, jour, collComs),
//             orderBy('timestamp', 'desc')
//         )
//     );

//     return lesComs.docs.map( doc => ({id: doc.id, ...doc.data()}) );
// }

export function observer(jour, mutateurComs) {
    return onSnapshot(
        query(
            collection(bd, collImages, jour, collComs),
            orderBy('timestamp', 'desc')
        ),
        resultat => {
            const comsFS = resultat.docs.map(
                doc => ({id: doc.id, ...doc.data()})
            );
            mutateurComs(comsFS);
        }
    )
}

export async function lesImages(commut) {
    const bruv = await getDocs(collection(bd, collImages));
        commut([
            bruv.docs[0].id,
            bruv.docs[bruv.docs.length-2].id
        ]);
}


export function supprimerCom(idCom, jour) {
    supprimer(idCom, jour);
}

export function count(val, voteMap) {
    const initVal = 0;
    const sum = Object.keys(voteMap).reduce(
       (acc, key) => voteMap[key] === val ? acc+1: acc, initVal
    );
    return sum;
 }