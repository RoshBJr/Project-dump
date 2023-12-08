/**
 * Formate un objet Date JS en une cahine ayant le format:
 * suivant: AAAAMMJJ
 * @param {date} objDate : date JavaScript
 * @returns {string} chaine de caracteres representant cette date
 */

export function formaterDateNumerique(objDate) {
    return objDate.getFullYear()
            + (objDate.getMonth() +1).toString().padStart(2, '0')
            + (objDate.getDate()).toString().padStart(2,'0');
}