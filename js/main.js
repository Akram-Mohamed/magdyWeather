
//variables

let currentLong,currentLat;
let allWeather;
const date = new Date();
let searchBtn=document.getElementById('search-btn')
let searchValue=document.getElementById('search-value');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = date.getDate();
const currentDayName =  days[date.getDay()];
const currentMonth =  monthNames[date.getMonth()] ;
let shownData=document.getElementById('wether-data');   
let sceondDayName='';
let thridDayName= '';

if(currentDay==5)
{
        sceondDayName='Saturday'
        thridDayName='Sunday'
}else if (currentDay==6)
{
        sceondDayName='Sunday'
thridDayName='monday'

}else
{
         sceondDayName= days[date.getDay()+1];
         thridDayName= days[date.getDay()+2];    
}
async function getwither(latitude,longitude) {
       
        let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=51228da869164f5eb1a103306233107&q=${latitude},${longitude}&days=3`);  
        response=await response.json();  
         
            allWeather=response;
console.log(allWeather);
            if(!response.error&&response.status!=400){
                displaywither() ;
                }
              
            
}




function displaywither()
{
        var cartona=''
        
              cartona+=`<div class="col-lg-4">
              <div class="card ">
                      <div class="card-header d-flex flex-row justify-content-between align-items-center">
                              <span> ${currentDayName} </span>
                              <span>${currentDay} ${currentMonth}</span>
                      </div>
                              <div class="card-body">
                              <h5 class="card-title text-white">${allWeather.location.name}</h5>
                                      <div class="degree d-flex justify-content-center align-items-center ">
                                              <div class="num">${allWeather.current.temp_c}<sup>o</sup>C</div>
                                              <div class="forecast-icon">
                                              <img src="images/${allWeather.current.condition.icon.slice(35,)}" alt="" width="90">
                                      </div>	
                              </div>
                              <p id="weather-status">${allWeather.current.condition.text}</p>
                              <div class="card-footer ">
                                      <div class="icon-info  d-flex flex-row align-items-center justify-content-center p-1 ">
                                              <span>
                                              <img src="images/icon-umberella.png" class="px-2 " alt="">20%
                                              </span>
                                              <span>
                                              <img src="images/icon-wind.png" class="px-2 " alt=""> 18km/h
                                              </span>
                                              <span>
                                              <img src="images/icon-compass.png" class="px-2 " alt=""> East
                                              </span>
                                      </div>
                              </div>
                      </div>
              </div>
      </div>  
      <div class="col-lg-4">
              <div class="card ">
                      <div class="card-header d-flex flex-row justify-content-center align-items-center">
                              <span>${sceondDayName} </span>
                      </div>
                      <div class="card-body text-center ">
                      
                      
                      
              
                              <div class="degree d-flex justify-content-center align-items-center  flex-column">
                                      <img src="images/${allWeather.forecast.forecastday[1].day.condition.icon.slice(35, )}" alt="" width="90">
                                      <div class="Midd-num">${allWeather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup></div>
                                      <div class="foot-num">${allWeather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></div>
                              </div>
                              <p id="weather-status" class="pt-3">${allWeather.forecast.forecastday[1].day.condition.text}</p>
                      </div>

              </div>
      
      </div>
      
      <div class="col-lg-4">
              <div class="card ">
                              <div class="card-header d-flex flex-row justify-content-center align-items-center">
                              <span> ${thridDayName}  </span>
                              </div>
                      <div class="card-body text-center ">
                              <div class="degree d-flex justify-content-center align-items-center  flex-column">
                              <img src="images/${allWeather.forecast.forecastday[2].day.condition.icon.slice(35, )}" alt="" width="90">
                                      <div class="Midd-num">${allWeather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup></div>
                                      <div class="foot-num">${allWeather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></div>
                              </div>
                      <p id="weather-status" class="pt-3">${allWeather.forecast.forecastday[2].day.condition.text}   </p>
                      
                      </div>

              </div>
      
      </div>
`
                
        
        shownData.innerHTML=cartona
}
if(document.body.contains(searchBtn))
{
   searchBtn.addEventListener('click',function () {
       
        search( searchValue.value)  
}) 
searchValue.addEventListener('input',function(){

        search( searchValue.value)  
})   
}


function search(namecity) {
        getwither(namecity)
}
getLocation()
function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
                getwither('cairo')
        }
      }

      function showPosition(position) {

        currentLong=position.coords.longitude;
        currentLat=position.coords.latitude;
        getwither(currentLat,currentLong)
        console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude); 
      }
      