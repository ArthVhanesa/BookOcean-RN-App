
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, ActivityIndicator, TextInput, TouchableNativeFeedback, Alert } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import SyllabusBox from '../../Components/SyllabusBoxComponent';
import AllTheBest from '../../Components/AllTheBestComponent';
import { GTUHeader } from '../Engineering/GtuMainPage';
import {ThemeContext} from "../../index"
import { LOCAL_URL } from '../../../config';

function GtuSyllabusScreen({ navigation }) {
    const themecolor = useContext(ThemeContext);

    const [loading, setloading] = useState(false)
    const [subcode, setsubcode] = useState("")
    const [syllabus, setsyllabus] = useState()

    async function searchhandler() {
        // console.log(subcode)
        setloading(true)
        try {
            let result = await fetch(LOCAL_URL+"/syllabus/BE/" + subcode).then(res => res.json()).then(data => data)
            // console.log(result);
            setsyllabus(result);
            // console.log(result);
            setloading(false)

        } catch (error) {
            console.log(error)
            Alert.alert("Server Error", "Please try again after some time.");
        }
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />

            <ScrollView>

                <View style={{
                    // backgroundColor: 'red',
                    paddingVertical: 17,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        fontSize: 22,
                    }}>

                        <Text style={{
                            fontWeight: 'bold',
                            color: themecolor.fontprimary,
                        }}>
                            Syllabus
                    </Text>
                    </Text>

                </View>
                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 25
                    // backgroundColor:'red'
                }}>


                    <TextInput placeholderTextColor={themecolor.fontsecondary} keyboardType="numeric" maxLength={7} onChangeText={(text) => setsubcode(text)} onSubmitEditing={searchhandler} style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                        backgroundColor: themecolor.bgcolor,
                        fontSize: 17,
                        color:themecolor.fontprimary,
                        borderBottomColor: themecolor.gray,
                        width: '70%',
                        borderBottomWidth: 1
                    }} placeholder={'Enter subject code'} />

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={searchhandler}>
                        <View style={{
                            backgroundColor: themecolor.blue,
                            paddingHorizontal: 13,
                            paddingVertical: 7,
                            borderRadius: 5
                        }}>
                            <Text style={{
                                color: 'white',
                                fontFamily: styles.baseText.fontFamily,
                                letterSpacing: styles.normalText.letterSpacing,
                                fontSize: 17
                            }}>Search</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Text style={{alignSelf:'center',fontSize:15,color:'#0F65CA'}}>{(!loading && syllabus === 404) ? "Data Not Found" : null}</Text>
                {(loading) ? <ActivityIndicator style={{ flex: 1 }} size="large" color={themecolor.blue} /> : null}
                {(syllabus && syllabus !== 404) ? (<View><SyllabusBox data={syllabus} />
                    {/* <Text style={{
                        marginHorizontal: 20,
                        fontSize: 17,
                        marginVertical: 15
                    }}>
                        You might be intrested in
                </Text> */}

                </View>) : null


                }

                <AllTheBest />

            </ScrollView>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    },
    normalText: {
        letterSpacing: 0.5
    }
});
export default GtuSyllabusScreen;
