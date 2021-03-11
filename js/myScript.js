const FLOORS = 7;
const NUM_OF_ELEVATORS = 2;
const elevators = [];
const elevatorsQueue = [];
// DOM elements
let buildingDOM = document.querySelector(".building");

const sound = new Audio();
sound.src = "../sounds/dingdong.mp3";

let intervalId = null;

//functions

//adding floors and buttons as elements to htmlDOM
const initBuilding = () => {
  for (let i = FLOORS; i >= 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add(`floor`);
    floor.classList.add(`floor-${i}`);
    const floorNum_btn_container = document.createElement("div");
    floorNum_btn_container.classList.add("btn-text-container");
    const btn = document.createElement("button");
    btn.innerText = "Call elevator";
    btn.classList.add(`btn`);
    btn.classList.add(`btn-${i}`);
    btn.addEventListener("click", (e) => {
      inviteElevator(e, i);
    });
    const floorNum = document.createElement("span");
    floorNum.classList.add("floor-number");
    floorNum.innerText = i;
    const waitingTime = document.createElement("div");
    waitingTime.classList.add("waiting-time");
    waitingTime.classList.add(`waiting-time-${i}`);

    //assigning elements to DOM
    floorNum_btn_container.appendChild(waitingTime);
    floorNum_btn_container.appendChild(btn);
    floorNum_btn_container.appendChild(floorNum);
    floor.appendChild(floorNum_btn_container);
    buildingDOM.appendChild(floor);

    if (i == 0) {
      let elevator_container = document.createElement("div");
      elevator_container.classList.add("elevator_container");
      let elevator_left = 0;
      for (let j = 0; j < NUM_OF_ELEVATORS; j++) {
        const elevator = document.createElement("div");
        elevator.classList.add("elevator");
        //   elevator.innerText = `elevator number ${j + 1}`;
        elevator.style.left = elevator_left + "px";
        elevator_left += 200;
        elevator_container.appendChild(elevator);

        elevators.push({
          isFree: true,
          floor: 0,
          elevatorNumber: j,
          DOM: elevator,
        });
      }
      floor.appendChild(elevator_container);
    }
  }

  initEventLoop();
};

// sample queue of calls every 0.5sec and send elevator if not empty
const initEventLoop = () => {
  setInterval(() => {
    if (elevatorsQueue.length != 0) {
      findElevator(elevatorsQueue[0]);
    }
  }, 500);
};

function inviteElevator(e, floorNum) {
  e.target.style.backgroundColor = "red";
  elevatorsQueue.push(floorNum);
}
//searching for closest availible elevator
function findElevator(floorNum) {
  let min = FLOORS + 1;
  let elevatorIndex = -1;
  for (let i = 0; i < elevators.length; i++) {
    const absoluteDistance = Math.abs(elevators[i].floor - floorNum);
    if (absoluteDistance < min && elevators[i].isFree === true) {
      min = absoluteDistance;
      elevatorIndex = i;
    }
  }

  if (elevatorIndex > -1) {
    moveElevtor(
      document.querySelector(`.btn-${floorNum}`),
      floorNum,
      elevators[elevatorIndex]
    );

    elevatorsQueue.shift();
  }
}

//moving the elevator to destionation floor
function moveElevtor(e, floorNum, elevatorObj) {
  elevatorObj.isFree = false;
  elevatorObj.floor = floorNum;
  let pos = elevatorObj.DOM.style.bottom.split("px")[0];
  elevatorObj.intervalId = setInterval(changeFloor, 5);
  let timeElement = document.querySelector(`.waiting-time-${floorNum}`);
  function changeFloor() {
    if (pos == floorNum * 200) {
      e.style.backgroundColor = "green";
      sound.play();
      timeElement.innerText = "";
      clearInterval(elevatorObj.intervalId);
      setTimeout(() => {
        elevatorObj.isFree = true;
      }, 2000);
    } else {
      if (pos > floorNum * 200) {
        timeElement.innerText = Math.trunc((pos - floorNum * 200 - 1) / 60);
        pos--;
        elevatorObj.DOM.style.bottom = pos + "px";
      } else if (pos < floorNum * 200) {
        timeElement.innerText = Math.trunc((floorNum * 200 - pos - 1) / 60);
        pos++;
        elevatorObj.DOM.style.bottom = pos + "px";
      }
    }
  }
}

initBuilding();

//change color of elevator
