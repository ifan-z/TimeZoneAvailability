let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let times = [];

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

function addTime(){
  let frm = document.getElementById("form"); //Retrieving the form
  let weekDay = frm.elements["dayOfWeek"].value; //Getting the day of the week
  let startTime = frm.elements["startTime"].value; //Getting the start time
  let endTime = frm.elements["endTime"].value; //Getting the end time
  let weekDayNum; //A number for the weekday
  for(let i in weekDays){
    if(weekDay == weekDays[i]){
      weekDayNum = Number(i+1); //Getting the number corresponding to the weekday
    }
  }
  let startHour = 0;
  if(startTime.substring(6, 8) == "PM"){
    startHour = Number(startTime.substring(0, 2)) + 11;
    console.log(startHour);
  }else{
    startHour = Number(startTime.substring(0, 2)) - 1;
    console.log(startHour);
  }
  let startMinutes = startTime.substring(3, 5);

  let endHour = 0;
  if(endTime.substring(6, 8) == "PM"){
    endHour = Number(endTime.substring(0, 2)) + 11;
    console.log(endHour);
  }else{
    endHour = Number(endTime.substring(0, 2)) - 1;
    console.log(endHour);
  }
  let endMinutes = endTime.substring(3, 5);

  let start = new Date();
  console.log(start);
  start.setFullYear(2017);
  start.setMonth(0);
  start.setDate(weekDayNum);
  start.setHours(startHour);
  start.setMinutes(startMinutes);
  console.log(start);

  let end = new Date();
  console.log(end);
  end.setFullYear(2017);
  end.setMonth(0);
  end.setDate(weekDayNum);
  end.setHours(endHour);
  end.setMinutes(endMinutes);
  console.log(end);
}
