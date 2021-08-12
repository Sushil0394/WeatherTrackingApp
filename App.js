import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139';
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          weather: responseJson,
        });
      })
      .catch((error) => {
        console.error('Error while fetching weather Report: ' + error);
      });
  };

  componentDidMount = () => {
    this.getWeather();
  }

  render() {
    if (this.state.weather === '') {
      return (
        <View style={{}}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Weather Forcast</Text>
            <Image style={styles.cloudImage} source={require('./WeatherForcastLogo.jpg')}></Image>
          </View>

          <View style={styles.textContainer}>
            <Text style={{fontSize:20}}>Temprature: {this.state.weather.main.temp}&deg; C </Text>
            <Text style={{fontSize:20}}>Humidity:  {this.state.weather.main.humidity} </Text>
            <Text style={{fontSize:20}}>Today's Details: {this.state.weather.weather[0].description} </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    backgroundColor: 'white',
    padding: 20,

  },
  textContainer: {
    backgroundColor: 'white',
  }
});
