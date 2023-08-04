
import React, { useState, useEffect,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity,TouchableNativeFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, ActivityIndicator, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LOCAL_URL } from '../../../config';
import Feather from 'react-native-vector-icons/Feather';
import { CircularBox } from './LibraryGtuCircular';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import { GTUHeader } from '../Engineering/GtuMainPage';
import {ThemeContext} from "../../index"

function Calender() {
    const themecolor = useContext(ThemeContext);

    const [loading, setloading] = useState(false)
    const [datas, setdatas] = useState(null)

    const openLinkHandler = (url) => {
        let options = {
            toolbarColor: '#0F65CA',
            enableUrlBarHiding: false,
            showPageTitle: true,
            enableDefaultShare: true,
            animations: ANIMATIONS_SLIDE,
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url, options).then((launched) => {
            // console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let url =  `${LOCAL_URL}/circular/calender`;

                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                // console.log("fetch: got response");
                // console.log(data);
                setdatas(data);
                setloading(false);
            } catch (error) {
                if (error.name === "AbortError") {
                    // console.log("FetchCancel: caught abort");
                } else {
                    // console.log(error);
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        };
        loadData();

        return () => {
            controller.abort();
        };
    }, []);

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />

            {/* <ScrollView showsVerticalScrollIndicator={false}> */}

            <View style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: themecolor.fontprimary,
                        fontWeight: 'bold'
                    }}>
                        Academic calender
                        </Text>
                </Text>
                 <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler('https://www.gtu.ac.in/Circular.aspx')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ color: themecolor.blue }}>
                            Go to Website
                            </Text>
                        <Feather size={22} name="chevron-right" style={{
                            color: themecolor.blue
                        }} />

                    </View>
                </TouchableNativeFeedback>

            </View>
                <View style={{
                    // backgroundColor: 'yellow'
                }}>

                    <View style={{
                        // backgroundColor: 'yellow'
                    }}>
                        {(!loading) ? <FlatList
                            data={datas}
                            style={{marginBottom:200}}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => <CircularBox index={index} ptags={item.ptags} date={item.date} />}
                            keyExtractor={item => item._id}
                        /> : <ActivityIndicator size="large" color="#0F65CA" />}
                    </View>

                </View>

            {/* </ScrollView> */}

        </SafeAreaView >
    );
}




const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing:0.8
    }
});
export default Calender;
