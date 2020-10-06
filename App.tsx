import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import AppTabs from './src/navigation/AppTabs';
import dataReducer from './src/store/reducers/data';
import trainingReducer from './src/store/reducers/training';
import { StatusBar } from 'expo-status-bar';

const rootReducer = combineReducers({
  data: dataReducer,
  currentTraining: trainingReducer,
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    digital: require('./assets/fonts/digital-7.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="white" />
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
}
