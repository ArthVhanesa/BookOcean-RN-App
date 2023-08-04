// import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from 'react-navigation-stack';
import React, { useEffect ,createContext} from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Home from './Screens/Home';
import { Provider, useDispatch,useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { createStackNavigator } from '@react-navigation/stack';
import PdfReaderScreen from './Screens/PdfReaderScreen';
import SearchScreen from './Screens/Home/SearchSectionWithCategoryPage';
import ShelfScreen from './Screens/Shelf/ShelfSectionPage';
import MoreScreen from './Screens/More/MorePage';
import colors from '../config/theme';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();
export const ThemeContext = createContext();


function AppFlow() {

  return (
    <RootStack.Navigator
      headerMode="none"
    >
      <RootStack.Screen name="tabnav" component={Tabnavigator} />
      <RootStack.Screen name="PdfReaderScreen" component={PdfReaderScreen} />
    </RootStack.Navigator>
  );
}

const Tabnavigator = () => {
  let themecolor;
  const { theme } = useSelector(state => state.booksReducer);
  console.log("hometheme",theme);
  if (theme==="dark") {

       themecolor=colors.dark;
  } else if(theme==="light"){
       themecolor=colors.light;
  } else if(theme==="amoled"){
       themecolor=colors.amoled;
  }


  return (
    <ThemeContext.Provider value={themecolor}>
    <PersistGate loading={null} persistor={persistor}>

      <Tab.Navigator 
        // screenOptions={({ route }) => ({
        // })}
        tabBarOptions={{
          style: { height: 56,backgroundColor:themecolor.bgcolor },
          labelStyle: {
            marginTop: -4,
            marginBottom: 6,
            fontSize: 14,
            fontFamily: styles.baseText.fontFamily,
            letterSpacing: 1,
          },
          activeTintColor: themecolor.blue,
          inactiveTintColor: themecolor.gray,
          keyboardHidesTabBar: 'true',
        }}
      >
        <Tab.Screen name="Home" children={
          ()=><Home themecolor={themecolor} />
        } options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
          ),
        }}   />
      
        <Tab.Screen name="Search" options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="search" color={color} size={19} />
          ),
        }} 
        // children={()=><SearchScreen  themecolor={themecolor} />}
         component={SearchScreen}
         />
        <Tab.Screen name="Shelf" options={{
          tabBarLabel: 'Shelf',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
        }} component={ShelfScreen}  />
        <Tab.Screen name="More" options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={28} />
          ),
        }} children={()=><MoreScreen  themecolor={themecolor} />} />

        {/* <Tab.Screen name="EpubReader" options={{
            tabBarLabel: 'Reader',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="menu" color={color} size={28} />
            ),
          }} component={EpubReader} /> */}

      </Tab.Navigator>
    </PersistGate>
    </ThemeContext.Provider>

  )
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Roboto"
  }
});

export default AppFlow;
