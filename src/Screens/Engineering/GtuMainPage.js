import React, { useEffect, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { TouchableNativeFeedback, Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { NativeRouter, BackButton, Route, Link } from "react-router-native";
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import GTUMainSearch from './GtuMainSearchResultPage';
import { useNavigation } from '@react-navigation/core';
import { ThemeContext } from '../..';


const GTURouter = () => {
    const themecolor = useContext(ThemeContext);

    return (
        <NativeRouter>
            <BackButton>
                <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >

                    <GTUHeader />
                    <Route exact path="/" component={GTUmainScreen} />
                    <Route path="/mainsearchresult" component={GTUMainSearch} />
                    {/* <Route path="/topics" component={Topics} /> */}
                </SafeAreaView>
            </BackButton>
        </NativeRouter>
    )

}

const GTUHeader = () => {
    const themecolor = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()


    return (
        <View>
            <View style={{
                backgroundColor: themecolor.bgcolor,
                flexDirection: 'row',
                paddingHorizontal: 13,
                paddingVertical: 13,
                height: 55,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomColor: themecolor.fontsecondary,
                borderBottomWidth: 1

            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ borderRadius: 50 }}>

                         <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
 onPress={() => navigation.goBack()}>
                            <View style={{ padding: 2 }}>
                                <Feather size={23} name="arrow-left" style={{
                                    // backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: themecolor.blue
                                }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                        fontSize: 20,
                        marginLeft: 17,
                        color:themecolor.fontprimary
                    }}>Engineering</Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        backgroundColor: '#000000',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        opacity: 0.2
                    }} />

                    <View style={{
                        width: '90%',
                        backgroundColor: 'white',
                        marginTop: 80,
                        marginLeft: '5%',
                        borderRadius: 10,
                        // borderWidth: 1,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: '100%',
                            height: '100%'
                        },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                        elevation: 600
                    }}>
                        <View style={{
                            margin: 20
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: 7
                            }}>

                                <Text style={{ fontFamily: styles.baseText.fontFamily, }}> <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Profile</Text></Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 10
                            }}>
                                <Image resizeMode={"stretch"} style={{
                                    height: 45,
                                    width: 45,
                                }} source={require("../../../assets/images/AccountLogo.png")} />
                                <View>
                                    <TextInput placeholderTextColor="#A9A9A9" style={{
                                        fontFamily: styles.baseText.fontFamily,
                                        color:"black",
                                        backgroundColor: 'white',
                                        width: '100%',
                                        fontSize: 16,
                                        borderBottomColor: '#808080',
                                        borderBottomWidth: 1,
                                        marginLeft: 7

                                    }} placeholder={'Enter your Enrollment Number'} />
                                    <TextInput placeholderTextColor="#A9A9A9" style={{
                                        fontFamily: styles.baseText.fontFamily,
                                        color:"black",
                                        marginTop: 10,
                                        backgroundColor: 'white',
                                        fontSize: 16,
                                        borderBottomColor: '#808080',
                                        borderBottomWidth: 1,
                                        marginLeft: 7

                                    }} placeholder={'Enter your Sem'} />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#808080'
                        }} />
                        <View style={{
                            marginHorizontal: 20,
                            marginVertical: 10
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '70%',
                                marginVertical: 2.5
                            }}>
                                <Text style={{ fontFamily: styles.baseText.fontFamily, }} >  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Branch :  </Text></Text>


                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: styles.baseText.fontFamily,
                                }}>Information Technolology</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                width: '70%', marginVertical: 2.5
                            }}>
                                <Text style={{ fontFamily: styles.baseText.fontFamily, }} > <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Collage :  </Text></Text>
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: styles.baseText.fontFamily,

                                }}>Sarvajanik College of Engineering and Technology</Text>
                            </View>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#808080'
                        }} />

                        <View style={{
                            flexDirection: 'row',
                            width: '75%',
                            marginVertical: 10,
                            marginHorizontal: 20
                        }}>

                            <Text style={{ fontFamily: styles.baseText.fontFamily, }} >  <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Note* :  </Text></Text>
                            <Text style={{
                                fontSize: 11,
                                fontFamily: styles.baseText.fontFamily,

                            }}>Syllabus, GTU Question Paper, GTU Books will show you as per your Branch and Sem</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginVertical: 20,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}>

                                <Text style={{
                                    color:  themecolor.blue,
                                    fontSize: 16,
                                    fontFamily: styles.baseText.fontFamily,

                                }}>Skip for now</Text>
                            </Pressable>
                            <View style={{
                                backgroundColor:  themecolor.blue,
                                paddingVertical: 7,
                                paddingHorizontal: 15,
                                borderRadius: 5
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    fontFamily: styles.baseText.fontFamily,

                                }}>Save</Text>
                            </View>
                        </View>

                    </View>
                </Modal>
                {/* <Pressable
                    // onPress={() => setModalVisible(true)}
                    onPress={() => { alert('You will surely enjoy this feature in next update.'); }}
                >
                    <Image resizeMode={"stretch"} style={{
                        height: 30,
                        width: 30,
                    }} source={require("../../../assets/images/AccountLogo.png")} />
                </Pressable> */}
            </View>
            <View style={{
                // backgroundColor: 'yellow',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 17,
                paddingHorizontal: 20,
                justifyContent: 'space-between'
            }}> 
                <View style={{
                    // backgroundColor:'red'
                }}>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        fontSize: 25,
                        color:themecolor.fontprimary
                    }}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>
                            GTU
                        </Text>
                    </Text>

                    <Text style={{
                        color: themecolor.fontsecondary,
                    }}>
                        Gujarat Technological University
                    </Text>
                </View>

                <Image resizeMode={"stretch"} style={{
                    height: 50,
                    width: 40,
                }} source={require("../../../assets/images/GTU.png")} />
            </View>
            <View style={{
                borderBottomColor: themecolor.gray  ,
                borderBottomWidth: 1,
                marginHorizontal: 20,

            }} />
        </View>
    )
}

function GTUmainScreen() {
    const themecolor = useContext(ThemeContext);

    const [subcode, setsubcode] = useState()
    const navigation = useNavigation()

    const openLinkHandler = (url) => {
        let options = {
            toolbarColor: themecolor.blue,
            enableUrlBarHiding: false,
            showPageTitle: true,
            enableDefaultShare: true,
            animations: ANIMATIONS_SLIDE,
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url,options).then((launched) => {
            console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }
    // useEffect(() => {
    //     setModalVisible(true);
    // },[]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                // backgroundColor: 'red',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    color: themecolor.blue,
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.normalText.letterSpacing,
                    marginBottom: 7
                }}>
                    Search subject code for Syllabus, GTU Question Paper and Books...
            </Text>
                <View style={{

                    backgroundColor: themecolor.bgsecondary,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    height: 45,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,

                    elevation: 5,
                }}>

                    <TextInput placeholderTextColor={themecolor.fontsecondary} style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                        backgroundColor: themecolor.bgsecondary,
                        color:themecolor.fontprimary,
                        width: '85%',
                        fontSize: 17,
                        borderRadius: 5,

                    }} keyboardType="numeric" maxLength={7} onChangeText={(text) => setsubcode(text)} placeholder={'Search subject code here'} />



                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 5
                    }}>
                     {/* <TouchableNativeFeedback  background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
 onPress={() =>console.log("Pressed")}> */}
                        <Link to={{
                            pathname: "/mainsearchresult",
                            search: "?subcode=" + subcode
                        }} activeOpacity={0.3} component={TouchableOpacity}
 >
                            <View style={{padding:4}}>
                                <Fontisto size={18} name="search" style={{
                                    alignItems: 'center',
                                    color: themecolor.blue
                                }} />
                            </View>
                        </Link>
                        {/* </TouchableNativeFeedback> */}
                    </View>
                </View>
            </View>

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
                        color:themecolor.fontprimary
                    }}>
                        Study
                    </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Syllabus")} >
                        <View style={{
                            backgroundColor: themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Subject Syllabus</Text>
                        </View>
                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Papers")} >
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Question Paper</Text>
                        </View>
                    </TouchableNativeFeedback>

                    {/*  <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("GTUBooks")} >
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 100

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>GTU Books</Text>
                        </View>
                    </TouchableNativeFeedback> */}

                </View>
            </View>

            <View style={{
                borderBottomColor:  themecolor.gray,
                borderBottomWidth: 1,
                marginHorizontal: 25,

            }} />

            <View style={{
                // backgroundColor: 'red',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    fontSize: 22,
                    color : themecolor.fontprimary

                }}>

                    <Text style={{
                        fontWeight: 'bold',
                    }}>
                        Evalution
                    </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    flexWrap: 'wrap',
                }}>
                    {/* https://www.gturesults.in/ */}
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler('https://www.gturesults.in/')}>
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 155,
                            marginBottom: 10

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Result</Text>
                        </View>

                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler("https://www.me.gtu.ac.in/student/Studentmarkdisplay.aspx")}>
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 155,
                            marginBottom: 10

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Internal / Mid Mark</Text>
                        </View>
                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler("https://www.students.gtu.ac.in/Default.aspx")}>
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 155,
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Grade History</Text>
                        </View>
                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Calculator")}>

                        <View style={{
                            backgroundColor: themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 155
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>Percentage Calculator</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <View style={{
                borderBottomColor:  themecolor.gray,
                borderBottomWidth: 1,
                marginHorizontal: 25,

            }} />
            <View style={{
                // backgroundColor: 'red',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    fontSize: 22,
                    color : themecolor.fontprimary

                }}>

                    <Text style={{
                        fontWeight: 'bold'
                    }}>
                        Exam Related
                    </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("ExamNews")}>

                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Exam News
                                </Text>
                        </View>
                    </TouchableNativeFeedback>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Timetable")}>
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Exam Timetable
                                </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>

            <View style={{
                borderBottomColor:  themecolor.gray,
                borderBottomWidth: 1,
                marginHorizontal: 25,

            }} />
            <View style={{
                // backgroundColor: 'red',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    fontSize: 22,
                    color : themecolor.fontprimary
                }}>

                    <Text style={{
                        fontWeight: 'bold'
                    }}>
                        Information
                    </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Circular")}>

                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 100

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Circular
                                </Text>
                        </View>
                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => navigation.navigate("Calender")}>


                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 100
                        }}>

                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Academic Calender
                                </Text>
                        </View>
                    </TouchableNativeFeedback>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler("https://www.gtu.ac.in/StudentCorner.aspx")}>


                   
                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            width: 100

                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Student Corner
                                </Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </View>

            <View style={{
                borderBottomColor:  themecolor.gray,
                borderBottomWidth: 1,
                marginHorizontal: 25,
            }} />
            <View style={{
                // backgroundColor: 'red',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    fontSize: 22,
                    color : themecolor.fontprimary

                }}>

                    <Text style={{
                        fontWeight: 'bold',
                    }}>
                        GTU LogIn
                    </Text>
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    flexWrap: 'wrap',
                }}>

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler("http://student.gtu.ac.in/Login.aspx")}>

                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                Student Portal
                                </Text>
                        </View>
                    </TouchableNativeFeedback>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler("https://www.100points.gtu.ac.in/")}>


                        <View style={{
                            backgroundColor:  themecolor.blue,
                            borderRadius: 5,
                            justifyContent: 'center',
                            padding: 13,
                            height: 66,
                            width: 155,
                        }}>
                            <Text style={{
                                // fontFamily: styles.baseText.fontFamily,
                                fontSize: 16,
                                color: 'white'
                            }}>
                                100 Point Activity
                                </Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </View>
            <View style={{
                borderBottomColor:  themecolor.gray,
                borderBottomWidth: 1,
                marginHorizontal: 25,
            }} />
            <Text style={{
                fontFamily: styles.baseText.fontFamily,
                letterSpacing: styles.baseText.letterSpacing,
                alignSelf: 'center',
                marginVertical: 20,
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color:  themecolor.blue,
                }}>BookOcean <Text style={{color    : themecolor.fontprimary}}>| My</Text><Text style={{color:'red'}}>GTU</Text></Text>
            </Text>

        </ScrollView>

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

export default GTURouter;
export { GTUHeader };