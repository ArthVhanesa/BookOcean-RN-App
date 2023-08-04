import React, { useState,useContext } from 'react'
import { StyleSheet, View, TouchableNativeFeedback, Pressable, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, Alert, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ThemeContext} from "../index";

function SearchScreen({ navigation }) {

    const themecolor = useContext(ThemeContext);

    const [text, setText] = useState("")
    const [selectedCategory, setselectedCategory] = useState(0)
    const categories = ['Title', 'Author', 'Publisher', 'ISBN']

    function onSubmitHandler() {
        if(text===""){
            ToastAndroid.show("Please type any Bookname...", ToastAndroid.LONG);
        return}
        navigation.navigate('SearchResultScreen', { search_query: text, option: categories[selectedCategory].toLowerCase() })
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: themecolor.bgcolor }}>
                <View style={{
                    backgroundColor: themecolor.bgsecondary,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 54,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 6,
                    },
                    shadowOpacity: 0.39,
                    shadowRadius: 8.30,
                    elevation: 5,
                    paddingHorizontal: 13,
                    justifyContent: 'space-evenly',
                    //backgroundColor: 'green'
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
                        <TextInput placeholderTextColor={themecolor.fontsecondary} autoFocus onChangeText={(text) => setText(text)} onSubmitEditing={onSubmitHandler} style={{
                            width: '100%',
                            fontSize: 17,
                            paddingLeft: 13,
                            color: themecolor.fontprimary,
                            fontFamily: styles.baseText.fontFamily,
                            letterSpacing: styles.normalText.letterSpacing,
                        }} placeholder="Search Books" />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '20%',
                        justifyContent: 'flex-end' 
                        // justifyContent: 'space-between',
                        // backgroundColor: 'green'
                    }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}
                          onPress={onSubmitHandler}>
                            <View style={{ padding: 4, marginRight: 2 }}>
                                <Fontisto color={themecolor.blue} size={18} name="search" />
                            </View>
                        </TouchableNativeFeedback>
                       
                    </View>
                </View>

                <View style={{
                    // backgroundColor: 'green',
                    height: 10
                }} />

                <View style={{
                    // backgroundColor: 'green',
                }}>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginVertical: 8,
                        color:themecolor.fontprimary,
                    }}>
                        Search By
                </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        {categories.map((item, index) => {
                            return (
                                <Pressable
                                    key={index.toString()}
                                    onPress={() => setselectedCategory(index)}>

                                    <View
                                        style={{
                                            borderColor: themecolor.blue,
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            paddingHorizontal: 16,
                                            paddingVertical: 7,
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
                    <View
                        style={{
                            borderBottomColor: themecolor.fontsecondary,
                            borderBottomWidth: 1,
                            marginHorizontal: 25,
                            marginTop: 20

                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
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
export default SearchScreen