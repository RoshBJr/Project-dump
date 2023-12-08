import { signInWithPopup } from 'firebase/auth';
import { googleAuth, auth} from './init';

export function connexion() {
    signInWithPopup(auth, googleAuth);
}

export function deConnexion() {
    auth.signOut();
}

