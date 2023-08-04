
import React, { useEffect, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, TouchableWithoutFeedback, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, ImageBackground, Touchable, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import ScrollHor from '../Components/ScrollHor';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LOCAL_URL } from '../../../config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from "../../"

function Category({ navigation }) {
    const [text, setText] = useState("")
    const themecolor = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false);
    const categories = ['Title', 'Author', 'Publisher', 'ISBN']
    const [selectedCategory, setselectedCategory] = useState(0)
    const [subCategories, setsubCategories] = useState(null)
    const [loading, setloading] = useState(false)
    const [title, settitle] = useState()

    const maincategory = [
        {
            "cat_id": "1",
            "cat_name": "Technolodgy"
        },
        {
            "cat_id": "2",
            "cat_name": "Art"
        },
        {
            "cat_id": "3",
            "cat_name": "Biology"
        },
        {
            "cat_id": "4",
            "cat_name": "Business"
        },
        {
            "cat_id": "5",
            "cat_name": "Chemistry"
        },
        {
            "cat_id": "6",
            "cat_name": "Computers"
        },
        {
            "cat_id": "7",
            "cat_name": "Geography"
        },
        {
            "cat_id": "8",
            "cat_name": "Geology"
        },
        {
            "cat_id": "9",
            "cat_name": "Economy"
        },
        {
            "cat_id": "10",
            "cat_name": "Education"
        },
        {
            "cat_id": "11",
            "cat_name": "Jurisprudence"
        },
        {
            "cat_id": "12",
            "cat_name": "Housekeeping & leisure"
        },
        {
            "cat_id": "13",
            "cat_name": "History"
        },
        {
            "cat_id": "14",
            "cat_name": "Linguistics"
        },
        {
            "cat_id": "15",
            "cat_name": "Literature"
        },
        {
            "cat_id": "16",
            "cat_name": "Mathematics"
        },
        {
            "cat_id": "17",
            "cat_name": "Medicine"
        },
        {
            "cat_id": "18",
            "cat_name": "Other Social Sciences"
        },
        {
            "cat_id": "19",
            "cat_name": "Physics"
        },
        {
            "cat_id": "20",
            "cat_name": "Physical Education & Sport"
        },
        {
            "cat_id": "21",
            "cat_name": "Psychology"
        },
        {
            "cat_id": "22",
            "cat_name": "Religion"
        },
        {
            "cat_id": "23",
            "cat_name": "Science (General)"
        }
    ]


    function onSubmitHandler() {
        // console.log(text);
        navigation.navigate('SearchResultScreen', { search_query: text, option: categories[selectedCategory].toLowerCase() })
    }

    function subPressHandler(topicid, subcat_name) {
        setModalVisible(true)
        navigation.navigate('SearchResultScreen', { search_query: `topicid${topicid}`, option: "title", subcat_name: subcat_name })
        setModalVisible(false)
    }

    const categoryPressHandler = async (cat_id) => {
        settitle(maincategory.filter(category => category.cat_id === cat_id)[0].cat_name)
        // console.log(title);
        setModalVisible(true)
        try {
            setloading(true)
            let catJson = await fetch(`${LOCAL_URL}/bookocean/topics/${cat_id}`).then(res => res.json()).then(datas => datas);
            // console.log(catJson);
            setsubCategories(catJson)
            setloading(false)

        } catch (error) {
            console.log(error);
        }
    };

    const CategoryList = ({ item }) => {
        return (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                onPress={() => categoryPressHandler(item.cat_id)}>
                <View>
                    <Text style={{ fontSize: 18, marginVertical: 10, paddingHorizontal: 25 ,color:themecolor.fontprimary}}>{item.cat_name}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
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
                    <TextInput placeholderTextColor={themecolor.fontsecondary} onChangeText={(text) => setText(text)} onSubmitEditing={onSubmitHandler} style={{
                        width: '85%',
                        fontSize: 17,
                        color:themecolor.fontprimary,
                        paddingLeft: 13,
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                    }} placeholder="Search Books" />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '23%',
                    justifyContent: 'flex-end',
                    // backgroundColor: 'green'
                }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}

                        onPress={onSubmitHandler}>
                        <View style={{ padding: 4, marginRight: 2 }}>
                            <Fontisto color={themecolor.blue} size={18} name="search" />
                        </View>
                    </TouchableNativeFeedback>
                    {/*  <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

 onPress={() => { alert('You will surely enjoy this feature in next update.'); }}>
                        <View style={{ padding: 1 }}>
                        <MaterialCommunityIcons size={25} name="microphone" style={{
                                color: {themecolor.blue}
                            }} />
                        </View>
                    </TouchableNativeFeedback> */}
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
                    marginVertical: 8
                    ,color:themecolor.fontprimary
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
                                        color: 'black',
                                        // fontFamily: styles.baseText.fontFamily,

                                        color: selectedCategory == index ?"white" : themecolor.fontsecondary,
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
            <ScrollView showsVerticalScrollIndicator={false}>



                <View style={{
                    marginVertical: 17
                }}>

                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        marginHorizontal: 18,
                        fontSize: 22,
                        color:themecolor.fontprimary
                    }}>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>
                            Categories
                        </Text>
                    </Text>

                </View>



                <View style={{
                    // backgroundColor: 'red',
                    // paddingHorizontal: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap'

                }}>

                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

                        background={TouchableNativeFeedback.Ripple('#e6f2ff', false)}
                        onPress={() => categoryPressHandler("10")}>
                        <View style={{
                            height: 94,
                            width: 144,
                            borderColor: themecolor.blue,
                            borderWidth: 2,
                            marginVertical: 5,
                            borderRadius: 6,
                            backgroundColor: themecolor.bgimg,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,
                            elevation: 5,
                        }}>
                            <ImageBackground resizeMode={"stretch"} style={{
                                height: 90,
                                width: 140,
                            }} source={require("../../../assets/images/education.png")} />

                            <Text style={{
                                position: 'absolute',
                                top: 2,
                                left: 5,
                            }}>
                                <Text style={{
                                    color: themecolor.blue,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>
                                    Education
                                </Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

                        background={TouchableNativeFeedback.Ripple('#e6f2ff', false)}
                        onPress={() => categoryPressHandler("6")}>
                        <View style={{
                            height: 94,
                            width: 144,
                            borderColor: themecolor.blue,
                            marginVertical: 5,
                            borderWidth: 2,
                            borderRadius: 6,
                            backgroundColor: themecolor.bgimg,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,
                            elevation: 5,
                        }}>
                            <ImageBackground resizeMode={"stretch"} style={{
                                height: 90,
                                width: 140,
                            }} source={require("../../../assets/images/computer.png")} />
                            <Text style={{
                                position: 'absolute',
                                top: 2,
                                left: 5,
                            }}>
                                <Text style={{
                                    color: themecolor.blue,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>
                                    Computer
                        </Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

                        background={TouchableNativeFeedback.Ripple('#e6f2ff', false)}
                        onPress={() => categoryPressHandler("4")}>
                        <View style={{
                            height: 94,
                            width: 144,
                            borderColor: themecolor.blue,
                            borderWidth: 2,
                            marginVertical: 5,
                            borderRadius: 6,
                            backgroundColor: themecolor.bgimg,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,
                            elevation: 5,
                        }}>
                            <ImageBackground resizeMode={"stretch"} style={{
                                height: 90,
                                width: 140,
                            }} source={require("../../../assets/images/business.png")} />
                            <Text style={{
                                position: 'absolute',
                                top: 2,
                                left: 5,
                            }}>
                                <Text style={{
                                    position: 'absolute',
                                    color: themecolor.blue,
                                    left: 5,
                                    top: 2,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>
                                    Business
                                </Text>
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}

                        background={TouchableNativeFeedback.Ripple('#e6f2ff', false)}
                        onPress={() => categoryPressHandler("2")}>
                        <View style={{
                            height: 94,
                            width: 144,
                            borderColor: themecolor.blue,
                            borderWidth: 2,
                            marginVertical: 5,
                            borderRadius: 6,
                            backgroundColor: themecolor.bgimg,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.39,
                            shadowRadius: 8.30,
                            elevation: 5,
                        }}>

                            <ImageBackground resizeMode={"stretch"} style={{
                                height: 90,
                                width: 140,
                            }} source={require("../../../assets/images/art.png")} />
                            <Text style={{
                                position: 'absolute',
                                top: 2,
                                left: 5,
                            }}>
                                <Text style={{
                                    position: 'absolute',
                                    color: themecolor.blue,
                                    left: 5,
                                    top: 2,
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}>
                                    Art
                                </Text>
                            </Text>

                        </View>
                    </TouchableNativeFeedback>

                </View>
                <View style={{
                    // backgroundColor: 'yellow',
                    paddingVertical: 15,
                    // paddingHorizontal: 25
                }}>

                    {maincategory.map(item => <CategoryList key={item.cat_id} item={item} />)}

                </View>


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
                        <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible); setsubCategories(null) }}>
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
                                marginHorizontal: 20,
                                marginVertical: 15,
                            }}>
                                <Text style={{ fontSize: 19, width: '87%' ,color:themecolor.fontprimary}}>
                                    Subcategories of {title}
                                </Text>

                                <Pressable
                                    onPress={() => { setModalVisible(!modalVisible); setsubCategories(null) }}>
                                    <Feather size={25} name="x" style={{
                                        color: themecolor.blue
                                    }} />
                                </Pressable>

                            </View>
                            <View style={{ borderBottomWidth: 1, borderColor: themecolor.fontsecondary }} />

                            <View style={{ maxHeight: 378 }}>
                                <ScrollView>
                                    {(!subCategories) ? <ActivityIndicator size={"large"} color={themecolor.blue} /> : subCategories?.subcat_ids.map((item, index) => (
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
                                            key={index} onPress={() => subPressHandler(item.subcat_id, item.subcat_name)}>
                                            <View>
                                                <Text style={{ marginHorizontal: 26, fontSize: 15, marginVertical: 6, color: themecolor.fontprimary }}>{item.subcat_name}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))}

                                </ScrollView>
                            </View>
                        </View>
                    </View>


                </Modal>

            </ScrollView>
        </SafeAreaView >

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
export default Category;
