import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Feather from 'react-native-vector-icons/Feather';
import ScrollHor from '../../Components/ScrollHor';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SearchResultScreen from '../SearchResultScreen';
import ViewBookScreen from '../ViewBookScreen';
import SearchScreen from '../SearchScreen';
import Category from './SearchSectionWithCategoryPage';
import FullBookDetail from './AboutBookFullPage';
import VerticalBookScroll from './BookShowcaseInSqurePage';
import { LOCAL_URL } from '../../../config';

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FrontScreen" component={FrontScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
            <Stack.Screen name="category" component={Category} />
            <Stack.Screen name="ViewBookScreen" component={ViewBookScreen} />
            <Stack.Screen name="FullBookDetail" component={FullBookDetail} />
            <Stack.Screen name="VerticalBookScroll" component={VerticalBookScroll} />
        </Stack.Navigator>

    )
}



const FrontScreen = ({ navigation }) => {

    const [categories, setcategories] = useState()

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                let catJson = await fetch(`${LOCAL_URL}/bookocean/categories`).then(res => res.json()).then(datas => datas);
                console.log(catJson);
                setcategories(catJson)

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
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
        <SafeAreaView style={{ flex: 1, paddingTop: 0 }} >

            {/* <Text>Hello</Text> */}
            <View style={{
                // color:'white',
                flex: 1,
                backgroundColor: 'white',

            }}>

                <View style={{
                    // borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // paddingBottom: 10,
                    height: 0
                }}>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
 onPress={() => navigation.navigate('SearchScreen')} >

                        <View style={{
                            flexDirection: "row",
                            backgroundColor: "#FFF",
                            marginTop: 50,

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
                            <View style={{
                                position: 'absolute',
                                right: 15,
                                // top: 12
                                paddingVertical: 10

                            }}>
                                <Feather size={25} name="search" style={{
                                    color: '#0F65CA'
                                }}></Feather>
                            </View>
                            <Text>Search Books</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
                {/* //123 */}
                <ScrollView>

                    <Text
                        style={{
                            fontFamily: styles.baseText.fontFamily,
                            fontSize: 20,
                            color: 'black',
                            marginTop: 20,
                            marginBottom: 10,
                            marginHorizontal: 20,
                            //   marginHorizontal:20,
                            fontWeight: 'bold'
                        }}
                    >
                        Explore BookOcean
                    </Text>
                    <View>
                        <ScrollView horizontal contentContainerStyle={{
                            paddingStart: 10,
                            paddingRight: 10,
                            // backgroundColor: 'cyan',
                            height: 80
                        }} style={{


                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate("category")}>
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: 'rgba(51, 51, 51, 0.63)',
                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 75, width: 75, marginLeft: 10 }} source={require("../../../assets/images/category.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,

                                            fontSize: 15,
                                            color: 'black',
                                            paddingHorizontal: 10,
                                            fontWeight: "500",
                                            color: '#333333',


                                        }}
                                    >
                                        Category
                     </Text>
                                </View>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => navigation.navigate("Engineering")}>
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: 'rgba(51, 51, 51, 0.63)',

                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 65, width: 65, marginLeft: 10 }} source={require("../../../assets/images/engineering.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,

                                            fontSize: 15,
                                            color: 'black',
                                            paddingHorizontal: 10,
                                            fontWeight: "500",
                                            color: '#333333'

                                        }}
                                    >
                                        Engineering
                     </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>(categories)? navigation.navigate("VerticalBookScroll", { bookids: categories[0].bookids,catname:"Trending" }):null}>
                                <View style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 3,
                                    borderColor: 'rgba(51, 51, 51, 0.63)',

                                    height: 80,
                                    marginHorizontal: 10,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}>

                                    <Image style={{ height: 55, width: 55, marginLeft: 10 }} source={require("../../../assets/images/toppicks.png")} />
                                    <Text
                                        style={{
                                            fontFamily: styles.baseText.fontFamily,

                                            fontSize: 15,
                                            color: 'black',
                                            paddingHorizontal: 10,
                                            fontWeight: "500",
                                            color: '#333333',

                                        }}
                                    >
                                        Trending
                     </Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    {
                        categories?.map((category) => <ScrollHor key={category._id} catdata={category} />)
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


const styles = EStyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});

export default Home;
