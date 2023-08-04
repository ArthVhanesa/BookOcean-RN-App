
import React, { memo, useState, useEffect,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, NativeModules, StyleSheet, View, Text, Alert, Image, ImageBackground, Linking, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, TouchableNativeFeedback, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../../Components/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import RNBackgroundDownloader from 'react-native-background-downloader';
import { removeDownload, updateProgress, UPDATE_PROGRESS } from '../../../redux/actions';
import { useNavigation } from '@react-navigation/core';
import RNFS,{stat} from '@jsonxr/react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from "react-native-push-notification";
import { AppInstalledChecker } from 'react-native-check-app-install';
import InAppReview from 'react-native-in-app-review';
import {ThemeContext} from "../../index"


function Downloads() {

    const themecolor = useContext(ThemeContext);

    const { downloads } = useSelector(state => state.booksReducer);

    useEffect(() => {
        console.log("contexttheme",themecolor);
        // downloads.reverse() 

    }, [downloads,themecolor])

    return (<View style={{ height: '100%', backgroundColor : themecolor.bgcolor, justifyContent: 'center' }}>
        {(downloads.length === 0) ?
            <Image resizeMode={'stretch'} source={require('../../../assets/images/downloadScreen.png')} style={{ height: 300, width: 300, backgroundColor: themecolor.bgcolor, alignSelf: 'center' }}></Image> :
             <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%' }}
                style={{ backgroundColor: themecolor.bgcolor }}
                data={downloads}
                renderItem={({ item, index }) => <DownloadingBook key={item.id} item={item}
                />} />}
        {/* <Text>You can view downloaded files in Downloads Folder</Text> */}
    </View>
    )
}

const BookInPopUpMenu = ({ bookdata }) => {
    const themecolor = useContext(ThemeContext);

    return (

        <View style={{
            marginHorizontal: 10,
            // backgroundColor: 'red',
            alignItems: "center",
            flexDirection: 'row',

        }}>

            <View style={{
                // backgroundColor:'red'
            }}>
                <ImageBackground resizeMode={'cover'} style={{
                    height: 70,
                    width: 50,
                }} imageStyle={{ borderRadius: 8 }} source={require('../../../assets/images/poster.png')}>
                    <Image resizeMode={"stretch"} style={{ height: 70, width: 50, borderRadius: 8 }} source={{ uri: "http://library.lol/covers/" + bookdata.coverurl }} />
                </ImageBackground>
            </View>
            <View style={{
                marginLeft: 10,
                // backgroundColor: 'green',
                width: '80%'
            }}>

                <Text numberOfLines={2} style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.normalText.letterSpacing,
                    marginBottom: 2,
                    fontSize: 16,
                    color:themecolor.fontprimary
                }}>{bookdata.title}</Text>
                <Text numberOfLines={1} style={{
                    // fontFamily: styles.baseText.fontFamily,

                    fontSize: 13,
                    color: themecolor.fontsecondary
                }}>{bookdata.author} &#8226; {bookdata.extension}</Text>

            </View>
        </View>



    )
}


const DownloadingBook = ({ item, index }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [downloadPercent, setdownloadPercent] = useState(item.progress)
    const [isPaused, setisPaused] = useState(item.task.state === "PAUSED")
    const [task, settask] = useState(item.task);
    const [path, setpath] = useState(item.path)

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const themecolor = useContext(ThemeContext);


    const pauseHandler = () => {
        console.log(task);
        if (!task) return;
        (task.state === "DOWNLOADING") ? task.pause() : task.resume();
        console.log(task);
        item.progress = (task.percent * 100).toFixed(2);
        item.task = task
        console.log(item);
        dispatch(updateProgress(item));
        setisPaused(!isPaused);
        //    console.log(isPaused); 
    }

    const cancelHandler = () => {
        console.log("cancel");
        task.stop()
        console.log(task.state);
    }

    const deleteHandler = () => {
        if (!path) {
            dispatch(removeDownload(item));
            return;
        }

        RNFS.unlink(path)
            .then(() => {
                console.log('FILE DELETED');
            })
            .catch((err) => {
                console.log(err.message);
            });
        item.progress = 0;
        item.path = null;
        dispatch(removeDownload(item));
        console.log("deleted");
    }



    function AlertDelete() {

        Alert.alert(
            '',
            'Remove book from this device?',
            [
                {
                    text: 'No',
                    onPress: () => console.log("No"),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => deleteHandler() },
            ]
        );

    }

    async function downloadHandler(bookdata, index) {


        const downloadurl = bookdata.cflink;

        console.log("Download button clicked");
        console.log("cflink",downloadurl);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message:
                        'App needs access to your storage to download books',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // Once user grant the permission start downloading
                console.log('Storage Permission Granted.');
            } else {
                // If permission denied then show alert
                alert('Storage Permission Not Granted');
                return;
            }

            // let DownloadDir = RNFS.DownloadDirectoryPath;
            let DownloadDir = "/storage/emulated/0/Android/data/com.bookocean/files"
            let destinationpath = `${DownloadDir}/${bookdata.title}.${bookdata.extension}`

            let task = RNBackgroundDownloader.download({
                id: bookdata.id,
                url: downloadurl,
                destination: destinationpath
            }).begin((expectedBytes) => {
                console.log(`Going to download ${expectedBytes} bytes!`);
                settask(task);
                item.path = destinationpath;
                setpath(item.path)
            }).progress((percent) => {
                console.log(`Downloaded: ${percent * 100}%`);

                setdownloadPercent((percent * 100).toFixed(0))
            }).done(() => {
                setdownloadPercent(100)
                // Alert.alert("file saved on :", DownloadDir)
                item.progress = 100
                item.task = task;
                dispatch(updateProgress(item));
                setpath(destinationpath)
                PushNotification.localNotification({
                    channelId: "firebase-foreground",
                    title: "Download Complete",
                    message: bookdata.title + " Downloaded.",
                    bigPictureUrl: "http://library.lol/covers/" + bookdata.coverurl
                });
                console.log('Download is done!');

            }).error((error) => {
                Alert.alert("", "Download canceled due to Error.")
                console.log('Download canceled due to error: ', error);
            });

        } catch (err) {
            // To handle permission related exception
            console.warn(err);
        }
    }

    useEffect(() => {

        async function init() {
            let lostTasks = await RNBackgroundDownloader.checkForExistingDownloads();
            let curtask = lostTasks.filter(task => task.id === item.id)
            settask(curtask[0])
            console.log(task);
            if (task.state === "DOWNLOADING") {
                console.log(item.title + " " + item.progress);
                downloadHandler(item, index)
            }
        }
        init()
    }, [item.task.state])

    const android = RNFetchBlob.android;

    async function bookOpener() {
        console.log(path);
      
        if (path === null || downloadPercent!==100) {
            ToastAndroid.show("Wait! we are downloading your book",ToastAndroid.LONG);
            return
        }
        if (item.extension === "pdf") {
            android.actionViewIntent(path, 'application/pdf')
            // navigation.navigate("PdfReaderScreen", { link: "file:" + path })
            } else if (item.extension === "epub") {
                android.actionViewIntent(path, 'application/epub+zip') 
            // AppInstalledChecker
            //     .isAppInstalledAndroid('com.google.android.apps.books')
            //     .then((isInstalled) => {
            //         console.log("isInstalled?", isInstalled);
            //         if (isInstalled) {
            //             (path === null) ? Alert.alert("", "File is downloading") :
            //                 (item.extension === "epub") ? android.actionViewIntent(path, 'application/epub+zip') : null

            //         } else {
            //             Alert.alert("App Not Available", "Download Google play Books", [
            //                 // {text: 'Ask me later', onPress: () => console.log('Later button clicked')},
            //                 { text: 'Not Now', onPress: () => console.log('Not now button is clicked') },
            //                 { text: 'Download Now', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.google.android.apps.books&hl=en_IN&gl=US') },
            //             ], { cancelable: true })
            //         }
            //     }) 
         } else if(item.extension==="djvu"){
            android.actionViewIntent(path, 'image/vnd.djvu')    
        //  } else if(item.extension==="azw3"){
        //     android.actionViewIntent(path, 'application/x-palm-database') 
        } else { Alert.alert("File not Supported!", "You can find this file in\nPhone Storage/Android/data/com.bookocean/files") }
        setModalVisible(false)
    }

    return (
        <View style={{
            alignItems: "center",
            backgroundColor: themecolor.bgcolor,
            
        }}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                onPress={bookOpener}>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: themecolor.bgcolor,
                    paddingHorizontal: '5%',
                    paddingVertical: 15
                }}>

                    <View style={{
                        // backgroundColor:'red'
                    }}>
                        <ImageBackground resizeMode={'cover'} style={{
                            height: 90,
                            width: 60,
                        }} imageStyle={{ borderRadius: 8 }} source={require('../../../assets/images/poster.png')}>
                            <Image resizeMode={"stretch"} style={{ height: 90, width: 60, borderRadius: 8 }} source={{ uri: "http://library.lol/covers/" + item.coverurl }} />
                        </ImageBackground>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        // backgroundColor: 'green',
                        width: '78%',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '65%',
                            // backgroundColor:'red'
                        }}>
                            <Text numberOfLines={2} style={{
                                marginBottom: 2,
                                fontSize: 15,
                                color: themecolor.fontprimary
                            }}>{item.title}</Text>
                            <Text numberOfLines={1} style={{

                                fontSize: 13,
                                color: themecolor.fontsecondary
                            }}>{item.author}</Text>
                            <View style={{
                                marginTop: 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {(downloadPercent !== 100) ? <ProgressBar
                                    progress={downloadPercent}
                                    backgroundColor= "#e6e6e6"
                                    fillcolor={themecolor.blue}

                                /> : null}
                                {(downloadPercent !== 100) ? <Text style={{ marginLeft: 18, color: themecolor.blue }}>{downloadPercent}%</Text> : null}

                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            height: 26
                            // backgroundColor:'violet'
                        }}>
                            {(downloadPercent !== 100) ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}

                                onPress={() => pauseHandler()}>
                                <View style={{ padding: 0, marginRight: 22 }}>
                                    <Ionicon size={28} name={(!isPaused) ? "pause-circle-outline" : "play-circle-outline"} style={{
                                        color: themecolor.gray,
                                    }} />
                                </View>
                            </TouchableNativeFeedback> :

                                <MaterialCommunityIcons size={22} name="check-underline" style={{
                                    color: themecolor.blue,
                                    marginRight: 25
                                }} />
                            }

                            {/*  <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}


                                onPress={() => AlertDelete()}>
                                <View style={{ padding: 0 }}>
                                    <MaterialCommunityIcons size={24} name="trash-can-outline" style={{
                                        color: '#666666'
                                    }} />
                                </View>
                            </TouchableNativeFeedback> */}
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}


                                onPress={() => setModalVisible(true)}>
                                <View style={{ padding: 0 }}>
                                    <Feather size={24} name="more-vertical" style={{
                                        color: themecolor.gray
                                    }} />
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    </View>

                </View>
            </TouchableNativeFeedback>

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
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                            marginVertical: 15
                        }}>
                            <BookInPopUpMenu bookdata={item} />

                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: themecolor.fontsecondary }} />

                        <View style={{
                            height: (path !== null) ? 160 : 110,
                            flexDirection: 'column',
                            justifyContent: 'space-evenly'
                        }}>
                           { (path !== null) ?<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                onPress={bookOpener}>
                                <View style={{
                                    paddingHorizontal: 26,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Feather size={22} name="book-open" style={{
                                        color: themecolor.gray
                                    }} />
                                    <Text style={{ marginLeft: 17, fontWeight: 'bold', color: themecolor.gray }}>Read book</Text>
                                </View>
                            </TouchableNativeFeedback>:null}
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                onPress={() => AlertDelete()} >
                                <View style={{
                                    paddingHorizontal: 24,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons size={24} name="trash-can-outline" style={{
                                        color: themecolor.gray
                                    }} />
                                    <Text style={{ marginLeft: 17, fontWeight: 'bold', color: themecolor.gray }}>Delete from library</Text>
                                </View>
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                onPress={() => { setModalVisible(false); navigation.navigate('ViewBookScreen', { bookid: item.id }); }} >

                                <View style={{
                                    paddingHorizontal: 24,
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons size={24} name="book-outline" style={{
                                        color: themecolor.gray
                                    }} />
                                    <Text style={{ marginLeft: 17, fontWeight: 'bold', color: themecolor.gray }}>About this ebook</Text>
                                </View>
                            </TouchableNativeFeedback>

                        </View>
                    </View>
                </View>


            </Modal>


        </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default Downloads;
export { BookInPopUpMenu }
