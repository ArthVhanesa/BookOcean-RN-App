
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, TouchableNativeFeedback, TouchableWithoutFeedback, Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import { Link } from "react-router-native";
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../..';

const VERSION_CODE="2.1.3";


function AboutApp({ navigation }) {
    const themecolor = useContext(ThemeContext);
    
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: themecolor.bgcolor }} >

            <View style={{
                backgroundColor: themecolor.bgcolor,
                flexDirection: 'row',
                paddingHorizontal: 13,
                paddingVertical: 13,
                height: 55,
                alignItems: 'center',
                borderBottomColor: themecolor.fontsecondary,
                borderBottomWidth: 1
            }}>
                <Link to="/" component={TouchableNativeFeedback}
                >
                    <View style={{ padding: 2 }}>
                        <Feather size={23} name="arrow-left" style={{
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: themecolor.blue
                        }} />
                    </View>
                </Link>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.normalText.letterSpacing,
                    fontSize: 20,
                    marginLeft: 17,
                    color:themecolor.fontprimary
                }}>About app</Text>
            </View>
            <View style={{
                // backgroundColor: 'yellow',
                height: 1000
            }}>

                <View style={{
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    // height:'100%'

                    // backgroundColor: 'red'
                }}>
                    <View style={{
                        marginTop: 50,
                        // width: 100,
                        // backgroundColor:'red',
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.39,
                        shadowRadius: 8.30,

                        elevation: 10,
                    }}>
                        <Image style={{
                            height: 100,
                            width: 100,
                            borderRadius: 10
                        }} source={require("../../../assets/images/BookOcean1.jpeg")} />
                    </View>

                </View>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.normalText.letterSpacing,
                    alignSelf: 'center',
                    fontSize: 25,
                    color:themecolor.fontprimary
                    // marginBottom: 10
                }}>BookOcean</Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color:themecolor.fontprimary
                }}>Version {VERSION_CODE}</Text>
                <Text style={{
                    marginTop: 12,
                    alignSelf: 'center',
                    fontSize: 13,
                    color:themecolor.fontsecondary
                }}>Copyright © 2021 BookOcean</Text>
                <View style={{
                    borderBottomWidth: 1,
                    borderColor: themecolor.gray,
                    width: '85%',
                    alignSelf: 'center',
                    marginVertical: 7
                }} />
                <Text style={{
                    marginVertical: 2,
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 14,
                    color:themecolor.fontprimary,
                    width: '70%'
                }}>App for downloading free ebooks from LibGen{'\n'}GTU Info - Providing bridge beween University and Students</Text>
                <View style={{
                    borderBottomWidth: 1,
                    borderColor: themecolor.gray,
                    width: '85%',
                    alignSelf: 'center',
                    marginVertical: 7
                }} />
            </View>
            <View style={{
                // backgroundColor: 'yellow',
                justifyContent: 'space-evenly',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 240

            }}>
                <View style={{
                    borderBottomWidth: 1,
                    borderColor: themecolor.gray,
                    width: '85%',
                    alignSelf: 'center',
                }} />
                <Text style={{
                    fontSize: 19,
                    marginHorizontal: 20,
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                }}>
                    <Text style={{ fontWeight: 'bold' ,color:themecolor.fontprimary}}>
                        Developed and maintained by
                        </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    // backgroundColor: 'red'
                }}>
                    <LdceITEngineer />
                    <ScetCSEngineer />
                </View>
            </View>

        </SafeAreaView >
    );
}


const LdceITEngineer = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const themecolor = useContext(ThemeContext);

    return (
        <Pressable
            onPress={() => setModalVisible(true)}>
            <View style={{
                alignItems: 'center',
                // backgroundColor: 'yellow'
            }}>
             
                <View style={{
                    width: 100,
                    // height:100,
                    // backgroundColor:'red',
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,

                    elevation: 10,
                }}>
                    <Image style={{
                        height: 100,
                        width: 100,
                        borderRadius: 10
                    }} source={require("../../../assets/images/LdceLogo.jpeg")} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 8 , color:themecolor.fontprimary}}>
                    LDCE{'\n'}IT Student
                            </Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={{
                    width: '100%',
                    height: '100%',
                }}>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View style={{
                            backgroundColor: '#000000',
                            height: '100%',
                            opacity: 0.2
                        }} />
                    </TouchableWithoutFeedback>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: themecolor.popup,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,

                    }}>
                        <View style={{
                            marginTop: 10,
                            left: '45%',
                            height: 6,
                            width: '10%',
                            borderRadius: 10,
                            backgroundColor: themecolor.gray
                        }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 30,
                            marginVertical: 15,
                            // backgroundColor:'red'
                        }}>
                            <View style={{
                                width: 100,
                                // height:100,
                                // backgroundColor:'red',
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.30,

                                elevation: 10,
                            }}>
                                <Image style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10
                                }} source={require("../../../assets/images/LdceLogo.jpeg")} />
                            </View>
                            <Text style={{
                                width: '60%',
                                fontSize: 20,
                                marginLeft: 15,
                                fontFamily: styles.baseText.fontFamily,
                                letterSpacing: styles.normalText.letterSpacing,
                                color:themecolor.fontprimary
                            }}>
                                Lalbhai Dalpatbhai College of Engineering{'\n'}Ahmedabad
                            </Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: themecolor.fontsecondary }} />

                        <View style={{
                            marginHorizontal: 26,
                            marginVertical: 15,
                            flexDirection: 'column',
                            // backgroundColor:'yellow'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                marginBottom: 8,
                                color:themecolor.fontprimary
                            }}>BookOcean</Text>

                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17, color:themecolor.fontprimary }}>BookOcean is the India`s largest free digital library and providing bridge between GTU University and GTU student.</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17, color:themecolor.fontprimary }}>This is one of the great initiative developed by 2 B.tech students.</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17 ,color:themecolor.fontprimary}}>One of those 2 developer is from<Text style={{ fontWeight: 'bold' }}> LDCE </Text>in<Text style={{ fontWeight: 'bold' }}> IT </Text>branch who designed and developed Front-End of this App for give exclusive user interface.</Text>
                            <Text style={{ marginTop: 8, textAlign: 'justify', fontSize: 18 ,color:themecolor.fontprimary}}>Happy Reading...</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', fontSize: 15, color:themecolor.fontprimary }}>- Team BookOcean</Text>

                        </View>
                    </View>
                </View>


            </Modal>
        </Pressable>
    )
}

const ScetCSEngineer = () => {
    const themecolor = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <Pressable
            onPress={() => setModalVisible(true)}>
            <View style={{
                alignItems: 'center',
                // backgroundColor: 'yellow'
            }}>
                <View style={{
                    width: 100,
                    // backgroundColor:'red',
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,

                    elevation: 10,
                }}>
                    <Image style={{
                        height: 100,
                        width: 100,
                        borderRadius: 10
                    }} source={require("../../../assets/images/ScetLogo.jpeg")} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 8, color:themecolor.fontprimary }}>
                    SCET{'\n'}CS Student</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={{
                    width: '100%',
                    height: '100%',
                }}>
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                        <View style={{
                            backgroundColor: '#000000',
                            height: '100%',
                            opacity: 0.2
                        }} />
                    </TouchableWithoutFeedback>
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: themecolor.popup,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,

                    }}>
                        <View style={{
                            marginTop: 10,
                            left: '45%',
                            height: 6,
                            width: '10%',
                            borderRadius: 10,
                            backgroundColor: '#999999'
                        }} />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 30,
                            marginVertical: 15,
                            // backgroundColor:'red'
                        }}>
                            <View style={{
                                width: 100,
                                // height:100,
                                // backgroundColor:'red',
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.30,

                                elevation: 10,
                            }}>
                                <Image style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10
                                }} source={require("../../../assets/images/ScetLogo.jpeg")} />
                            </View>
                            <Text style={{
                                width: '60%',
                                fontSize: 20,
                                marginLeft: 15,
                                fontFamily: styles.baseText.fontFamily,
                                letterSpacing: styles.normalText.letterSpacing,
                                color:themecolor.fontprimary
                            }}>
                                Sarvajanik College of Engineering and Technology{'\n'}Surat
                            </Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: '#bfbfbf' }} />

                        <View style={{
                            marginHorizontal: 26,
                            marginVertical: 15,
                            flexDirection: 'column',
                            // backgroundColor:'yellow'
                        }}>
                            <Text style={{
                                fontSize: 20,
                                marginBottom: 8,
                                color:themecolor.fontprimary
                            }}>BookOcean</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17, color:themecolor.fontprimary }}>BookOcean is the India`s largest free digital library and providing bridge between GTU University and GTU student.</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17, color:themecolor.fontprimary }}>This is one of the great initiative developed by 2 B.tech students.</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', lineHeight: 17, color:themecolor.fontprimary }}>One of those 2 developer is from<Text style={{ fontWeight: 'bold' }}> SCET </Text>in<Text style={{ fontWeight: 'bold' }}> CS </Text>branch who made this app running and live by developing strong Back-End.</Text>
                            <Text style={{ marginTop: 8, textAlign: 'justify', fontSize: 18 ,color:themecolor.fontprimary}}>Happy Reading...</Text>
                            <Text style={{ marginVertical: 5, textAlign: 'justify', fontSize: 15 ,color:themecolor.fontprimary}}>- Team BookOcean</Text>

                        </View>
                    </View>
                </View>


            </Modal>
        </Pressable>
    )
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
export default AboutApp;