import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useState, useEffect,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { TouchableWithoutFeedback, TouchableNativeFeedback, ImageBackground, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, Animated, PermissionsAndroid, TextInput, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import ScrollHor from '../Components/ScrollHor';
// import EStyleSheet from 'react-native-extended-stylesheet';
import { BASE_URL } from '../../../config/index'
import Poster from '../../../assets/images/poster.png';
import { ThemeContext } from '../../';

function VerticalBookScroll({ route }) {
    const navigation = useNavigation();
    const [datas, setdatas] = useState(null)
    const [loading, setloading] = useState(false)
    const themecolor = useContext(ThemeContext);

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let idArray = route.params?.bookids
                // console.log(idArray);
                let bookdata = await fetch(`${BASE_URL}/json.php?ids=${idArray.join(',')}&fields=Title,Author,coverurl,id`).then(res => res.json()).then(datas => datas);
                console.log("FetchCancel: got response");
                setdatas(bookdata)
                setloading(false)
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
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 55)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55]
    })
    const Header = () => {

        return (
            <View style={{flex:1}}>
                <Animated.View style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    height:55,
                    elevation: 4,
                    zIndex: 100
                }}>
                <View style={{
                    backgroundColor: themecolor.bgcolor,
                    flexDirection: 'row',
                    paddingHorizontal: 13,
                    paddingVertical: 13,
                    height: 55,
                    alignItems: 'center',
                    borderBottomColor: themecolor.fontsecondary,
                    borderBottomWidth: 1,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,

                }}>
                    <View style={{ borderRadius: 50 }}>

                         <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                    onPress={() => navigation.goBack()}>
                            <View style={{ padding: 2 }}>
                                <Feather size={23} name="arrow-left" style={{
                                    // backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color:themecolor.blue
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
                    }}>{route.params.catname}</Text>


                </View>
                </Animated.View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <Header />
            {(loading) ? <ActivityIndicator color={themecolor.blue} size='large' style={{ flex: 1,position:'absolute',top:0, height:'100%',width:'100%'  }} /> : (
                // <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{}}>
                    <FlatList     
                    style={{paddingTop:58}}              
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ width: '100%', paddingBottom:60 }}
                        numColumns={3}
                        data={datas}
                        renderItem={({ item }) => <BookCoverForSection data={item} />} onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }} />
           
                </View>

                // </ScrollView>
            )}
        </SafeAreaView >)
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    },
    normalText: {
        letterSpacing: 0.5
    }
});

const BookCoverForSection = ({ data }) => {

    const themecolor = useContext(ThemeContext);
    const navigation = useNavigation();
    // const [imageUri, setimageUri] = useState("http://library.lol/covers/" + data.coverurl )
    const currentRouteName = useCurrentRouteName();

    function useCurrentRouteName() {
        return useNavigationState(state =>
            state.routes[state.index]?.name
                ? state.routes[state.index].name
                : 'None'
        );
    }
    function onpressHandler() {
        if (currentRouteName === "ViewBookScreen") {
            navigation.replace("ViewBookScreen", { bookid: data.id })

        } else {
            navigation.push("ViewBookScreen", { bookid: data.id })
        }
        // console.log(currentRouteName)
    }
    return (

        <View style={{
            width: Dimensions.get('window').width / 3,
            alignItems: 'center'
        }}>
             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
 onPress={onpressHandler}>

                <View style={{
                    backgroundColor: themecolor.bgcolor,
                    marginHorizontal: 1,
                    width: 100,
                    marginVertical: 8,
                    // backgroundColor: "yellow"
                }}  >
                    <ImageBackground resizeMode={'cover'} style={{
                        height: 150,
                        width: 100,
                    }} imageStyle={{ borderRadius: 5 }} source={require('../../../assets/images/poster.png')}>
                        <Image resizeMode={"stretch"} style={{
                            height: 150,
                            width: 100,
                            borderRadius: 5
                        }}
                            // onError={()=>console.log("Fetching problem")}
                            source={{ uri: "http://library.lol/covers/" + data.coverurl }} />
                    </ImageBackground>
                    <Text numberOfLines={1} style={{
                        marginTop: 2,
                        // fontFamily: styles.baseText.fontFamily,
                        fontSize: 13,
                        color:themecolor.fontprimary

                    }} >{data.title}</Text>
                    <Text numberOfLines={1} style={{
                        marginTop: 1,
                        // fontFamily: styles.baseText.fontFamily,
                        fontSize: 12,
                        color: themecolor.fontsecondary
                    }}>{data.author} </Text>
                </View>
            </TouchableNativeFeedback>

        </View>
    )
}


export default VerticalBookScroll;
