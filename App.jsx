import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import configureStore from './src/store/configureStore';
import colors from './src/theme/colors';
import HomeScreen from './src/components/HomeScreen';
import BookDetailsScreen from './src/components/BookDetailsScreen';
import FavoritesScreen from './src/components/FavoritesScreen';
import {selectColormode, updateColormode} from './src/store/colormode';

const store = configureStore();
const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const colormode = useSelector(selectColormode);
  const deviceColormode = useColorScheme();
  console.log(deviceColormode);

  useEffect(() => {
    if (deviceColormode && deviceColormode !== colormode) {
      dispatch(updateColormode(deviceColormode));
    }
  }, [deviceColormode, colormode, dispatch]);

  const isDarkMode = colormode === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: isDarkMode ? colors.white : colors.dark50,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.dark50 : colors.white,
          },
          contentStyle: {
            backgroundColor: isDarkMode ? colors.dark50 : colors.white,
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookDetailsScreen"
          component={BookDetailsScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{title: 'Favorites'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ConnectedApp;
