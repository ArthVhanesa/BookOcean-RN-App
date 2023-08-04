
import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, Animated, View, Share, Text, Image, TouchableNativeFeedback, ImageBackground, ActivityIndicator, SafeAreaView, ToastAndroid, ScrollView, Dimensions, PermissionsAndroid, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollHor from '../Components/ScrollHor';
import ProgressBar from '../Components/ProgressBar';
import RNBackgroundDownloader from 'react-native-background-downloader';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark, downloadBooks } from '../../redux/actions';
import { BASE_URL } from '../../config';
import FullBookDetail from '../Screens/Home/AboutBookFullPage';
import {ThemeContext} from "../index"

function ViewBookScreen({ route, navigation }) {
    let bookid = route.params.bookid;
    const themecolor = useContext(ThemeContext);

    const [datas, setdatas] = useState(null)
    const [downloadPercent, setdownloadPercent] = useState(0)
    const [isbookmarked, setisbookmarked] = useState(false)
    const { bookmarks } = useSelector(state => state.booksReducer);
    const { downloads } = useSelector(state => state.booksReducer);
    const [detailVisible, setdetailVisible] = useState(false)
    const [loading, setloading] = useState(false)
    const [pages, setpages] = useState()


    const dispatch = useDispatch()
    const addToDownloadList = (book) => dispatch(downloadBooks(book));
    const addToBookmarkList = book => dispatch(addBookmark(book));
    const removeFromBookmarkList = book => dispatch(removeBookmark(book));

    const handleAddBookmark = book => {
        const bookmarkdata = {
            id: book.id,
            title: book.title,
            author: book.author,
            coverurl: book.coverurl,
            md5:book.md5,
            extension:book.extension,
            cflink:book.cflink
        }
        addToBookmarkList(bookmarkdata);
        setisbookmarked(!isbookmarked)
        // console.log(bookmarkdata);
    };

    const handleRemoveBookmark = book => {
        removeFromBookmarkList(book);
    };

    const isBookmarked = book => {
        if (bookmarks.filter(item => item.id === book.id).length > 0) {
            return true;
        }
        return false;
    };

    const isDownloaded = book => {
        if (downloads.filter(item => item.id === book.id).length > 0) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        let controller = new AbortController();

        async function fetchData() {
            try {
                setloading(true)
                let signal = controller.signal;
                let bookdata = await fetch(`${BASE_URL}/json.php?ids=${bookid}&fields=*`, { signal }).then(res => res.json()).then(datas => datas);
              
                console.log(bookdata[0])
                let pages = (bookdata[0].pages !== "" && bookdata[0].pages !== "0") ? bookdata[0].pages : ((bookdata[0].pagesInFile !== "0" && bookdata[0].pagesInFile !== "") ? bookdata[0].pagesInFile : null)
                // let pages =  
                // console.log(pages);
                isNaN(pages) ? setpages(null) : setpages(pages)
                setloading(false)

                //download link generator
              
                    let cflink=await fetch('http://library.lol/main/'+bookdata[0].md5).then(function(response) {
                        return response.text();
                    }).then(function(string) {
                        bookdata[0]["cflink"]=(string.match(/<a href=(.*)">IPFS/g)[0].slice(9,-6));
                    });
                    console.log(bookdata[0]);
            
                setdatas(bookdata[0])
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log(error)
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        }
        fetchData();

        return () => {
            controller.abort();
        };
    }, [bookid]);


    function downloadBtnHandler() {
        if (isDownloaded(datas)) {
            Alert.alert("", "Already downloaded")
        } else {
            addToDownloadList(datas);
            ToastAndroid.show("Download Started", ToastAndroid.LONG);
        }

    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Hey Bookish,\n\nI found this book\nTitle : "${datas.title}"\nAuthor : "${datas.author}"\non BookOcean App for free.\nGo, Search and Get.\n\nYou can enjoy this book and many more in one App.\nDownload now : https://bookoceanapp.page.link/share`,
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


    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 55)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55]
    })


    return (!datas || loading) ? (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator style={{ flex: 1 ,backgroundColor:themecolor.bgcolor}} size='large' color={themecolor.blue} />
        </View>
    ) : (
        <SafeAreaView style={{ flex: 1,
            backgroundColor:themecolor.bgcolor
        }} >
            <View style={{
                flex: 1
            }}>
                <Animated.View style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    height: 55,
                    elevation: 4,
                    zIndex: 100,
                }}>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: themecolor.bgcolor,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 55,
                        borderBottomWidth: 1,
                        borderColor: themecolor.fontsecondary,
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
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '23%',
                            justifyContent: 'space-between',
                            // backgroundColor: 'green'
                        }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#ff9999", true)}

                                onPress={() =>
                                    isBookmarked(datas) ? handleRemoveBookmark(datas) : handleAddBookmark(datas)
                                }>
                                <View style={{ padding: 4 }}>
                                    <FontAwesome size={20} name={isBookmarked(datas) ? 'heart' : 'heart-o'} style={{
                                        color: isBookmarked(datas) ? 'red' : themecolor.blue
                                    }} />
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}

                                onPress={onShare}>
                                <View style={{ padding: 1 }}>
                                    <MaterialCommunityIcons size={24} name="share" style={{
                                        color: themecolor.blue
                                    }} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </Animated.View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}>

                <View style={{
                    backgroundColor: themecolor.bgcolor,
                    // flexDirection: 'row',
                    // margin: 10,
                    // backgroundColor: 'red',
                    height: '100%',
                    width: '100%',
                    marginTop: 55

                }}>
                    <View style={{
                        marginTop: 25,
                        marginLeft: 20,
                        flexDirection: 'row',
                        // backgroundColor: 'green'
                    }}>
                         <ImageBackground resizeMode={'cover'} style={{
                        height: 140,
                        width: 100,
                    }} imageStyle={{ 
                        borderRadius: 10 }} source={require('../../assets/images/poster.png')}>
                       
                        <Image resizeMode={"stretch"} style={{
                            height: 140,
                            width: 100,
                            borderRadius: 10
                        }} source={{ uri: "http://library.lol/covers/" + datas.coverurl }}>

                        </Image>
                        </ImageBackground>
                        <View style={{
                            marginLeft: 13
                        }}>


                            <Text style={{
                                letterSpacing: 0.5,
                                fontFamily: styles.baseText.fontFamily,
                                fontSize: 25,
                                paddingRight: 50,
                                marginRight: 70,
                                color: themecolor.fontprimary
                            }}>
                                {datas.title}
                            </Text>

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchResultScreen', { search_query: datas.author, option: "Author" })}>
                                <Text numberOfLines={1} style={{
                                    marginTop: 5,
                                    fontWeight: 'bold',
                                    color: themecolor.blue,
                                    paddingRight: 60,
                                    marginRight: 70
                                }}>
                                    {datas.author}
                                </Text>
                            </TouchableWithoutFeedback>
                            <Text numberOfLines={1} style={{
                                marginTop: 2,
                                color: themecolor.fontsecondary,
                                paddingRight: 60,
                                marginRight: 70
                            }}>
                                {datas.publisher}
                            </Text>
                            <Text numberOfLines={1} style={{
                                marginTop: 2,
                                color: themecolor.fontsecondary,
                                paddingRight: 60,
                                marginRight: 70
                            }}>
                                {(datas.filesize / (1024 * 1024)).toFixed(2)} mb
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        // backgroundColor: 'yellow',
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        height: 70,
                        // marginRight: 20,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons size={25} name="book-outline" style={{
                                color: themecolor.blue
                            }} />
                            <Text style={{
                                // color: '#666666',
                                marginTop: 2,
                                color: themecolor.fontprimary
                            }}>{datas.extension}</Text>
                        </View>
                        <View style={{
                            height: '50%',
                            width: 1,
                            backgroundColor: themecolor.gray
                        }}>
                        </View>
                        {(pages !== null) ?
                            (<View style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: themecolor.blue
                                }}>{pages}</Text>

                                <Text style={{
                                    marginTop: 2,
                                    // color: '#666666',
                                    color: themecolor.fontprimary
                                }}>Pages</Text>

                            </View>)
                            : null}
                        {(pages !== null) ?
                            (<View style={{
                                height: '50%',
                                width: 1,
                                backgroundColor: themecolor.gray
                            }} />

                            )
                            : null}
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#ff9999", true)}

                            onPress={() =>
                                isBookmarked(datas) ? handleRemoveBookmark(datas) : handleAddBookmark(datas)
                            }>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <FontAwesome size={25} name={isBookmarked(datas) ? 'heart' : 'heart-o'} style={{
                                    color: isBookmarked(datas) ? 'red' : themecolor.blue
                                }} />
                                <Text style={{
                                    color: themecolor.fontprimary,
                                    marginTop: 2,
                                }}>Favourite</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={{
                            height: '50%',
                            width: 1,
                            backgroundColor: themecolor.gray
                        }}>
                        </View>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                            onPress={onShare}>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <MaterialCommunityIcons size={25} name="share" style={{
                                    color: themecolor.blue
                                }} />
                                <Text style={{
                                    marginTop: 2,
                                    color: themecolor.fontprimary
                                }}>Share</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={{
                        // backgroundColor: 'yellow',
                        marginTop: 20,
                        height: 50,
                        // marginRight: 20,
                        alignItems: 'center',

                    }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                            onPress={downloadBtnHandler}>
                            <View style={{
                                width: '90%',
                                height: 35,
                                backgroundColor: themecolor.blue,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5
                            }}>
                                <Text style={{
                                    letterSpacing: styles.baseText.letterSpacing,
                                    fontFamily: styles.baseText.fontFamily,
                                    color: '#fff',
                                    fontSize: 15
                                }}>Download for Free</Text>
                            </View>
                        </TouchableNativeFeedback>

                    </View>

                    <View
                        style={{
                            borderBottomColor: themecolor.gray,
                            borderBottomWidth: 1,
                            marginHorizontal: 25,
                            marginVertical: 15,


                        }}
                    />
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                        onPress={() => navigation.navigate("FullBookDetail", { data: datas, pages: pages })} >

                        <View style={{
                            // backgroundColor: 'blue',
                            paddingHorizontal: 20,
                            paddingVertical: 20
                        }}>
                            <View style={{
                                // backgroundColor: 'yellow',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>

                                <Text style={{
                                    fontFamily: styles.baseText.fontFamily,
                                    letterSpacing: styles.baseText.letterSpacing,
                                    fontSize: 20,
                                }}>
                                    <Text style={{ fontWeight: 'bold' ,color:themecolor.fontprimary}}>
                                        About this Ebook
                                    </Text>
                                </Text>
                                <Feather size={20} name="arrow-right" style={{
                                    position: 'absolute',
                                    right: 3,
                                    color: themecolor.blue
                                }} />
                            </View>
                            <View style={{
                                marginTop: 10
                            }}>
                                <Text numberOfLines={5} style={{
                                    color: themecolor.fontsecondary
                                }}>{(datas.descr) ? datas.descr?.replace(/<[^>]*>/g, " ") : "Discription is not available for this book. You can see isbn, language, year, size, format etc. by clicking here."}
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <View
                        style={{
                            borderBottomColor: themecolor.gray,
                            borderBottomWidth: 1,
                            marginHorizontal: 25,
                            marginVertical: 15,


                        }}
                    />
                    <ScrollHor />
                    <View style={{
                        height: 30
                    }} />
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
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        // padding: 10
    }
});
export default ViewBookScreen;
