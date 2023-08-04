import { View, Text, Image, TouchableNativeFeedback, Pressable, ImageBackground, FlatList, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState, useEffect,useContext } from 'react';
import SearchScreen from './SearchScreen';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '..';
import { LOCAL_URL } from '../../config';

const SearchResultScreen = ({ route, navigation }) => {

    const search_query = route.params.search_query;
    const subcat_name = route.params.subcat_name;
    let option = route.params.option;
    const themecolor = useContext(ThemeContext);

    const [selectedCategory, setselectedCategory] = useState(0)
    const categories = ['Language', 'Format', 'Size', 'Year']
    const sortvalues = ['language', 'extension', 'filesize', 'year']
    const [datas, setdatas] = useState(null)
    const [booksfound, setbooksfound] = useState(0)
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false)
    const [AscDesc, setAscDesc] = useState("ASC")


    useEffect(() => {
        let controller = new AbortController();
        const loadData = async () => {
            try {
                setloading(true)

                let url = LOCAL_URL+"/"+ option + "/" + search_query + "?sort=" + sortvalues[selectedCategory] + "&sortmode=" + AscDesc + "&page=" + page;

                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                console.log("FetchCancel: got response");
                console.log(data);
                if (!data.length) {
                    setdatas(data);
                    setloading(false)
                    return;
                }

                if (page === 1) {
                    setdatas(data.slice(0, data.length - 1))
                }
                else {
                    setdatas((olddata) => olddata.concat((data.slice(0, data.length - 1))))
                }
                setbooksfound(data[data.length - 1].booksfound);
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
    }, [page, selectedCategory, AscDesc,search_query]);

    async function fetchMore() {

        if (page === 5 || booksfound < 26) {
            return;
        }
        setpage(page + 1);
        console.log("page num: ", page);
    }

    function ascDescHandler() {
        (AscDesc === "ASC") ? setAscDesc("DESC") : setAscDesc("ASC");
        setpage(1);
    }

    const renderFooter = () => {
        return (loading) ? (
            <ActivityIndicator size="large" color="#0F65CA" />
        ) : null
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                height: 55,
                borderBottomWidth: 1,
                borderColor: '#cccccc',
                paddingHorizontal: 13,
                justifyContent: 'space-evenly',
                backgroundColor: themecolor.bgcolor
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '77%',
                    // backgroundColor: 'red'
                }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                        onPress={() => navigation.goBack()}>
                        <View style={{ padding: 2 }}>
                            <Feather size={23} name="arrow-left" style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: themecolor.blue
                            }} />
                        </View>
                    </TouchableNativeFeedback>
                    <Text numberOfLines={1} style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        width: '85%',
                        fontSize: 17,
                        paddingLeft: 13,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: themecolor.fontprimary
                        }}>
                            {
                                (search_query.substring(0, 7) === "topicid") ? subcat_name : search_query
                            }
                        </Text>
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '23%',
                    justifyContent: 'flex-end'
                    // justifyContent: 'space-between',
                    // backgroundColor: 'green'
                }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                        onPress={() => navigation.navigate('SearchScreen')}>
                        <View style={{ padding: 4, marginRight: 2 }}>
                            <Fontisto color = {themecolor.blue} size={18} name="search" />
                        </View>
                    </TouchableNativeFeedback>
                    {/*  <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

 onPress={() => { alert('You will surely enjoy this feature in next update.'); }}>
                        <View style={{ padding: 1 }}>
                            <MaterialCommunityIcons size={25} name="microphone" style={{
                                color: '#0F65CA'
                            }} />
                        </View>
                    </TouchableNativeFeedback> */}
                </View>
            </View>

            <View style={{
                flex: 1,
            }}>

                {(<View style={{
                    backgroundColor: themecolor.bgcolor,
                    paddingBottom: 120
                }}>
                    {/* <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}> */}

                    <View style={{
                        marginHorizontal: 15,
                        marginVertical: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontFamily: styles.baseText.fontFamily,
                            letterSpacing: styles.normalText.letterSpacing,
                            fontSize: 18,

                            color: themecolor.fontprimary

                        }}>
                            Sort by
                                </Text>
                        <Pressable onPress={ascDescHandler}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: themecolor.blue,
                                alignItems: 'center',
                                borderRadius: 20,
                                paddingHorizontal: 12,
                                paddingVertical: 4
                            }}>
                                <Text style={{ color: 'white', fontSize: 13 }}>{(AscDesc === "ASC") ? "Ascending" : "Descending"}</Text>
                                <Ionicons size={18} name={(AscDesc === "ASC") ? "ios-caret-up" : "ios-caret-down"} style={{
                                    marginLeft: 3,
                                    color: 'white'
                                }} />
                            </View>
                        </Pressable>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {categories.map((item, index) => {
                            return (
                                <Pressable
                                    key={index.toString()}
                                    onPress={() => { setselectedCategory(index); setpage(1) }}>
                                    <View
                                        style={{
                                            borderColor: themecolor.blue,
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            paddingHorizontal: 16,
                                            paddingVertical: 5,
                                            backgroundColor: selectedCategory == index ? themecolor.blue : themecolor.bgsecondary,
                                        }}>
                                        <Text style={{
                                            // color: 'black',
                                            color: selectedCategory == index ? "white" : themecolor.fontsecondary,
                                        }}>
                                            {item}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>



                    { (!datas || (loading && page === 1)) ? (
                        <View style={{ height: "100%", justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color={themecolor.blue} />
                        </View>
                    ) : (<View style={{ paddingBottom: 88 }} >
                        <Text style={{
                            fontFamily: styles.baseText.fontFamily,
                            letterSpacing: styles.normalText.letterSpacing,
                            fontSize: 15,
                            color: themecolor.fontprimary,
                            paddingLeft: 15,
                            paddingVertical: 5
                            // color:'#0F65CA'

                        }}>{booksfound} books found</Text>

                        {/* {console.log(datas.length)} */}
                        {(!datas?.length) ? <View style={{ height: "100%", paddingBottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Image resizeMode='contain' source={require('../../assets/images/notfound.png')} style={{ height: 250, width: 250, backgroundColor: themecolor.bgcolor, alignSelf: 'center' }} />
                        </View> : null}
                        <FlatList showsVerticalScrollIndicator={false}
                            data={datas}
                            renderItem={({ item, index }) => <SearchResultBook navigation={navigation} item={item} />}
                            onEndReachedThreshold={0.1}
                            onEndReached={fetchMore}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={renderFooter}
                        />
                    </View>)}
                    {/* </ScrollView> */}
                </View>
                )}

            </View>

        </SafeAreaView >
    )
}

const SearchResultBook = ({ item, navigation }) => {
    const themecolor = useContext(ThemeContext);

    return (
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
            onPress={() => navigation.navigate('ViewBookScreen', { bookid: item.id })}>
            <View style={{
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: themecolor.bgcolor,
                paddingVertical: 12

            }}>
                <View style={{
                    flexDirection: 'row',
                    // backgroundColor: 'yellow',
                    width: '87%',

                }}>

                    <ImageBackground resizeMode={'cover'} style={{
                        height: 80,
                        width: 60,
                    }} imageStyle={{ borderRadius: 5 }} source={require('../../assets/images/poster.png')}>
                        <Image resizeMode={"stretch"} style={{
                            height: 80,
                            width: 60,
                            borderWidth: 2,
                            borderRadius: 10
                        }} source={{ uri: "http://library.lol/covers/" + item.coverurl }}></Image>
                    </ImageBackground>
                    <View style={{
                        marginLeft: 10,
                        // backgroundColor: 'green',
                        width: '75%'
                    }}>
                        <Text numberOfLines={1} style={{
                            fontWeight: 'bold', marginVertical: 0.5, color:themecolor.fontprimary
                        }}>{item.title}</Text>
                        <Text numberOfLines={1} style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{item.author}</Text>
                        <Text style={{
                            fontSize: 12,
                            color:themecolor.fontsecondary,
                            marginVertical: 0.5
                        }}>{(item.filesize / (1024 * 1024)).toFixed(2)}mb &#8226; {item.extension} &#8226; Free</Text>
                    </View>

                </View>
            </View>
        </TouchableNativeFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default SearchResultScreen;