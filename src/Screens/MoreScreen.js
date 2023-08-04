
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import QuestionPaperBox from '../Components/QuestionPaperBoxComponent';
import AllTheBest from '../Components/AllTheBestComponent';
import SearchResultBook from '../Components/SearchResultBookComponent';
import SyllabusBox from '../Components/SyllabusBoxComponent';
import ScrollHor from '../Components/ScrollHor';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ThemeContext} from "../";

function LibraryScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const themecolor = useContext(ThemeContext);

    return (


        <SafeAreaView style={{ flex: 1, paddingTop: 35, backgroundColor: themecolor.bgsecondary }} >

            <View style={{
                backgroundColor: "black",
                flexDirection: 'row',
                paddingVertical: 13,
                paddingHorizontal: 20,
                alignItems: 'center',
                // justifyContent: 'space-between',
                borderBottomColor: '#a6a6a6',
                borderBottomWidth: 1

            }}>
                {/* <View style={{ flexDirection: 'row' }}> */}
                <Feather size={25} name="list" style={{
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0F65CA'
                }} />
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    fontSize: 20,
                    marginLeft: 20,
                    color: '#000'
                }}>Mre</Text>
                {/* </View> */}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                }}>

                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F65CA' }}>Genrel</Text>
                        <View style={{
                            marginVertical: 5
                        }}>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Set reminder to read</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Select a time for read</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F65CA' }}>Share</Text>
                        <View style={{
                            marginVertical: 5
                        }}>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Share App</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Make your friends read</Text>
                            </View>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Rate App</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Support us by rate us 5 star</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F65CA' }}>Help & Feedback</Text>
                        <View style={{
                            marginVertical: 5
                        }}>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Feedback</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Your feedback and suggesions are welcomed by BookOcean</Text>
                            </View>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Report a bug</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Report bug to improve app</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F65CA' }}>About</Text>
                        <View style={{
                            marginVertical: 5
                        }}>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Privacy policy</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Read the privacy policy</Text>
                            </View>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Terms of use</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Read the terms of use</Text>
                            </View>
                            <View style={{
                                marginVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>About app</Text>
                                <Text style={{ fontSize: 13, color: '#4d4d4d' }}>Read about app</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 25,
                    marginBottom: 25,
                    fontWeight: 'bold',
                    color: '#0F65CA'
                }}>BookOcean</Text>



            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});
export default LibraryScreen;