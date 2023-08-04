import React, { useEffect, useState,useContext } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Animated, TouchableNativeFeedback, StyleSheet, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ScrollHor from '../../Components/ScrollHor';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SearchResultScreen from '../SearchResultScreen';
import ViewBookScreen from '../ViewBookScreen';
import SearchScreen from '../SearchScreen';
import {useSelector} from "react-redux"
import Category from './SearchSectionWithCategoryPage';
import GtuMainScreen from '../Engineering/GTUindex';
import FullBookDetail from './AboutBookFullPage';
import VerticalBookScroll from './BookShowcaseInSqurePage';
import { LOCAL_URL } from '../../../config';
import SplashScreen from 'react-native-splash-screen';
// import {  } from '@react-native-firebase/app';
import {ThemeContext} from "../../index";
const Stack = createStackNavigator();


function Home({themecolor}) {

    
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FrontScreen"  component={FrontScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
            <Stack.Screen name="category" component={Category} />
            <Stack.Screen name="GtuMainScreen" component={GtuMainScreen} />
            <Stack.Screen name="ViewBookScreen" component={ViewBookScreen} />
            <Stack.Screen name="FullBookDetail" component={FullBookDetail} />
            <Stack.Screen name="VerticalBookScroll" component={VerticalBookScroll} />
        </Stack.Navigator>
    )
}

const FrontScreen = ({navigation}) => {
    const themecolor = useContext(ThemeContext)
 
    const [categories, setcategories] = useState()
    const [isInternet, setisInternet] = useState(true)

    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 55)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55]
    })

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {

                let catJson = await fetch(`${LOCAL_URL}/bookocean/categories`).then(res => res.json())
                .then(datas => { setcategories(datas); return datas});
                console.log(catJson);
               

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log("Something went wrong");
                    setisInternet(false);
                    throw error;
                }
            }

        };
        loadData();
        return () => {
            controller.abort();
        };
    }, []);




    return (
        <SafeAreaView style={{ flex: 1 }} >
            <StatusBar
                animated={true}
                backgroundColor={themecolor.bgcolor}
                barStyle={(themecolor.bgcolor==="#ffffff")?'dark-content':"light-content"}
            />
            {/* <Text>Hello</Text> */}
            <View style={{
                // color:'white',
                flex: 1,
                backgroundColor: themecolor.bgcolor,
            }}>
                <View style={{ flex: 1 }}>
                    <Animated.View style={{
                        transform: [
                            { translateY: translateY }
                        ],
                        height: 55,
                        elevation: 4,
                        zIndex: 100
                    }}>
                        <View style={{
                            // borderWidth: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0,
                        }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}

                                onPress={() => navigation.navigate('SearchScreen')}
                            >
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'space-between',
                                    backgroundColor: themecolor.bgsecondary,
                                    marginTop: 65,
                                    borderRadius: 7,
                                    alignItems: "center",
                                    paddingVertical: 3,
                                    paddingHorizontal: 20,
                                    width: '90%',
                                    height: 45,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 13,
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <Text style={{
                                        fontFamily: styles.baseText.fontFamily,
                                        letterSpacing: styles.normalText.letterSpacing,
                                        fontSize: 17,
                                        color: themecolor.fontsecondary
                                    }}>Search Books</Text>
                                    <View style={{
                                    }}>
                                        <Fontisto size={18} name="search" style={{
                                            color: themecolor.blue
                                        }} />
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    </Animated.View>
                </View>
                {/* //123 */}
                <ScrollView style={{}} showsVerticalScrollIndicator={false} onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}>

                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        marginTop: 85,
                        fontSize: 22,
                        color: themecolor.fontprimary,
                        marginBottom: 10,
                        marginHorizontal: 20,

                    }}>
                        <Text
                            style={{
                                //   marginHorizontal:20,
                                fontWeight: 'bold'
                            }}
                        >
                            Explore BookOcean
                    </Text>
                    </Text>
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                            paddingStart: 10,
                            paddingRight: 10,
                            // backgroundColor: 'cyan',
                            height: 80
                        }} style={{}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                onPress={() => navigation.navigate("category")}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: themecolor.fontsecondary,
                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 75, width: 75, marginLeft: 10 }} source={require("../../../assets/images/category.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,
                                            letterSpacing: styles.normalText.letterSpacing,
                                            fontSize: 15,
                                            color: themecolor.fontsecondary,
                                            paddingHorizontal: 10,
                                            fontWeight: "500",
                                        }}
                                    >
                                        Category
                     </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                onPress={() => navigation.navigate("GtuMainScreen")}>
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: themecolor.fontsecondary,

                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 65, width: 65, marginLeft: 10 }} source={require("../../../assets/images/engineering.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,
                                            letterSpacing: styles.normalText.letterSpacing,
                                            fontSize: 15,
                                            color: themecolor.fontsecondary,
                                            paddingHorizontal: 10,
                                            fontWeight: "500",

                                        }}
                                    >
                                        GTU
                     </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}

                                onPress={() => (categories) ? navigation.navigate("VerticalBookScroll", { bookids: categories[0].bookids, catname: "Trending" }) : null}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: themecolor.fontsecondary,

                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 55, width: 55, marginLeft: 10 }} source={require("../../../assets/images/toppicks.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,
                                            letterSpacing: styles.normalText.letterSpacing,
                                            fontSize: 15,
                                            color: themecolor.fontsecondary,
                                            paddingHorizontal: 10,
                                            fontWeight: "500",
                                        }}
                                    >
                                        Trending
                     </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </ScrollView>
                    </View>

                    {(!isInternet) ? <View style={{ height: 500, }} >
                        <Image resizeMode='contain' source={require('../../../assets/images/noInternet.png')} style={{marginTop:50, height: 330, width: 330, backgroundColor: themecolor.bgcolor , alignSelf: 'center' }} />
                    </View>
                        : categories?.map((category) =>
                                     <ScrollHor key={category._id} catdata={category}  /> 
                        )
                    }


                    <View style={{
                        height: 30
                    }}>

                    </View>
                </ScrollView>

            </View>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Roboto',
        letterSpacing: 0.8
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default Home;
