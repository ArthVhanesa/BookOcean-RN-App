
import React, { memo, useState, useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, Share, TouchableNativeFeedback, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, Touchable, Linking, Switch, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NativeRouter, Route, Link, BackButton } from "react-router-native";
import AboutApp from './AboutAppPage';
import PrivacyPolicy from './PrivacyPolicyPage';
import TermsOfUse from './TermsOfUsePage';
import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { configuretheme } from '../../../redux/actions';
import { ThemeContext } from '../..';

const MoreIndex = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <NativeRouter>
                <BackButton>
                    <Route exact path="/" component={MoreScreen} />
                    <Route path="/about" component={AboutApp} />
                    <Route path="/privacy" component={PrivacyPolicy} />
                    <Route path="/use" component={TermsOfUse} />
                </BackButton>
            </NativeRouter>
        </SafeAreaView >
    )

}

function MoreScreen() {
    const themecolor = useContext(ThemeContext);


    // const [modalVisible, setModalVisible] = useState(false);
    // const [color, setcolor] = useState((themecolor.bgcolor === "#192734") ? "dark" : false);
    const dispatch = useDispatch();
    const changetheme = (theme) => dispatch(configuretheme(theme));

    // const toggleSwitch = () => {
    //     setIsEnabled(previousState => !previousState);
    //     if (!isEnabled) {
    //         // AsyncStorage.setItem("THEME", "dark")
    //         changetheme("dark");
    //     } else {
    //         // AsyncStorage.setItem("THEME", "light")
    //         changetheme("light")
    //     }

    // }

    function settheme(color) {
        changetheme(color);
    }

    const rateHandler = async () => {
        Linking.openURL("https://play.google.com/store/apps/details?id=com.bookocean")
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Let`s read on BookOcean!\nI am reading my favourite book on BookOcean App.\nIt`s a largest free digital library with 4.6 million+ books.\n\nGet it at https://bookoceanapp.page.link/share',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (<>
        {/* <Header/> */}
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
            <Feather size={23} name="list" style={{
                // backgroundColor: 'red',
                justifyContent: 'center',
                padding: 2,
                alignItems: 'center',
                color: themecolor.blue
            }} />
            <Text style={{
                fontFamily: styles.baseText.fontFamily,
                letterSpacing: styles.normalText.letterSpacing,
                fontSize: 20,
                marginLeft: 17,
                color: themecolor.fontprimary
            }}>More</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: themecolor.bgcolor }} >

            <View style={{
                marginVertical: 13,
                // backgroundColor:themecolor.bgcolor
            }}>
                <View style={{ marginVertical: 5 }}>

                    <Text style={{
                        fontSize: 16,
                        color: themecolor.blue,
                        paddingHorizontal: styles.baseText.paddingHorizontal,
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Theme</Text>
                    </Text>
                    <View style={{
                        marginVertical: 5
                    }}>

                        <View style={{
                            flex: 1,
                            paddingTop:8,
                            flexDirection: 'row',
                            justifyContent: "space-evenly"
                        }}>
                            <TouchableWithoutFeedback onPress={()=>settheme("light")} >
                                <View style={{
                                    backgroundColor: "white",
                                    height: 50,
                                    width: 50,
                                    borderColor: themecolor.blue,
                                    borderWidth: (themecolor.bgcolor==="#ffffff")?3:0,
                                    borderRadius: 50,
                                }} />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={()=>settheme("dark")} >

                                <View style={{
                                    backgroundColor: "#253341",
                                    height: 50,
                                    width: 50,
                                    borderColor: themecolor.blue,
                                    borderWidth: (themecolor.bgcolor==="#111a22")?3:0,
                                    borderRadius: 50,
                                }} />
                            </TouchableWithoutFeedback >

                            <TouchableWithoutFeedback onPress={()=>settheme("amoled")} >

                                <View style={{
                                    backgroundColor: "black",
                                    height: 50,
                                    width: 50,
                                    borderColor: themecolor.blue,
                                    borderWidth: (themecolor.bgcolor==="#000000")?3:0,
                                    borderRadius: 50,
                                }} />

                            </TouchableWithoutFeedback >


                            {/* <Switch
                                trackColor={{ false: "#767577", true: "#f5faff" }}
                                thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                       
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            /> */}
                        </View>


                    </View>
                </View>
                <View style={{ marginVertical: 5 }}>

                    <Text style={{
                        fontSize: 16,
                        color: themecolor.blue,
                        paddingHorizontal: styles.baseText.paddingHorizontal,
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Share</Text>
                    </Text>
                    <View style={{
                        marginVertical: 5
                    }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                            onPress={onShare}>
                            <View style={{
                                paddingVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Share App</Text>
                                <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Make your friends read</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                            onPress={rateHandler}
                        >
                            <View style={{
                                paddingVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Rate App</Text>
                                <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Support us by rate us 5 star</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        color: themecolor.blue,
                        paddingHorizontal: styles.baseText.paddingHorizontal,
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Help & Feedback</Text>
                    </Text>
                    <View style={{
                        marginVertical: 5
                    }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                            onPress={() => Linking.openURL("mailto:contact.bookocean@gmail.com?subject=Feedback/Suggestion&body=Type here your valuable feedback.\n\nYour suggestions and feedbacks are welcomed by Team BookOcean.\n\nThank you")} >
                            <View style={{
                                paddingVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Feedback</Text>
                                <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Your feedback and suggesions are welcomed by BookOcean</Text>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                            onPress={() => Linking.openURL("mailto:contact.bookocean@gmail.com?subject=Bug Report&body=We are ready to improve App with help of your bug report.\n\nThank you")} >
                            <View style={{
                                paddingVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Report a bug</Text>
                                <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Report bug to improve app</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Text style={{
                        fontSize: 16,
                        color: themecolor.blue,
                        paddingHorizontal: styles.baseText.paddingHorizontal,
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>About</Text>
                    </Text>
                    <View style={{
                        marginVertical: 5
                    }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                        >
                            <Link to="/privacy" component={TouchableNativeFeedback}>

                                <View style={{
                                    paddingVertical: 8
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Privacy policy</Text>
                                    <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Read the privacy policy</Text>
                                </View>
                            </Link>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                        >
                            <Link to="/use" component={TouchableNativeFeedback}>
                                <View style={{
                                    paddingVertical: 8
                                }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>Terms of use</Text>
                                    <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Read the terms of use</Text>
                                </View>
                            </Link>
                        </TouchableNativeFeedback>
                        <Link to="/about" component={TouchableNativeFeedback}>
                            <View style={{
                                paddingVertical: 8
                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontprimary }}>About app</Text>
                                <Text style={{ fontSize: 13, paddingHorizontal: styles.baseText.paddingHorizontal, color: themecolor.fontsecondary }}>Read about app</Text>
                            </View>
                        </Link>
                    </View>
                </View>
            </View>

            <Text style={{
                fontFamily: styles.baseText.fontFamily,
                letterSpacing: styles.baseText.letterSpacing,
                alignSelf: 'center',
                fontSize: 25,
                marginBottom: 25,
                color: themecolor.blue
            }}>
                <Text style={{
                    fontWeight: 'bold',
                }}>BookOcean
                </Text>
            </Text>



        </ScrollView>
    </>
    );
}



const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8,
        paddingHorizontal: 20
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default MoreIndex