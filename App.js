import React, { Component } from 'react';
import HomeScreen from './screens/HomeScreen';
import RecommendedMoviesScreen from './screens/Recommendation';
import PopularMoviesScreen from './screens/Popular';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {RFValue} from 'react-native-responsive-fontsize';

export default function App() {
  return (
    <AppContainer/>   
  );
}

const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedMovies : {
    screen: RecommendedMoviesScreen,
    navigationOptions: {
      tabBarLabel: 'Recommended',
      tabBarOptions: {tabStyle: {backgroundColor: 'white'},
      labelStyle: {color: 'black'},
      indicatorStyle: {backgroundColor: 'black'}
    }
    }
  },
  PopularMovies : {
    screen: PopularMoviesScreen,
    navigationOptions: {
      tabBarLabel: 'Popular',
      tabBarOptions: {tabStyle: {backgroundColor: 'white'},
      labelStyle: {color: 'black'},
      indicatorStyle: {backgroundColor: 'black'}
    }
    }
  }
})

const AppStackNavigator = createStackNavigator({
  Home : {
    screen : HomeScreen,
    navigationOptions: {
      headerShown : false,
    }
  },
  AppTopNav : {
    screen : AppTopNavigation,
    navigationOptions: {
      headerBackTitle : null,
      headerTintColor : 'white',
      headerTitle : 'Recommended Movies',
      headerStyle : {backgroundColor : '#d500f9'},
      headerTitleStyle : {color : 'white', fontWeight : 'bold', fontSize : RFValue(18)},
    }
  }
},{initialRouteName : 'Home'})

const AppContainer = createAppContainer(AppStackNavigator)