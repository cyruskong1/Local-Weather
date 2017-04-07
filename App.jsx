import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Clock from './clock';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat:null,
      lon:null,
      region:null
    }
  }
 
  componentDidMount () {
    console.log('local weather by Cy Kong')
    var context = this

    $.getJSON('http://ipinfo.io', function(d){
    console.log('location data received', d);
      context.setState({
        region:d.region
      })
    })

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('getting local position', position)
      console.log(position.coords.latitude, position.coords.longitude)
      console.log('inside getJSON', context)
      context.setState({
        lat:position.coords.latitude,
        lon:position.coords.longitude
        
      })
    });
  }

  componentDidUpdate() {
    var context = this
     var url = 'http://api.openweathermap.org/data/2.5/weather?&lat=' + context.state.lat + '&lon='+ context.state.lon + '&units=imperial'
    var apiKey = '&appid=a18b64322a86613b665036b8cf660893'
    
    $.getJSON(url + apiKey, function (wd) {
      console.log('getting local weather')
      console.log('got the data', wd);
      var currentLocation = wd.name + ', ' + context.state.region;
      var currentWeather = wd.weather[0].main;
      var currentTemp = wd.main.temp + ' <sup>o</sup>F';
      var currentTempHigh = wd.main.temp_max;
      var currentTempLow = wd.main.temp_min;
      var currentWeatherID = wd.weather[0].id
      var temp = wd.main.temp;
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#currentTempHigh').html(currentTempHigh);
      $('#currentTempLow').html(currentTempLow);
      
      if(temp < 58) {
        //change background color to blue
      $('#container').css('background','#3cadc3')
      } else if(temp > 59 && wd.main.temp < 70) {
        $('#container').css('background','#b79a38')
      } else if (temp > 71) {
        $('#container').css("background",'#c23838')
      }

       var weatherID ={
      '800':'http://openweathermap.org/img/w/11d.png', //clear sky
      '802':'http://openweathermap.org/img/w/11d.png', //clouds
      '900':'http://openweathermap.org/img/w/11d.png', //thunderstorm
      '500':'http://openweathermap.org/img/w/10d.png', //rain
      '200':'http://openweathermap.org/img/w/11d.png', //thunderstorm
      '600':'http://openweathermap.org/img/w/13d.png', //snow
      '700':'http://openweathermap.org/img/w/50d.png' //mist
    }
    console.log('currentWeatherID before', currentWeatherID)
    currentWeatherID = Math.floor(currentWeatherID/100)*100
    console.log('currentWeatherID after', currentWeatherID)
    for(var key in weatherID) {
      if(currentWeatherID == key) {
        console.log('currentWeatherID', key, weatherID[key])
        var img = document.createElement('IMG');
        img.setAttribute('src', weatherID[key]);
        document.getElementById('currentWeather').appendChild(img);
      }
    }

    })

  }


  render() {
    return (
      <div>
        <div id="container">
          <h2 className="center-text content-title">WeatherLoc</h2>
          <h2 className="center-text content-title" id="currentLocation">Get Current Weather</h2>
          <div className="content-body">
            <Clock />
            <p className="center-text" id="currentTemp">Getting Current Weather</p>
            <div className="center-text" id="currentWeather"></div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));