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

function inviteElevator(e, num) {
  e.target.style.backgroundColor = "red";
  //TODO: check whos closest elevator and add to its array
  let [closestDOM, closestObj] = findClosest(num);

  //animation
  myMove(e, num);
}

function findClosest(num) {
  //checking which elevator is closest
  if (
    Math.abs(RightElevatorObj.floor - num) <
    Math.abs(LeftElevatorObj.floor - num)
  ) {
    RightElevatorObj.floor = num;
    RightElevatorObj.array.push(num);
    RightElevatorObj.isFree = false;
    return [right_Elevator, RightElevatorObj];
  } else if (
    Math.abs(RightElevatorObj.floor - num) >
    Math.abs(LeftElevatorObj.floor - num)
  ) {
    LeftElevatorObj.floor = num;
    LeftElevatorObj.array.push(num);
    LeftElevatorObj.isFree = false;
    return [left_Elevator, LeftElevatorObj];
  } else {
    //default (if 2 elevators on the same distance call the right one)
    RightElevatorObj.floor = num;
    RightElevatorObj.array.push(num);
    RightElevatorObj.isFree = false;
    return [right_Elevator, RightElevatorObj];
  }
}

function myMove(e, num) {
  let [closestDOM, closestObj] = findClosest(num);
  let pos = closestDOM.style.bottom.split("px")[0];
  console.log("pos", pos);
  clearInterval(intervalId);
  intervalId = setInterval(frame, 5);
  function frame() {
    if (pos == num * 200) {
      e.target.style.backgroundColor = "green";
      clearInterval(intervalId);
    } else {
      if (pos > num * 200) {
        console.log("bigger");
        pos--;
        closestDOM.style.bottom = pos + "px";
      } else if (pos < num * 200) {
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
