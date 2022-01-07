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
let times = [];

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class Time{
  constructor(name, start, end){
    this.name = name;
    this.start = start;
    this.end = end;
  }
}

let pollID = sessionStorage.getItem("pollID");
console.log(pollID);

//--------------------------------------------------------------------------

// getting the name of all the users in the poll
const pollDoc = await getDoc(doc(db, "Polls", pollID)); //Getting the poll document
let users = pollDoc.data().users; //Getting the users array of the document
console.log(users);
let pollCreator = pollDoc.data().creator; //Getting the name of the poll creator
let pollName = pollDoc.data().name;

// getting the times from the user subcollections
for(let i in users){
  const querySnapshotRecord = await getDocs(collection(db, "Polls", pollID, users[i]));
  querySnapshotRecord.forEach((doc) => {
    let startDate = doc.data().start.toDate(); //Converts Firebase timestamp to Javascript Date
    let endDate = doc.data().end.toDate();
    let getDay = startDate.getDay(); //Getting the day of the week, 0-6
    for(let i in weekDays){ //Comparing the number from the day of the week to the array of their corresponding names
      if(getDay == i){ //If it matches
        getDay = weekDays[i]; //Then set the variable to be that name
      }
    }
    let startHour; //Starting hour
    let startHalf; //Starting AM/PM
    let endHour; //Ending hour
    let endHalf; //Ending AM/PM
    if(startDate.getHours() > 12){
      startHour = startDate.getHours() - 12;
      startHalf = "PM";
    }else{
      startHalf = "AM";
    }
    if(endDate.getHours() > 12){
      endHour = endDate.getHours() - 12;
      endHalf = "PM";
    }else{
      endHalf = "AM";
    }
    let start = getDay + ", " + startHour + ":" + startDate.getMinutes() + " " + startHalf;
    let end = getDay + ", " + endHour + ":" + endDate.getMinutes() + " " + endHalf;
    times.push(new Time(users[i], start, end));
    console.log(times[i].start);
    console.log(times[i].end);
  });
}

//--------------------------------------------------------------------------

document.getElementById("showDateForm").onclick = function() { //Show the form
  document.getElementById("dateForm").style.visibility = "visible";
}

document.getElementById("cancelTime").onclick = function() { //Cancel the form
  document.getElementById("dateForm").style.visibility = "hidden";
}

document.getElementById("submitTime").onclick = function() { //Submit the form
  addTime();
}

document.getElementById("title").innerHTML = pollName;
document.getElementById("pollCreator").innerHTML = "Creator: " + pollCreator;

//--------------------------------------------------------------------------

async function addTime(){
  let frm = document.getElementById("form"); //Retrieving the form
  let weekDay = frm.elements["dayOfWeek"].value; //Getting the day of the week
  let startTime = frm.elements["startTime"].value; //Getting the start time
  let endTime = frm.elements["endTime"].value; //Getting the end time
  let name = frm.elements["name"].value; //Getting the user's name
  let weekDayNum; //A number for the weekday
  for(let i in weekDays){
    if(weekDay == weekDays[i]){
      weekDayNum = Number(i+1); //Getting the number corresponding to the weekday, Sunday = 1
    }
  }
  let startHour;
  if(startTime.substring(6, 8) == "PM"){ //If the time is in the afternoon
    startHour = Number(startTime.substring(0, 2)) + 12; //Add 12 to it so that it goes to the afternoon
  }else{
    startHour = Number(startTime.substring(0, 2)); //Otherwise (morning) just take the value
  }
  let startMinutes = startTime.substring(3, 5); //Getting the minutes information

  let endHour;
  if(endTime.substring(6, 8) == "PM"){ //Same as above but for the end time
    endHour = Number(endTime.substring(0, 2)) + 12;
  }else{
    endHour = Number(endTime.substring(0, 2));
  }
  let endMinutes = endTime.substring(3, 5);

  let start = new Date(); //New date object
  start.setFullYear(2017); //Setting the year to 2017, because that is the year when January 1st is on a Sunday
  start.setMonth(0); //Setting the month to January
  start.setDate(weekDayNum); //Setting the day of the month, 1-7, since 1 = Sunday
  start.setHours(startHour); //Setting the hour
  start.setMinutes(startMinutes); //Setting the minutes
  start.setMilliseconds(0); //Setting the milliseconds
  console.log(start);

  let end = new Date(); //Same as above but for end time
  end.setFullYear(2017);
  end.setMonth(0);
  end.setDate(weekDayNum);
  end.setHours(endHour);
  end.setMinutes(endMinutes);
  end.setMilliseconds(0);
  console.log(end);

  // Add a new document in a subcollection for the user under the poll ID and the user's name, the document ID is auto-generated
  await addDoc(collection(db, "Polls", pollID, name), {
    start: start,
    end: end
  });
  const pollRef = doc(db, "Polls", pollID);

  // Atomically add a new region to the "users" array field.
  await updateDoc(pollRef, {
    users: arrayUnion(name)
  });

  document.getElementById("dateForm").style.visibility = "hidden";
  location.reload();
}

//--------------------------------------------------------------------------

function displayTimes(){ //Displays the table of times
  for(let i in times){
    let tbl = document.getElementById("timesTable");
    let rowNumber = tbl.rows.length; //Retrieving how many rows there are
    let row = tbl.insertRow(rowNumber); //Because it starts counting at 0, the number of rows is the row number we want to add
    let uCell = row.insertCell(0); //User column
    let sCell = row.insertCell(1); //Start time column
    let eCell = row.insertCell(2); //End time column
    //Accessing info
    uCell.innerHTML = times[i].name;
    sCell.innerHTML = times[i].start;
    eCell.innerHTML = times[i].end;
  }
  console.log(times);
}

displayTimes();
