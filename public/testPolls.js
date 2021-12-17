// Setting up the required components from the web links
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// setting up my web app framework - use your apiKey and info
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBzUFfFbuAwtWVthoS1IWgH9V-l7RA1eJ0',
  authDomain: 'timezoneavailability.firebaseapp.com',
  projectId: 'timezoneavailability'
});

//---------------------------------------------------------------------------

// setting up the Firestore database
const db = getFirestore();
let polls = [];

class Poll{
  constructor(name, creator, password){
    this.name = name;
    this.creator = creator;
    this.password = password;
  }
}

//--------------------------------------------------------------------------
