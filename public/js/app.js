const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');


const api_key = 'c3c39dc11ccf62ffce4c281436010cc3';

// const APY_KEY = '8476acb50037d7ebda136433cf60831b'

const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${api_key}`;

const icon_url = 'http://openweathermap.org/img/w/';

const DEFAULT_CITY = 'Chandpur,Bd'

window.onload = function(){
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    }, e => {
        getWeatherData()
    })

    cityInput.addEventListener('keypress', function(d){
        if(d.key === 'Enter'){
            if(d.target.value){
                getWeatherData(d.target.value)
                d.target.value = ''
            }else{
                alert('please Enter Your Valid City Name')
            }
        }
    })


    // cityInput.addEventListener('keypress', function(e){
    //     if(e.key ==='Enter'){
    //         console.log('check');
    //         if(e.target.value){
    //             getWeatherData(e.target.value)
    //         } else{
    //             alert('Please Enter a Valid City Name')
    //         }
    //     }
    // })

}

function getWeatherData(city = DEFAULT_CITY, coords){

    let url = BASE_URL

    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
        url = `${url}&q=${city}`

    // console.log(url);
    axios.get(url)
        .then(({data}) => {
            // console.log(response.data);
            let weather = {
                icon: data.weather[0].icon ,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            }

            setWeather(weather)
        })
        .catch(e => {
            // console.log(e);
            alert('City Not Found')
        })
}

function setWeather(weather){
    condition.src =`${icon_url}${weather.icon}.png`
    city.innerHTML = weather.name
    country.innerHTML = weather.country
    mainText.innerHTML = weather.main
    description.innerHTML = weather.description
    temp.innerHTML = weather.temp
    pressure.innerHTML = weather.pressure
    humidity.innerHTML = weather.humidity

}