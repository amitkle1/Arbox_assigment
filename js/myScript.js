const FLOORS = 7;
const NUM_OF_ELEVATORS = 2;
const elevators = [];
const elevatorsQueue = [];
const buildingDOM = document.getElementById("building");
const sound = document.getElementById("dingdong");

// init of buildin: adding floors and buttons as elements to htmlDOM
const initBuilding = () => {
  for (let i = FLOORS - 1; i >= 0; i--) {
    const floor = document.createElement("div");
    floor.classList.add(`floor`);
    const floorNum_btn_container = document.createElement("div");
    floorNum_btn_container.classList.add("btn-text-container");
    const btn = document.createElement("button");
    btn.id = `btn-${i}`;
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
    waitingTime.id = `waiting-time-${i}`;
    waitingTime.classList.add("waiting-time");

    //assigning elements to DOM
    floorNum_btn_container.appendChild(waitingTime);
    floorNum_btn_container.appendChild(btn);
    floorNum_btn_container.appendChild(floorNum);
    floor.appendChild(floorNum_btn_container);
    buildingDOM.appendChild(floor);

    if (i == 0) {
      let elevator_container = document.createElement("div");
      elevator_container.classList.add("elevator_container");
      let elevator_left = 200;
      for (let j = 0; j < NUM_OF_ELEVATORS; j++) {
        const elevator = document.createElement("div");
        elevator.classList.add("elevator");
        elevator.classList.add("elevator-closed");
        elevator.style.left = elevator_left + "px";
        elevator_left += 200;
        elevator_container.appendChild(elevator);

        elevators.push({
          isFree: true,
          floor: 0,
          elevatorNumber: j,
          DOM: elevator,
          intervalId: null,
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
  const button = document.getElementById(`btn-${floorNum}`);
  button.disabled = true;
  button.style.cursor = "default";
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
      document.getElementById(`btn-${floorNum}`),
      floorNum,
      elevators[elevatorIndex]
    );

    elevatorsQueue.shift();
  }
}

//moving the elevator to destination floor
function moveElevtor(e, floorNum, elevatorObj) {
  elevatorObj.isFree = false;
  elevatorObj.floor = floorNum;
  let pos = elevatorObj.DOM.style.bottom.split("px")[0];
  elevatorObj.intervalId = setInterval(changeFloor, 15);
  let timeElement = document.getElementById(`waiting-time-${floorNum}`);
  function changeFloor() {
    if (pos == floorNum * 200) {
      e.disabled = false;
      e.style.cursor = "pointer";
      e.style.backgroundColor = "";
      sound.play();
      timeElement.innerText = "";
      elevatorObj.DOM.classList.remove("elevator-closed");
      elevatorObj.DOM.classList.add("elevator-open");

      clearInterval(elevatorObj.intervalId);
      setTimeout(() => {
        elevatorObj.isFree = true;
        elevatorObj.DOM.classList.remove("elevator-open");
        elevatorObj.DOM.classList.add("elevator-closed");
      }, 2000);
    } else {
      if (pos > floorNum * 200) {
        timeElement.innerText = Math.trunc((pos - floorNum * 200 - 1) / 60) + 1;
        pos--;
        elevatorObj.DOM.style.bottom = pos + "px";
      } else if (pos < floorNum * 200) {
        timeElement.innerText = Math.trunc((floorNum * 200 - pos - 1) / 60) + 1;
        pos++;
        elevatorObj.DOM.style.bottom = pos + "px";
      }
    }
  }
}

initBuilding();
