"use strict";

// const axios = require('axios');

const MAX_DEGREE = 60;
const MIN_DEGREE = -90;

const state ={
  //HTML states
  increaseTempControl: null,
  tempValue: null,
  decreaseTempControl:null,
  landscape: null,
  headerCityName: null,
  cityNameInput: null,
  cityNameReset: null,

  tempValue: null,
  currentTempButton: null,
};

const loadControls = () => {
  state.increaseTempControl = document.getElementById("increaseTempControl");
  state.tempValue = document.getElementById("tempValue");
  state.decreaseTempControl = document.getElementById("decreaseTempControl");
  state.landscape = document.getElementById("landscape");
  state.headerCityName = document.getElementById("headerCityName");
  state.cityNameInput = document.getElementById("cityNameInput");
  state.cityNameReset = document.getElementById("cityNameReset");

  state.tempValue = document.getElementById('tempValue');
  state.currentTempButton = document.getElementById('currentTempButton');
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

//  Wave 4

const getTemp = () => {
  return axios
  .get('http://localhost:5000/weather', {
      params: {
      lat: 28.5656649,
      lon: -81.5856742,
      },
  })
  .then(response => {
      const tempKevin = response.data.main.temp;
      const tempCelsius = Math.floor(tempKevin - 273.15);
      state.tempValueCount = tempCelsius;
      state.tempValue.textContent = tempCelsius;
      console.log(response.data);
  })

  .catch(error => {
    console.error("Error:", error);
  });
};

// const getLatLon = () => {
//   return axios
//   .get('http://localhost:5000/location', {
//       params: {
//       q: state.cityNameInput.value,
//       },
//   })
//   .then(response => {
//       const { lat: latitude, lon: longitude } = response.data[0];
//       return { latitude, longitude };
//       console.log(response)
//   })

//   .catch(error => {
//     console.error("Error:", error);
//   });
// };

const handleCityBtnClick = () => {
  const city = state.cityNameInput.value;
  if (city) {
    state.headerCityName.textContent = city;
    state.cityNameInput.value = "";

    // getLatLon(city)
    // return axios
    // .get('localhost:5000/locatiom')
    //   .then(({latitude, longitude}) => {

    //   })

    //   .catch(error => {
    //     console.error("Error:", error);
    //   });
  };
};

const handleCityBtnEnter = (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    state.cityNameReset.click();
  };
};

const registerEvents = () => {
  state.increaseTempControl.addEventListener("click", handleIncreaseTempBtnClick);
  state.decreaseTempControl.addEventListener("click", handleDecreaseTempBtnClick);
  state.increaseTempControl.addEventListener("click", handleChangeBackgroundColor);
  state.decreaseTempControl.addEventListener("click", handleChangeBackgroundColor);
  state.cityNameInput.addEventListener("keydown",handleCityBtnEnter);
  state.cityNameReset.addEventListener("click", handleCityBtnClick);

  // Wave 4
  state.currentTempButton.addEventListener("click", getTemp)

};

const onLoad = () => {
  loadControls();
  registerEvents();
};

onLoad();