"use strict";
const MAX_DEGREE = 60;
const MIN_DEGREE = -90;

const state ={
  //HTML states
  increaseTempControl: null,
  tempValue: null,
  decreaseTempControl:null,
  landscape: null,
  //data
  tempValueCount: 20
};

const loadControls = () => {
  state.increaseTempControl = document.getElementById("increaseTempControl");
  state.tempValue = document.getElementById("tempValue");
  state.decreaseTempControl = document.getElementById("decreaseTempControl");
  state.landscape = document.getElementById("landscape");
};

const handleIncreaseTempBtnClick = () => {
  if(state.tempValueCount < MAX_DEGREE){
    state.tempValueCount += 1;
  }
  state.tempValue.textContent = state.tempValueCount;
};

const handleDecreaseTempBtnClick = () => {
  if(state.tempValueCount > MIN_DEGREE){
    state.tempValueCount -= 1;
  }
  state.tempValue.textContent = state.tempValueCount;
  };

const landscapeSelection = (img) => {
  state.landscape.innerHTML = '';
  const newImage = `assets/${img}.png`;
  const newImageEl = document.createElement("img");
  newImageEl.src = newImage;
  newImageEl.alt = "a landscape";
  // newImageEl.style.height = '500px';
  // newImageEl.style.width = '700px';
  state.landscape.prepend(newImageEl);
};

const handleChangeBackgroundColor = () => {
  const temp = state.tempValueCount;
  const valueColor = state.tempValue;
  
  if(temp < 0 && temp >= MIN_DEGREE){
    valueColor.style.backgroundColor = "paleturquoise";
    //valueColor.style.color = "paleturquoise";
    landscapeSelection("antarctica");
  }else if(temp >= 0 && temp <= 9){
    valueColor.style.backgroundColor = "teal";
    //valueColor.style.color = "teal";
    landscapeSelection("winter");
  }else if(temp >= 10 && temp <= 15){
    valueColor.style.backgroundColor = "green";
    //valueColor.style.color= "green";
    landscapeSelection("autumn");
  }else if(temp >= 16 && temp <= 24){
    valueColor.style.backgroundColor = "yellow";
    //valueColor.style.color = "yellow";
    landscapeSelection("spring");
  }else if(temp >= 25 && temp <= 34){
    valueColor.style.backgroundColor = "orange";
    //valueColor.style.color = "orange";
    landscapeSelection("summer");
  }else if(temp >= 35 && temp <= MAX_DEGREE){
    valueColor.style.backgroundColor = "red";
    //valueColor.style.color = "red";
    landscapeSelection("hot_weather");
  }
};


const registerEvents = () => {
  state.increaseTempControl.addEventListener("click", handleIncreaseTempBtnClick);
  state.decreaseTempControl.addEventListener("click", handleDecreaseTempBtnClick);
  state.increaseTempControl.addEventListener("click", handleChangeBackgroundColor);
  state.decreaseTempControl.addEventListener("click", handleChangeBackgroundColor);
};

const onLoad = () => {
  loadControls();
  registerEvents();
};

onLoad();

