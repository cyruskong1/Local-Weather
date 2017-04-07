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
    $('#loading').show();
    $('#clock').hide()
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
      $('#loading').hide();
      $('#clock').show();
      $('#title').html('Weather or Not')
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#currentTempHigh').html(currentTempHigh);
      $('#currentTempLow').html(currentTempLow);
      
      if(temp <= 58.9) {
        //change background color to blue
        console.log('changing background')
      $('#container').css('background','rgba(60, 173, 195, 1')
      } else if(temp > 59 && wd.main.temp < 70) {
        $('#container').css('background','rgba(183, 154, 56, 1)')
      } else if (temp > 71) {
        $('#container').css('background','rgba(194, 56, 56, 1)')
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
          
          <h3 className="center-text content-title" id="title"></h3>
          <h3 className="center-text content-title" id="currentLocation"></h3>
          <div className="content-body">
            <Clock id="clock"/>
            <h4 className="center-text" id="currentTemp"></h4>
            <h4 className="center-text" id="currentWeather"><img id="loading" src="./public/139.gif" /></h4>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));