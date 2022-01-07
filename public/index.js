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
  arrayRemove,
  query,
  where
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
  constructor(name, creator, password, id){
    this.name = name;
    this.creator = creator;
    this.password = password;
    this.id = id;
  }
}

//--------------------------------------------------------------------------

// getting the polls from the main collection
const querySnapshotRecord = await getDocs(collection(db, "Polls"));
querySnapshotRecord.forEach((doc) => {
  let pollCreator = doc.data().creator; //Getting the poll creator
  let pollName = doc.data().name; //Getting the poll name
  let pollPassword = doc.data().password; //Getting the password for the poll
  let pollID = doc.id; //Getting the Document ID of the poll

  polls.push(new Poll(pollName, pollCreator, pollPassword, pollID));
});

//--------------------------------------------------------------------------

document.getElementById("submitPoll").onclick = function() { //Submit the form
  redirectPage();
}

//--------------------------------------------------------------------------

async function redirectPage(){
  let frm = document.getElementById("form"); //Retrieving the form
  let pollID = frm.elements["pollID"].value; //Getting the ID of the poll
  let pollPassword = frm.elements["pollPassword"].value; //Getting the password for the poll
  let userName = frm.elements["userName"].value; //Getting the user's name



  sessionStorage.setItem("pollID", pollID); //Saving the pollID to the browser
  sessionStorage.setItem("name", userName); //Saving the user's name to the browser
  window.location.href = "https://timezoneavailability.web.app/testTimes.html"; //Redirecting to the "Times" page
}
