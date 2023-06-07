"use strict";

const state ={
  increaseTempControl: null,
  tempValue: null,
  decreaseTempControl:null,
  tempValueCount: 20
};

const loadControls = () => {
  state.increaseTempControl = document.getElementById("increaseTempControl");
  state.tempValue = document.getElementById("tempValue");
  state.decreaseTempControl = document.getElementById("decreaseTempControl");
};

const handleIncreaseTempBtnClick = () => {
state.tempValueCount += 1;
state.tempValue.textContent = state.tempValueCount;
};

const handleDecreaseTempBtnClick = () => {
  state.tempValueCount -= 1;
  state.tempValue.textContent = state.tempValueCount;
  };

const registerEvents = () => {
state.increaseTempControl.addEventListener("click", handleIncreaseTempBtnClick);
state.decreaseTempControl.addEventListener("click", handleDecreaseTempBtnClick);
};

const onLoad = () => {
  loadControls();
  registerEvents();
};

onLoad();