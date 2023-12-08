

// evt pour que l'utilisateur puisse aller vers le commentaire en format mobile
export function scrollToCom() {
    const el = document.querySelector('aside');
    if(el) window.scrollTo({
      behavior: 'smooth',
      top:
      el.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      90,
    });
  }