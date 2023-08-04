
import React, { memo, useState, useEffect,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, TouchableNativeFeedback, StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Downloads from './Downloads';
import Bookmarks from './Bookmarks';
import { ThemeContext } from '../..';



const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();



function ShelfScreen({ navigation }) {

    const themecolor = useContext(ThemeContext);


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >

             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 
            onPress={() => navigation.navigate('SearchScreen')} 
            >

                <View style={{
                    width: '90%',
                    marginLeft: '5%',
                    borderRadius: 7,
                    marginTop: 8,
                    backgroundColor:themecolor.bgsecondary,
                    flexDirection: 'row',
                    padding: 13,
                    height: 45,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,
                    elevation: 8,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {/* <Fontisto size={18} name="search" style={{
                            paddingLeft: 2,
                            color: '#0F65CA'
                        }} /> */}

                        <Text style={{
                            fontSize: 17,
                            paddingLeft: 7,
                            color: themecolor.fontsecondary,
                            fontFamily: styles.baseText.fontFamily,
                            letterSpacing:styles.normalText.letterSpacing,
                        }}>Search Books</Text>
                    </View>
                    <Fontisto size={18} name="search" style={{
                            paddingLeft: 2,
                            color: themecolor.blue
                        }} />

                </View>
            </TouchableNativeFeedback>
            <ShelfNavigator />

        </SafeAreaView >
    );
}

const ShelfNavigator = () => {
    const themecolor = useContext(ThemeContext);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: themecolor.blue,
                inactiveTintColor: themecolor.fontprimary,
                style: { backgroundColor:themecolor.bgcolor, },
                labelStyle: { fontSize: 14, textTransform: 'none',  letterSpacing: styles.baseText.letterSpacing }
            }} >
            <Tab.Screen name="Downloads" component={Downloads} />
            <Tab.Screen name="Favourites" component={Bookmarks} />

        </Tab.Navigator>

    )
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    },
    normalText:{
        letterSpacing:0.5
    }
});
export default ShelfScreen;








