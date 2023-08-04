
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, StyleSheet, View, Text, Image, ActivityIndicator, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, TouchableNativeFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import QuestionPaperBox from '../../Components/QuestionPaperBoxComponent';
import AllTheBest from '../../Components/AllTheBestComponent';
import { GTUHeader } from '../Engineering/GtuMainPage';
import {ThemeContext} from "../../index"
import { LOCAL_URL } from '../../../config';

function QpapersScreen() {
    const themecolor = useContext(ThemeContext);

    const [subcode, setsubcode] = useState("")
    const [papers, setpapers] = useState()
    const [loading, setloading] = useState()

    async function searchhandler() {
        // console.log(subcode)
        setloading(true)
        try {
            let result = await fetch(LOCAL_URL+"/papers/" + subcode).then(res => res.json()).then(data => data)
            // console.log(result.length);
            setpapers(result);
            setloading(false)

        } catch (error) {
            console.log("e:" + error)
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
                            color: themecolor.fontprimary
                        }}>
                            Question Paper
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
                        borderBottomWidth: 1,
                        borderBottomColor: themecolor.gray,
                        width: '70%'
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
                                fontFamily: styles.baseText.fontFamily,
                                letterSpacing: styles.normalText.letterSpacing,
                                color: 'white',
                                fontSize: 17
                            }}>Search</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <Text style={{alignSelf:'center',fontSize:15,color:'#0F65CA'}}>{(!loading && papers?.length === 0) ? "Data Not Found" : null}</Text>
                {(loading) ? <ActivityIndicator style={{ flex: 1 }} size="large" color={themecolor.blue} /> : null}

                {papers?.map(paper => <QuestionPaperBox key={paper._id} paper={paper} />)}


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
export default QpapersScreen;
