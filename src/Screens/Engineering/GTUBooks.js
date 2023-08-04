
import React, { memo, useState } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, TouchableNativeFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllTheBest from '../../Components/AllTheBestComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { LOCAL_URL } from '../../../config';
import { CustomTabs,ANIMATIONS_FADE,ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import { GTUHeader } from '../Engineering/GtuMainPage'


function GTUBookScreen() {

    const [subcode, setsubcode] = useState("")
    const [books, setbooks] = useState()
    const [loading, setloading] = useState()


    async function searchhandler() {
        // console.log(subcode)
        setloading(true)
        try {
            let result = await fetch(`${LOCAL_URL}/gtubooks/` + subcode).then(res => res.json()).then(data => data)
            // console.log(result);
            if (!result[0])setbooks(404)
            else
            setbooks(result[0]);
        setloading(false)

        } catch (error) {
            console.log("e:" + error)
        }
    }

    function onFolderClick(url) {
        let options = {
            toolbarColor: '#0F65CA',
            enableUrlBarHiding: false,
            showPageTitle: true,
            enableDefaultShare: true,
            animations: ANIMATIONS_SLIDE,
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url,options).then((launched) => {
            // console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }

    
const FolderComponent = ({ link, index }) => {
    // console.log(link);
    return (
         <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
 onPress={() => onFolderClick(link)}>

            <View style={{
                marginVertical: 8,
                marginHorizontal: 20,
                paddingHorizontal: 15,
                paddingVertical: 7,
                backgroundColor: '#88bcf7',
                borderRadius: 5
            }}  >
                <View style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={{
                            color: '#000',
                            fontSize: 20,
                        }}>{books.subcode} ({books.subname}) </Text>
                        <Text style={{ marginTop: 2 }}>Google drive link {index + 1}</Text>
                    </View>
                    <MaterialCommunityIcons size={25} name="google-drive" style={{
                        color: '#000'
                    }} />
                </View>                  
             </View>                   
        </TouchableNativeFeedback>
         
    )
}


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <GTUHeader />



            <ScrollView>

                <View style={{
                    // backgroundColor: 'red',
                    paddingVertical: 17,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.baseText.letterSpacing,
                        fontSize: 22,
                        color: '#000',
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            GTU Books
                        </Text>
                    </Text>

                </View>
                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 25
                    // backgroundColor:'red'
                }}>



                    <TextInput placeholderTextColor="#A9A9A9" keyboardType="numeric" maxLength={7} onChangeText={(text) => setsubcode(text)} onSubmitEditing={searchhandler} style={{
                        backgroundColor: 'white',
                        fontFamily: styles.baseText.fontFamily,
                        letterSpacing: styles.normalText.letterSpacing,
                        fontSize: 17,
                        color:"black",
                        borderBottomWidth: 1,
                        borderBottomColor: '#808080',
                        width: '70%'
                    }} placeholder={'Enter subject code'} />

                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
 onPress={searchhandler}>
                        <View style={{
                            backgroundColor: '#0F65CA',
                            paddingHorizontal: 13,
                            paddingVertical: 7,
                            borderRadius: 5
                        }}>
                            <Text style={{

                                fontFamily: styles.baseText.fontFamily,
                                letterSpacing: styles.normalText.fontFamily,
                                color: 'white',
                                fontSize: 17
                            }}>Search</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {(loading)? <ActivityIndicator style={{ flex: 1 }} size="large" color="#0F65CA" />:null}
                          
                          {(books!==404)? books?.drivelinks.map((item, index) => <FolderComponent key={index} index={index} link={item} />):null}
                                  <Text style={{alignSelf:'center',fontSize:15,color:'#0F65CA'}}>{(books===404 )?"No data Found":null}</Text>
                <AllTheBest />
            </ScrollView>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8,
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default GTUBookScreen;