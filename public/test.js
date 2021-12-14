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
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// setting up my web app framework - use your apiKey and info
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBzUFfFbuAwtWVthoS1IWgH9V-l7RA1eJ0',
  authDomain: 'timezoneavailability.firebaseapp.com',
  projectId: 'timezoneavailability'
});

//---------------------------------------------------------------------------

// setting up the fireStore database
const db = getFirestore();
let users = [];
let times = [];

let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let times = [];
let pollID = "HAPhRjVZ05KlE3BcdiLP";

class Time{
  constructor(start, end){
    this.start = start;
    this.end = end;
  }
}

document.getElementById("showDateForm").onclick = function() { //Show the form
  document.getElementById("dateForm").style.visibility = "visible";
}

document.getElementById("cancelTime").onclick = function() { //Cancel the form
  document.getElementById("dateForm").style.visibility = "hidden";
}

document.getElementById("submitTime").onclick = function() { //Submit the form
  addTime();
}

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
    startHour = Number(startTime.substring(0, 2)) + 11; //Add 11 to it so that it goes to the afternoon
    //Adding 11 because the hours start at 0 rather than 1
  }else{
    startHour = Number(startTime.substring(0, 2)) - 1; //Otherwise (morning) then minus 1, since hours start at 1 in Javascript
  }
  let startMinutes = startTime.substring(3, 5); //Getting the minutes information

  let endHour;
  if(endTime.substring(6, 8) == "PM"){ //Same as above but for the end time
    endHour = Number(endTime.substring(0, 2)) + 11;
  }else{
    endHour = Number(endTime.substring(0, 2)) - 1;
  }
  let endMinutes = endTime.substring(3, 5);

  let start = new Date(); //New date object
  start.setFullYear(2017); //Setting the year to 2017, because that is the year when January 1st is on a Sunday
  start.setMonth(0); //Setting the month to January
  start.setDate(weekDayNum); //Setting the day of the month, 1-7, since 1 = Sunday
  start.setHours(startHour); //Setting the hour
  start.setMinutes(startMinutes, 0); //Setting the minutes
  console.log(start);

  let end = new Date(); //Same as above but for end time
  end.setFullYear(2017);
  end.setMonth(0);
  end.setDate(weekDayNum);
  end.setHours(endHour);
  end.setMinutes(endMinutes, 0);
  console.log(end);

  db.collection("Polls").doc(pollID).collection(name).add({
    start: start,
    end: end
  });

  // Add a new document in a collection for the user under the poll ID
  await addDoc(collection(db, "Polls", "HAPhRjVZ05KlE3BcdiLP", name), {
    start: start,
    end: end
  });
  document.getElementById("dateForm").style.visibility = "hidden";
  location.reload();
}
