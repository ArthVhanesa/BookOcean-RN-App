import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useState, useEffect,useContext } from 'react'
import { View, Image, Text, ScrollView, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedbackBase, ImageBackground } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { BASE_URL } from '../../config';
import {ThemeContext} from "../index";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function ScrollHor({ route, catdata }) {
    const themecolor = useContext(ThemeContext);

    (!catdata) ? catdata = {
        "_id": "6079686d812e4735fc35a440",
        "catid": "1",
        "catname": "Trending",
        "bookids": [
            "2334710",
            "1160432",
            "1202072",
            "271570",
            "1487008",
            "868880",
            "647495",
            "2508418",
            "404410",
            "353119",
            "260746",
            "234178",
            "2649373",
            "311575",
            "604338",
            "533454",
            "402126",
            "260840",
            "1496323",
            "233946",
            "86311",
            "2538272",
            "423161",
            "657346",
            "2464631",
            "2860252",
            "496087",
            "1340577",
            "2271717",
            "530292",
            "804124",
            "1369051",
            "1707517",
            "2387201",
            "2387651",
            "736925",
            "773765",
            "473718",
            "188434",
            "234256",
            "271304",
            "2120970",
            "1352819",
            "389634",
            "1686729",
            "111251",
            "475894",
            "2352336",
            "457451",
            "1207922",
            "2790393",
            "390199",
            "206032",
            "500966",
            "2491737",
            "2296265"
        ]
    } : null;
    const navigation = useNavigation();
    const [datas, setdatas] = useState(null)

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                let idArray = getRandom( catdata.bookids,7)
                idArray=idArray.join(',');
                let bookdata = await fetch(`${BASE_URL}/json.php?ids=${idArray}&fields=Title,Author,coverurl,id,filesize`).then(res => res.json())
                console.log("Fetch Success: got response",bookdata);
                setdatas(bookdata) 

            } catch (error) {
                console.log({error});
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    throw error;
                }
            }

        };
        setTimeout(() => {
            loadData();
        }, getRandomInt(5000));

        return () => {
            controller.abort();
        };
    }, []);


    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            return arr;
        // throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }



    const BookCover = ({ data }) => {
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

              <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
                onPress={onpressHandler}>

                <View style={{
                    backgroundColor: themecolor.bgcolor,
                    width: 150,
                    marginHorizontal: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    // backgroundColor: "yellow"
                }}>
                    <ImageBackground resizeMode={'contain'} style={{
                        height: 220,
                        width: 145,
                       
                    }}  imageStyle={{ borderRadius: 5}} source={require('../../assets/images/poster.png')}>
                    
                    <Image resizeMode={'stretch'} style={{
                        height: 220,
                        width: 145,
                        borderRadius: 5
                    }} source={{ uri: "http://library.lol/covers/" + data.coverurl }}/>
                    </ImageBackground>
                    <View>
                        <Text numberOfLines={1} style={{
                            marginTop: 3,
                            color:themecolor.fontprimary
                        }} >{data.title}</Text>
                        <Text numberOfLines={1} style={{
                            marginTop: 2,
                            fontSize: 13,
                            color:themecolor.fontsecondary

                        }}>{data.author}</Text>
                        <Text style={{
                            marginTop: 2,
                            fontSize: 13,
                            color:themecolor.fontprimary
                        }}>Free
                    {/* {(data.filesize / (1024 * 1024))} */}
                        </Text>
                    </View>
                </View>

            </TouchableNativeFeedback>
        )
    }

    return (
        <View >
              <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}

            onPress={() => {navigation.navigate("VerticalBookScroll", { bookids: catdata.bookids, catname: catdata.catname })}} >
                <View style={{
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    marginBottom: 7,
                    marginTop: 20,
                    justifyContent: 'space-between',
                    // backgroundColor:'blue'
                }}>

                    <View style={{
                        // marginHorizontal: 20,
                    }}>
                        <Text style={{
                            fontFamily: styles.baseText.fontFamily,
                            letterSpacing: styles.baseText.letterSpacing,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color:themecolor.fontprimary
                            }}>
                                {catdata.catname}
                            </Text>
                        </Text>
                        <Text style={{
                            // fontFamily: styles.baseText.fontFamily,
                            fontSize: 14,
                            color: themecolor.fontsecondary
                        }}>
                            Ebooks for you
                    </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <Feather size={20} name="arrow-right" style={{
                            color:themecolor.blue
                        }}></Feather>



                    </View>

                </View>
            </TouchableNativeFeedback>

            {/* <ScrollView horizontal contentContainerStyle={{ paddingEnd: 5, paddingStart: 15 }}> */}

            {
                (datas) ? <FlatList
                    horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ backgroundColor: themecolor.bgcolor, paddingEnd: 10, paddingStart: 17 }}
                    data={datas}
                    renderItem={({ item }) => <BookCover navigation={navigation} key={item.id} data={item} />} />
                    : (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0F65CA" />
                        </View>
                    )
            }
            {/* </ScrollView> */}
        </View>
    )

}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing:0.8
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
export default ScrollHor;
