const testButton = document.querySelector('.test');
const locationInput = document.querySelector("#searchBox");
const nameBox = document.querySelector("#name");
const icon = document.querySelector("#icon");
const conditions = document.querySelector("#conditions");
const currentTemp = document.querySelector("#currentTemp");
const feelsLike = document.querySelector("#feelsLike");
const hiTemp = document.querySelector("#hiTemp");
const lowTemp = document.querySelector("#lowTemp");

async function getWeather(location){
  try{ 
    let responseCity = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e57ef9e3ae478b2aff75369fb5bf23a8`, {mode: 'cors'})
    let responseCityJSON = await responseCity.json()
    return await responseCityJSON;
  }
  catch(error){
    console.log(error)
  }}
  

locationInput.addEventListener('keydown', function(event){
  if (event.keyCode == 13){
  nameBox.textContent = "Loading!"
  getWeather(locationInput.value)
  .then(function(response){
      try{
      locationInput.value = "";
      nameBox.textContent = `${response.name}`;
      conditions.textContent = `Conditions: ${response.weather[0].description}`
      icon.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`
      currentTemp.textContent = `Current Temp: ${response.main.temp}°F`
      feelsLike.textContent = `Feels Like: ${response.main.feels_like}°F`;
      hiTemp.textContent = `Forcasted High: ${response.main.temp_max}°F`;
      lowTemp.textContent = `Forcasted Low: ${response.main.temp_min}°F`}
      catch(error){
        console.log(error);
        nameBox.textContent = "Please Enter Valid City"
        conditions.textContent = "";
        icon.src = "";
        currentTemp.textContent = "";
        feelsLike.textContent = "";
        hiTemp.textContent = ""; 
        lowTemp.textContent = "";
      }
  })
}}, false); 

