"use strict";
const MAX_DEGREE = 60;
const MIN_DEGREE = -90;

const state ={
  //HTML states
  increaseTempControl: null,
  tempValue: null,
  decreaseTempControl:null,
  //data
  tempValueCount: 20
};

const loadControls = () => {
  state.increaseTempControl = document.getElementById("increaseTempControl");
  state.tempValue = document.getElementById("tempValue");
  state.decreaseTempControl = document.getElementById("decreaseTempControl");
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

const handleChangeBackgroundColor = () => {
  const temp = state.tempValueCount;
  const valueColor = state.tempValue;
  if(temp <= 9 && temp >= MIN_DEGREE){
    valueColor.style.backgroundColor = "teal";
    //valueColor.style.color = "teal";
  }else if(temp >= 10 && temp <= 15){
    valueColor.style.backgroundColor = "green";
    //valueColor.style.color= "green";
  }else if(temp >= 16 && temp <= 20){
    valueColor.style.backgroundColor = "yellow";
    //valueColor.style.color = "yellow";
  }else if(temp >= 21 && temp <= 25){
    valueColor.style.backgroundColor = "orange";
    //valueColor.style.color = "orange";
  }else if(temp >= 26 && temp <= MAX_DEGREE){
    valueColor.style.backgroundColor = "red";
    //valueColor.style.color = "red";
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

