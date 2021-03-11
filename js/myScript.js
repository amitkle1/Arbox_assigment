const FLOORS = 10;
const NUM_OF_ELEVATORS = 5;
const elevators = [];
const elevatorsQueue = [];
// DOM elements
let buildingDOM = document.querySelector(".building");

let intervalId = null;

//functions

function inviteElevator(e, floorNum) {
  e.target.style.backgroundColor = "red";
  elevatorsQueue.push(floorNum);
}
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
  console.log(elevatorIndex);
  if (elevatorIndex > -1) {
    moveElevtor(
      document.querySelector(`.btn-${floorNum}`),
      floorNum,
      elevators[elevatorIndex]
    );
    // elevator_floor = -1;
    elevatorsQueue.shift();
  }
}

function moveElevtor(e, floorNum, elevatorObj) {
  elevatorObj.isFree = false;
  elevatorObj.floor = floorNum;
  let pos = elevatorObj.DOM.style.bottom.split("px")[0];
  elevatorObj.intervalId = setInterval(frame.bind(this), 5);
  function frame() {
    if (pos == floorNum * 200) {
      e.style.backgroundColor = "green";
      clearInterval(elevatorObj.intervalId);
      setTimeout(() => {
        elevatorObj.isFree = true;
      }, 2000);
    } else {
      if (pos > floorNum * 200) {
        console.log("bigger");
        pos--;
        elevatorObj.DOM.style.bottom = pos + "px";
      } else if (pos < floorNum * 200) {
        console.log("smaller");
        pos++;
        elevatorObj.DOM.style.bottom = pos + "px";
      }
    }
  }
}

const initBuilding = () => {
  for (let i = FLOORS; i >= 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add(`floor`);
    floor.classList.add(`floor-${i}`);
    const txt_btn_container = document.createElement("div");
    txt_btn_container.classList.add("btn-text-container");
    const btn = document.createElement("button");
    btn.innerText = "Press to call elevator";
    btn.classList.add(`btn`);
    btn.classList.add(`btn-${i}`);
    btn.addEventListener("click", (e) => {
      inviteElevator(e, i);
    });
    const floorNum = document.createElement("span");
    floorNum.classList.add("floor-number");
    floorNum.innerText = i;

    //assigning elemnts to DOM
    txt_btn_container.appendChild(btn);
    txt_btn_container.appendChild(floorNum);
    floor.appendChild(txt_btn_container);
    buildingDOM.appendChild(floor);

    if (i == 0) {
      let elevator_container = document.createElement("div");
      elevator_container.classList.add("elevator_container");
      let elevator_left = 0;
      for (let j = 0; j < NUM_OF_ELEVATORS; j++) {
        const elevator = document.createElement("div");
        elevator.classList.add("elevator");
        elevator.innerText = `elevator number ${j + 1}`;
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

const initEventLoop = () => {
  setInterval(() => {
    if (elevatorsQueue.length != 0) {
      findElevator(elevatorsQueue[0]);
    }
  }, 500);
};

initBuilding();

//change color of elevator
