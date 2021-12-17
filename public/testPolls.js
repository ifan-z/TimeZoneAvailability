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

document.getElementById("showPollForm").onclick = function() { //Show the form
  document.getElementById("pollForm").style.visibility = "visible";
}

document.getElementById("cancelPoll").onclick = function() { //Cancel the form
  document.getElementById("pollForm").style.visibility = "hidden";
}

document.getElementById("submitPoll").onclick = function() { //Submit the form
  createPoll();
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

async function createPoll(){
  let frm = document.getElementById("form"); //Retrieving the form
  let pollName = frm.elements["pollName"].value; //Getting the name of the poll
  let pollPassword = frm.elements["pollPassword"].value; //Getting the password for the poll
  let userName = frm.elements["userName"].value; //Getting the user's name

  // Add a new document in the main collection for the user, the document ID is auto-generated
  await addDoc(collection(db, "Polls"), {
    creator: userName,
    name: pollName,
    password: pollPassword,
    creator_name_password: userName + "_" + pollName + "_" + pollPassword,
    users: [userName]
  });

  document.getElementById("pollForm").style.visibility = "hidden";
  location.reload();
}

//--------------------------------------------------------------------------

function displayPolls(){
  for(let i in polls){
    let tbl = document.getElementById("pollsTable");
    let rowNumber = tbl.rows.length; //Retrieving how many rows there are
    let row = tbl.insertRow(rowNumber); //Because it starts counting at 0, the number of rows is the row number we want to add
    let uCell = row.insertCell(0); //User column
    let nCell = row.insertCell(1); //Poll name column
    let pCell = row.insertCell(2); //Poll password column
    let idCell = row.insertCell(3); //Poll document ID column
    //Accessing info
    uCell.innerHTML = polls[i].creator;
    nCell.innerHTML = polls[i].name;
    pCell.innerHTML = polls[i].password;
    idCell.innerHTML = polls[i].id;
  }
  console.log(polls);
}

displayPolls();
