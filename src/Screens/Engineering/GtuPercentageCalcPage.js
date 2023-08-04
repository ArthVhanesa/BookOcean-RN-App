
import React, { memo, Component, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { GTUHeader } from '../Engineering/GtuMainPage';
import {ThemeContext} from "../../index"


function Calculator() {
    const themecolor = useContext(ThemeContext);

    const [input, setinput] = useState("")

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    // backgroundColor: 'red',
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
                            Percentage Calculator
                    </Text>
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: 20,
                }}>



                    <TextInput placeholderTextColor={themecolor.fontsecondary} keyboardType="numeric" maxLength={4} onChangeText={(text) => setinput(text)} style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing:styles.normalText.letterSpacing,
                        backgroundColor: themecolor.bgcolor,
                        color:themecolor.fontprimary,
                        borderBottomWidth: 1.5,
                        borderBottomColor:themecolor.fontsecondary,
                        fontSize: 16,

                    }} placeholder={'Enter your SPI / CPI / CGPA'} />
                    {(input>10 || input<0)?<Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing:styles.normalText.letterSpacing,
                        color: 'red',

                    }}>
                        SPI / CPI / CGPA must be less than or equal to 10
                         </Text>:null}

                </View>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 45,
                        // fontSize: 65,
                        color: themecolor.blue,
                        fontWeight: 'bold',
                        padding: 10
                    }}> {(input !== "" && input<=10 && input>0) ? ((input - 0.5) * 10).toFixed(2) : ""}%
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal: 20,
                }}>


                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                    }}>
                        <Text style={{
                            color: themecolor.blue,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}>
                            Description
                    </Text>
                    </Text>
                    <View style={{
                        backgroundColor: themecolor.bgcolor,
                        borderBottomWidth: 2,
                        borderBottomColor: themecolor.gray,
                    }} />
                    <View style={{
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color:themecolor.fontprimary

                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>SPI :</Text> Semester Performance Index
                    </Text>
                        <Text style={{
                            fontSize: 17,
                            color:themecolor.fontprimary
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>CPI :</Text> Cumulative Performance Index
                    </Text>
                        <Text style={{
                            fontSize: 17,
                            color:themecolor.fontprimary
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>CGPA :</Text> Cumulative Grade Point Average
                    </Text>


                    </View>
                    <View style={{
                        marginVertical: 35
                    }}>
                        <Text style={{
                            fontSize: 17,
                            marginVertical: 10,
                            textAlign: 'justify',
                        color:themecolor.fontprimary

                        }}>
                            If duration of course is of 2 years, the degree shall be given to students based upon <Text style={{ fontWeight: 'bold' }}>CPI (Cumulative Performance Index)</Text> considering all the four semesters performance.
                    </Text>

                        <Text style={{
                            fontSize: 17,
                            marginVertical: 10,
                            textAlign: 'justify',
                        color:themecolor.fontprimary
                        }}>
                            If duration of course is of 4 years, the degree shall be given to students based upon <Text style={{ fontWeight: 'bold' }}>CGPA (Cumulative Grade Point Average)</Text> considering last four semesters performance.
                    </Text>
                    </View>


                </View>

            </ScrollView>

        </SafeAreaView >
    );
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
export default Calculator;
