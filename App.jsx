import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    var location;
      
    console.log('location', location);
    $.getJSON('http://ipinfo.io', function(d){
    console.log(d);
    location = d.city;
    
    //call to weather API
    var url = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q='
    var apiKey = '&appid=a18b64322a86613b665036b8cf660893'
    console.log('query', url + location + apiKey)
    
    $.getJSON(url + location + apiKey, function (wd) {
      console.log('got the data', wd.main.temp);
      var currentLocation = wd.name + ', ' + d.region;
      var currentWeather = wd.weather[0].description;
      var currentTemp = wd.main.temp + ' <sup>o</sup>F';
      var currentTempHigh = wd.main.temp_max;
      var currentTempLow = wd.main.temp_min;
      var temp = wd.main.temp;
      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#currentTempHigh').html(currentTempHigh);
      $('#currentTempLow').html(currentTempLow);
      
      if(temp < 40) {
        //change background color to blue
      $('#container').css('background','#3cadc3')
      } else if(temp > 41 && wd.main.temp < 70) {
        $('#container').css('background','#b79a38')
      } else if (temp > 71) {
        $('#container').css("background",'#c23838')
      }
    })
  });
  }

  render() {
    return (
      <div>
        <div id="container">
          <h2 class="center-text content-title">WeatherLoc</h2>
          <h2 class="center-text content-title" id="currentLocation">Getting Location...</h2>
          <div class="content-body">
          <p class="center-text" id="currentTemp">Getting Temperature...</p>
          <p class="center-text" id="currentWeather">Getting Current Weather Conditions</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));