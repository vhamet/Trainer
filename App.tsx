import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import AppTabs from './src/navigation/AppTabs';
import settingsReducer from './src/store/reducers/settings';
import trainingReducer from './src/store/reducers/training';
import dataReducer from './src/store/reducers/data';

const rootReducer = combineReducers({
  data: dataReducer,
  currentTraining: trainingReducer,
  settings: settingsReducer,
});
const store = createStore(rootReducer);

const fetchFonts = () =>
  Font.loadAsync({
    digital: require('./assets/fonts/digital-7.ttf'),
  });

const App: React.FC = () => {
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
};

export default App;
