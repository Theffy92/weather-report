"use strict";

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
  currentTempButton: null,
  skySelect: null,
  sky__section: null,
  sky: null,
  gardenContent: null,

  tempValueCount: 0,
};

const loadControls = () => {
  state.increaseTempControl = document.getElementById("increaseTempControl");
  state.tempValue = document.getElementById("tempValue");
  state.decreaseTempControl = document.getElementById("decreaseTempControl");
  state.landscape = document.getElementById("landscape");
  state.headerCityName = document.getElementById("headerCityName");
  state.cityNameInput = document.getElementById("cityNameInput");
  state.cityNameReset = document.getElementById("cityNameReset");
  state.currentTempButton = document.getElementById("currentTempButton");
  state.skySelect = document.getElementById("skySelect")
  state.sky__section = document.getElementsByClassName("sky__section")
  state.sky = document.getElementsByClassName("sky")
  state.gardenContent = document.getElementById('gardenContent');
};

const getCurrentTemperature = () => {
  const city = state.cityNameInput.value;

  return axios
    .get('http://localhost:5000/location', {params: {
      q: city,
      },
    })
    .then((response) => {
      const locationData = response.data[0];
      const cityName = locationData.city;

      state.headerCityName.textContent = cityName;
      handleCityName();
      axios.get(`http://localhost:5000/weather?lat=${locationData.lat}&lon=${locationData.lon}`)
      .then((response)=>{
          const temperature = response.data.main.temp;
          const tempCelsius = Math.floor(temperature - 273.15);
          state.tempValueCount = tempCelsius;
          state.tempValue.textContent = tempCelsius;
          console.log(response.data)
          handleChangeBackgroundColor();
      })
      .catch((error) => {
        console.log("Error temperature:", error);
      });
    })
    .catch((error) =>{
      console.log("Error location:", error);
    });
  };

const skySelection = () => {
  const skySelect = state.skySelect.value;

  switch (skySelect) {
    case 'Sunny':
      sky.textContent = "☀️ ☀️ ☀️ ☀️ ☀️";
      gardenContent.classList = "garden__content sunny";
      break;
    case 'Cloudy':
      sky.textContent = "🌤 🌤 🌤 🌤 🌤";
      gardenContent.classList = "garden__content cloudy";
      break;
    case 'Rainy':
      sky.textContent = "🌧 🌧 🌧 🌧 🌧";
      gardenContent.classList = "garden__content rainy";
      break;
    case 'Snowy':
      sky.textContent = "❄️ ❄️ ❄️ ❄️ ❄️";
      gardenContent.classList = "garden__content snowy";
      break;
  }
};

const landscapeSelection = (img) => {
  state.landscape.innerHTML = '';
  const newImage = `assets/${img}.png`;
  const newImageEl = document.createElement("img");
  newImageEl.src = newImage;
  newImageEl.alt = "a landscape";
  state.landscape.prepend(newImageEl);
};

const handleChangeBackgroundColor = () => {
  const temp = state.tempValueCount;
  const valueColor = state.tempValue;
  
  if(temp < 0 && temp >= MIN_DEGREE){
    valueColor.style.backgroundColor = "paleturquoise";
    landscapeSelection("antarctica");
  }else if(temp >= 0 && temp <= 9){
    valueColor.style.backgroundColor = "teal";
    landscapeSelection("winter");
  }else if(temp >= 10 && temp <= 15){
    valueColor.style.backgroundColor = "green";
    landscapeSelection("autumn");
  }else if(temp >= 16 && temp <= 24){
    valueColor.style.backgroundColor = "yellow";
    landscapeSelection("spring");
  }else if(temp >= 25 && temp <= 34){
    valueColor.style.backgroundColor = "orange";
    landscapeSelection("summer");
  }else if(temp >= 35 && temp <= MAX_DEGREE){
    valueColor.style.backgroundColor = "red";
    landscapeSelection("hot_weather");
  }
};

const setDefaultCity = (city) => {
  localStorage.setItem('defaultCity', city);
};

const getDefaultCity = () => {
  return localStorage.getItem('defaultCity');
};

const loadDefaultCity = () => {
  const defaultCity = 'Corrientes';
  state.cityNameInput.value= defaultCity;
  state.headerCityName.textContent = defaultCity;
  const temp = 22;
  state.tempValueCount = temp;
  state.tempValue.textContent = temp;
  setDefaultCity(defaultCity);
  handleChangeBackgroundColor();
};

const handleCityName = () => {
  const city = state.cityNameInput.value;
  if (city) {
    state.headerCityName.textContent = city;
  }
  setDefaultCity(city);
};

const handleResetBtn = () =>{
    const defaultCity = 'Corrientes';
    state.cityNameInput.value = defaultCity;
    state.headerCityName.textContent = defaultCity;
    setDefaultCity(defaultCity);
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

const registerEvents = () => {
  state.increaseTempControl.addEventListener("click", handleIncreaseTempBtnClick);
  state.decreaseTempControl.addEventListener("click", handleDecreaseTempBtnClick);
  state.increaseTempControl.addEventListener("click", handleChangeBackgroundColor);
  state.decreaseTempControl.addEventListener("click", handleChangeBackgroundColor);
  state.currentTempButton.addEventListener("click", getCurrentTemperature);
  state.cityNameInput.addEventListener("input", handleCityName);
  state.cityNameReset.addEventListener("click", handleResetBtn);
  state.skySelect.addEventListener("change", skySelection);
  skySelection();
  //the event below is used to load the default city when the page is loaded or reloaded
  window.addEventListener('load', loadDefaultCity);
};

const onLoad = () => {
  loadControls();
  registerEvents();
};

onLoad();