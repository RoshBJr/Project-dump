const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

export default function dateAjd(jour) {
   document.querySelector('head title').innerHTML = jour.toLocaleDateString("fr-FR", options);
   return jour.toLocaleDateString("fr-FR", options);
}

