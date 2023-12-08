/*
  Ce script permet de générer des données de test dans Firestore.
  Important : avant de l'utiliser, assurez-vous que vous avez les 
              permissions adéquates dans Firestore : 
                match /idj-images/{document=**} {
                  allow read, write : if true
                }

*/

import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { bd, stockage, collImages, collComs } from "./init";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { formaterDateNumerique } from "./util";
import { loremIpsum } from "lorem-ipsum";

// Nom du dossier dans Firebase Storage
const nomDossierStorage = '';

// Date de début et de fin pour les images à générer (premier jour et dernier jour)
const debut = new Date(2023, 4, 1); // 1 mai 2023
const fin = new Date(2023, 5, 16); // 15 juin 2023

// Utilisateurs
const nbUtilisateurs = 200;
let utilisateurs = [];

// Quantité de données à générer pour chaque image
const nbMinAime = 1, 
      nbMaxAime = 40, 
      nbMinVotes = 0, 
      nbMaxVotes = 25,
      nbMinCommentaires = 2, 
      nbMaxCommentaires = 15;

// Descriptions des images (par nom de fichier)
let descriptions = {
  "baron-palace-egypt.jpg": "Escalier intérieur de la tour du Palais du Baron Empain.",
  "bridge-near-tatopani.jpg": "Nilgiri Sud (6 839 m) forme une toile de fond impressionnante pour un grand pont suspendu sur la rivière Kali Gandaki près de Tatopani.",
  "cachtice-castle.jpg": "Château de Čachtice (Slovaquie)",
  "darawar-fort.jpg": "Derawar Fort est une grande forteresse carrée à Bahawalpur, Punjab, Pakistan. Les quarante bastions de Derawar sont visibles sur plusieurs kilomètres dans le désert du Cholistan. Les murs ont un périmètre de 1500 mètres et une hauteur de trente mètres.",
  "fortezza-che-domina-la-valle.jpg": "Intérieur du château de Verrucole , le long du chemin de l'archéoparc.",
  "hackerbrucke-munich.jpg": "Hackerbrücke, Munich, Allemagne.",
  "hydrochoerus-hydrochaeris.jpg": "Capybaras ( Hydrochoerus hydrochaeris ) dans la zone protégée de la rivière Tietê dans l'État de São Paulo, Brésil.",
  "landgericht-berlin.jpg": "Hall d'entrée du tribunal régional de Berlin situé dans la Littenstrasse 12-17 à Berlin-Mitte.",
  "notre-dame.jpg": "Intérieur de la basilique Notre-Dame , situé dans le quartier historique du Vieux-Montréal , à Montréal , Québec , Canada.",
  "palacio-do-planalto.jpg": "",
  "route-pluie.jpg": "",
  "saacra-ammantata-dalla-neve.jpg": "Abbaye Saint-Michel-de-la-Cluse sur le mont Pirchiriano, Piémont, Italie.",
  "spasso-nel-tempo.jpg": "Vieille ville de Comacchio et ses ponts",
  "sunbeach-hotel.jpg": "Le pavillon royal Kuha Karuhas dans la grotte de Phraya Nakhon au parc national Khao Sam Roi Yot, dans la province de Prachuap Khiri Khan, en Thaïlande.",
  "svjatogorsk.jpg": "La laure de la Dormition de la Mère de Dieu de Sviatohirsk (en ukrainien : Свято-Успенська Святогірська Лавра, en russe : Свято-Успенская Святогорская лавра) est un important monastère orthodoxe situé au bord du fleuve Donets près de la petite ville de Sviatohirsk en Ukraine orientale.",
  "tabatabaei-kashan.jpg": "La Maison des Tabatabaei ou Khāneh-yé Tabātabāeihā est une maison historique célèbre de Kachan en Iran.",
  "the-great-umayyad-mosque-aleppo.jpg": "La Grande Mosquée ou Mosquée omeyyade d'Alep.",
  "tomb-of-bibi-jiwindi.jpg": "Tombe de Bibi Jawindi à Uch Sharif, Punjab, Pakistan.",
  "tower-bridge.jpg": "Tower Bridge : lumière avant l'aube sur le monument le plus emblématique de Londres.",
  "west-pier-brighton.jpg": "West Pier, Brighton : jetée aménagée et située devant la plage de Brighton en Angleterre.",
  "wiesener-viadukt.jpg": "Une rame réversible RhB Ge 4/4 II entraîne un train sur le viaduc de Wiesen entre Wiesen et Filisur en Suisse."
}

/**
 * Obtient les URLs et noms de fichiers des images stockées dans Storage.
 * @returns {array} Tableau contenant des objets contenant les 'nom/url'
 *                  de chaque image.
 */
async function obtenirInfoImages() {
  const refImages = ref(stockage, nomDossierStorage);
  const listeImages = await listAll(refImages);
  const tabObjetsImagesDansStorage = listeImages.items;
  const tabInfoImages = [];
  for(let i=0; i< tabObjetsImagesDansStorage.length; i++) {
      tabInfoImages[i] = {nom: tabObjetsImagesDansStorage[i].name , url: await getDownloadURL(tabObjetsImagesDansStorage[i])};
  }
  return tabInfoImages;
}

/**
 * Génère un tableau contenant des identifiants d'utilisateurs fictifs.
 */
function genererUtilisateurs() {
  for(let i=0; i<nbUtilisateurs; i++) {
      utilisateurs.push({idUtil: crypto.randomUUID(), nomUtil: (Math.random().toString(36).substring(2, 10) + '0'.repeat(8)).substring(0, 8)});
  }
}

/**
 * Génère un tableau contenant des identifiants d'utilisateurs pris
 * aléatoirement dans le tableau des utilisateurs. La taille du tableau
 * est aussi déterminé aléatoirement selon les paramètres 'min/max' 
 * configurés ci-dessus.
 * @returns {array} Tableau d'identifiants-utilisateurs.
 */
function genererAimesAleatoires() {
  let tabAime = [];
  let nbAime = Math.floor(Math.random()*nbMaxAime) + nbMinAime;
  let utilisateurAime;
  while(tabAime.length < nbAime) {
    utilisateurAime = utilisateurs[Math.floor(Math.random()*utilisateurs.length)].idUtil;
      if(!tabAime.includes(utilisateurAime)) {
          tabAime.push(utilisateurAime);
      }
  }
  return tabAime;
}

/**
 * Génère un tableau associatif contenant en étiquette des identifiants  
 * d'utilisateurs aléatoires et en valeur -1 ou 1. La taille du tableau
 * est aussi déterminé aléatoirement selon les paramètres 'min/max' 
 * configurés ci-dessus.
 * @returns {object}
 */
function genererVotesAleatoires() {
  let mapVotes = {};
  let nbVotes = Math.floor(Math.random()*nbMaxVotes) + nbMinVotes;
  let utilisateurVote;
  while(Object.values(mapVotes).length<=nbVotes) {
      utilisateurVote = utilisateurs[Math.floor(Math.random()*utilisateurs.length)].idUtil;
      mapVotes[utilisateurVote] = Math.random()<0.5 ? 1 : -1;
  }
  return mapVotes;
}

/**
 * Génère un nombre aléatoire de commentaires ayant chacun un texte 
 * aléatoire, un utilisateur aléatoire, une date aléatoire, et un nombre
 * et des valeurs de votes aléatoires.
 * @param {string} idImage Identifiant de l'image pour laquelle on génère
 * @param {Date} jour Objet Date JS représentant le jour de cette image
 * les commentaires.
 */
async function genererCommentairesAleatoires(idImage, jour) {
  let mapVotes = {};
  let nbComs = Math.floor(Math.random()*nbMaxCommentaires) + nbMinCommentaires;
  let utilisateurCom, docCom;
  for(let i=0; i<nbComs; i++) {
      utilisateurCom = utilisateurs[Math.floor(Math.random()*utilisateurs.length)];
      mapVotes = genererVotesAleatoires();

      docCom = await addDoc(collection(bd, collImages, idImage, collComs), {
          texte: loremIpsum(),
          votes: mapVotes,
          idUtil: utilisateurCom.idUtil,
          nomUtil: utilisateurCom.nomUtil,
          timestamp: new Date().getTime() -1
      });
  }
}

export async function generer() {
  // Obtenir l'information sur les images stockées dans Storage
  const tabInfoImages = await obtenirInfoImages();
  
  // Générer des utilisateurs fictifs
  genererUtilisateurs();

  let docImage, idImage;
  let indexImage = 0;
  let tabAime = [];
  let jour = debut;
  while(jour < fin) {
    // Générer un tableau de plébiscites aléatoires
    tabAime = genererAimesAleatoires();
    // Id de l'image obtenu à partir de la date du jour dans la forme AAAAMMJJ
    idImage = formaterDateNumerique(jour);

    // Ajoute le document correspondant à ce jour dans Firestore
    docImage = await setDoc(doc(bd, collImages, idImage), {
        aime: tabAime,
        description: descriptions[tabInfoImages[indexImage].nom],
        url: tabInfoImages[indexImage].url
    });
    
    // Générer des commentaires aléatoires pour cette image
    genererCommentairesAleatoires(idImage, jour);

    // Incrémenter le jour
    jour.setDate(jour.getDate() + 1);
    // Incrémenter la position de l'image (retourner à 0 s'il n'y en a plus)
    indexImage = (indexImage<tabInfoImages.length-1) ? indexImage+1 : 0;
  }
}