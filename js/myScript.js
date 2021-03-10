const FLOORS = 7;

// DOM elements
let buildingDOM = document.querySelector(".building");
let floorDOM = document.querySelector(".floor");
let left_Elevator = document.querySelector(".elevator-left");
let right_Elevator = document.querySelector(".elevator-right");

let intervalId = null;
//////////////////////////////
let floor_0_btn = document.querySelector(".btn-0");
floor_0_btn.addEventListener("click", (e) => {
  inviteElevator(e, 0);
});
let floor_1_btn = document.querySelector(".btn-1");
floor_1_btn.addEventListener("click", (e) => {
  inviteElevator(e, 1);
});
let floor_2_btn = document.querySelector(".btn-2");
floor_2_btn.addEventListener("click", (e) => {
  inviteElevator(e, 2);
});
let floor_3_btn = document.querySelector(".btn-3");
floor_3_btn.addEventListener("click", (e) => {
  inviteElevator(e, 3);
});
let floor_4_btn = document.querySelector(".btn-4");
floor_4_btn.addEventListener("click", (e) => {
  inviteElevator(e, 4);
});
let floor_5_btn = document.querySelector(".btn-5");
floor_5_btn.addEventListener("click", (e) => {
  inviteElevator(e, 5);
});
let floor_6_btn = document.querySelector(".btn-6");
floor_6_btn.addEventListener("click", (e) => {
  inviteElevator(e, 6);
});

/////////////////////////////
const RightElevatorObj = {
  isFree: true,
  floor: 0,
  array: [],
};
const LeftElevatorObj = {
  isFree: true,
  floor: 0,
  array: [],
};

//functions

function inviteElevator(e, floorNum) {
  e.target.style.backgroundColor = "red";
  //TODO: check whos closest elevator and add to its array

  let [closestDOM, closestObj] = findClosest(floorNum);
  //closestObj.array.push(num);
  console.log(closestObj.array);

  //animation
  myMove(e, floorNum);

  closestObj.array = closestObj.array.filter((num) => num != floorNum);
}

function findClosest(floorNum) {
  //checking which elevator is closest
  if (
    Math.abs(RightElevatorObj.floor - floorNum) <
    Math.abs(LeftElevatorObj.floor - floorNum)
  ) {
    RightElevatorObj.floor = floorNum;
    RightElevatorObj.array.push(floorNum);
    RightElevatorObj.isFree = false;
    return [right_Elevator, RightElevatorObj];
  } else if (
    Math.abs(RightElevatorObj.floor - floorNum) >
    Math.abs(LeftElevatorObj.floor - floorNum)
  ) {
    LeftElevatorObj.floor = floorNum;
    LeftElevatorObj.array.push(floorNum);
    LeftElevatorObj.isFree = false;
    return [left_Elevator, LeftElevatorObj];
  } else {
    //default (if 2 elevators on the same distance call the right one)
    RightElevatorObj.floor = floorNum;
    RightElevatorObj.array.push(floorNum);
    RightElevatorObj.isFree = false;
    return [right_Elevator, RightElevatorObj];
  }
}

function myMove(e, floorNum) {
  let [closestDOM, closestObj] = findClosest(floorNum);
  let pos = closestDOM.style.bottom.split("px")[0];
  console.log("pos", pos);
  clearInterval(intervalId);
  intervalId = setInterval(frame, 5);
  function frame() {
    if (pos == floorNum * 200) {
      e.target.style.backgroundColor = "green";
      clearInterval(intervalId);
    } else {
      if (pos > floorNum * 200) {
        console.log("bigger");
        pos--;
        closestDOM.style.bottom = pos + "px";
      } else if (pos < floorNum * 200) {
        console.log("smaller");

        pos++;
        closestDOM.style.bottom = pos + "px";
      } else {
        console.log("wtf");
        pos = closest.style.bottom;
      }
    }
  }
}
