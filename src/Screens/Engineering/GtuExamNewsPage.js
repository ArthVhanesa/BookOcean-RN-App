
import React, { useState, useEffect, useContext} from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TouchableNativeFeedback, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, ActivityIndicator, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { Ptagcustom } from './LibraryGtuCircular';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import { GTUHeader } from '../Engineering/GtuMainPage';
import { LOCAL_URL } from '../../../config'
import {ThemeContext} from "../../index"

function ExamNews() {
    const themecolor = useContext(ThemeContext);

    const [loading, setloading] = useState(false)
    const [datas, setdatas] = useState(null)

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let url = LOCAL_URL + "/circular/" + "exam-schedule";

                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                console.log("fetch: got response");
                // console.log(data);
                setdatas(data);
                setloading(false);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log(error);
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        };
        loadData();

        return () => {
            controller.abort();
        };
    }, []);

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
    
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />
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
                            Exam News
                        </Text>
                    </Text>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler('https://www.gtu.ac.in/exam.aspx')}>
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
                            renderItem={({ item, index }) => <ExamNewsBox index={index} ptags={item.ptags} date={item.date} />}
                            keyExtractor={item => item._id}
                        /> : <ActivityIndicator size="large" color={themecolor.blue} />}
                    </View>

                </View>

         

        </SafeAreaView >
    );
}

const ExamNewsBox = ({ index, ptags, date }) => {
    var bgbox1;

    if (index % 2 == 1) {
        bgbox1 = '#d9d9d9'
    } else {
        bgbox1 = '#88bcf7'
    }
    return (
        <View style={{
            marginVertical: 3,
            marginHorizontal: 20,
            padding: 5,
            paddingTop: 0,
            // flexDirection:'row',
            backgroundColor: bgbox1,
            alignItems: 'center',
            borderRadius: 5
        }}  >


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 35,
                borderBottomEndRadius: 5,
                borderBottomStartRadius: 5,
                padding: 10
            }}>
                <Text style={{
                    color: '#fff'
                }}>{(ptags[0].ptext)}</Text>

            </View>
            <View style={{
                padding: 5,
            }}>
                {ptags.map((ptag, index) => (ptag.atags.length !== 0) ?
                    <Ptagcustom key={index} ptext={null} atags={ptag.atags} />
                    : <Ptagcustom key={index} ptext={null} atags={[{
                        "atext": "Please Visit Original Site",
                        "link": "https://www.gtu.ac.in/exam.aspx"
                    }]} />
                )}


            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    }
});
export default ExamNews;
