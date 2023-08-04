import React, { memo, useState, useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, StyleSheet, View, Text, Image,ImageBackground, TouchableOpacity, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, TouchableNativeFeedback, Alert } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BookInPopUpMenu } from './Downloads';
import { useDispatch, useSelector } from 'react-redux';
import { removeBookmark,downloadBooks } from '../../../redux/actions';
import { useNavigation } from '@react-navigation/core';
import {ThemeContext} from "../../index"

function Bookmarks() {
    const themecolor = useContext(ThemeContext);

    const navigation = useNavigation()
    const { downloads } = useSelector(state => state.booksReducer);
    const { bookmarks } = useSelector(state => state.booksReducer);
    const dispatch = useDispatch()
    const handleRemoveBookmark = book => {
        dispatch(removeBookmark(book));
    };
    const addToDownloadList = (book) => dispatch(downloadBooks(book));

    const isDownloaded = book => {
        if (downloads.filter(item => item.id === book.id).length > 0) {
            return true;
        }
        return false;
    };
    function downloadBtnHandler(item) {
        addToDownloadList(item);
    }

    const FavoriteBook = ({ item }) => {
        const [modalVisible, setModalVisible] = useState(false);

        return (
            <View style={{
                alignItems: "center",
                backgroundColor: themecolor.bgcolor
                // height:"100%"
            }}>
                <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
            onPress={() => { setModalVisible(false); navigation.navigate('ViewBookScreen', { bookid: item.id }); }} >
                <View style={{
                    flexDirection: 'row',
                   // backgroundColor: 'yellow',                    
                    paddingHorizontal: '5%',
                    paddingVertical: 15
                }}>
                    <ImageBackground resizeMode={'cover'} style={{
                        height: 90,
                        width: 60,
                    }} imageStyle={{ borderRadius: 8 }} source={require('../../../assets/images/poster.png')}>
                        <Image resizeMode={"stretch"} style={{ height: 90, width: 60, borderRadius: 8 }} source={{ uri: "http://library.lol/covers/" + item.coverurl }} />
                    </ImageBackground>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        // backgroundColor: 'green',
                        width: '78%',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '65%',
                        }}>
                            <Text numberOfLines={2} style={{

                                marginBottom: 2,
                                fontSize: 15,
                                color: themecolor.fontprimary
                            }}>{item.title}</Text>
                            <Text numberOfLines={1} style={{
                                    marginBottom:2,
                                fontSize: 13,
                                color: themecolor.fontsecondary 
                            }}>{item.author}</Text> 

                           { (isDownloaded(item))?<Text numberOfLines={1} style={{
                              
                                fontSize: 13,
                                color: themecolor.blue
                            }}>Downloaded</Text>:null}
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            height: 25
                            // backgroundColor:'violet'
                        }}>
                         
                             <TouchableNativeFeedback        background={TouchableNativeFeedback.Ripple("#ff9999", true)}

 onPress={() => handleRemoveBookmark(item)}>
                                <View style={{ padding: 1, marginRight: 18 }}>
                                    <FontAwesome size={22} name="heart" style={{
                                        color: 'red'
                                    }} />
                                </View>
                            </TouchableNativeFeedback>
                             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                                onPress={() => setModalVisible(true)}>
                                <View style={{ padding: 1 }}>
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
                                height: (isDownloaded(item)) ?110: 160,
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            }}>
                              {(!isDownloaded(item))? <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
onPress={() => (!isDownloaded(item)) ? downloadBtnHandler(item) : Alert.alert("", "Already downloaded")}>
                                <View style={{
                                    paddingHorizontal: 26,
                                    paddingVertical:10,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Feather size={22} name="download" style={{
                                        color: themecolor.gray
                                    }} />
                                    <Text style={{ marginLeft: 17, fontWeight: 'bold', color: themecolor.gray }}>Download</Text>
                                </View>
                            </TouchableNativeFeedback>:null}

                                 <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => handleRemoveBookmark(item)} >
                                    <View style={{
                                        paddingHorizontal: 26,
                                        paddingVertical: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Feather size={22} name="heart" style={{
                                            color: themecolor.gray
                                        }} />
                                        <Text style={{ marginLeft: 17, fontWeight: 'bold', color: themecolor.gray }}>Remove from favourite</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                 <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => { setModalVisible(false); navigation.navigate('ViewBookScreen', { bookid: item.id }); }} >

                                    <View style={{
                                        paddingHorizontal: 26,
                                        paddingVertical: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons size={24} name="book-outline" style={{ color: themecolor.gray }} />
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

    return (<View style={{ height: '100%', backgroundColor: themecolor.bgcolor, justifyContent: 'center' }}>
    {(bookmarks.length === 0) ?
        <Image resizeMode={'stretch'} source={require('../../../assets/images/bookmarkScreen.png')} style={{ height: 330, width: 330, backgroundColor: themecolor.bgcolor, alignSelf: 'center' }}></Image> : 
        <FlatList showsVerticalScrollIndicator={false}
            data={bookmarks}
            renderItem={({ item }) =>  <FavoriteBook key={item.id} item={item} />}
        />}
</View>
    )
}



const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});

export default Bookmarks
