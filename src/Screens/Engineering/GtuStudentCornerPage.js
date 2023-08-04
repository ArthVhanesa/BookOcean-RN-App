
import React, { memo, Component } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
// import ScrollHor from '../../../FIN/src/Components/ScrollHor';
// import EStyleSheet from 'react-native-extended-stylesheet';



function StudentCorner() {
    return (

        <SafeAreaView style={{ flex: 1, paddingTop: 35, backgroundColor: 'white' }} >

            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                padding: 13,
                alignItems: 'center',
                borderBottomColor: '#a6a6a6',
                borderBottomWidth: 1

            }}>
                <Feather size={25} name="arrow-left" style={{
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0F65CA'
                }} />
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    fontSize: 20,
                    marginLeft: 10
                }}>Engineering</Text>

            </View>
            <View style={{
                // backgroundColor: 'yellow',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 17,
                paddingHorizontal: 20,
                justifyContent: 'space-between'
            }}>
                <View style={{
                    // backgroundColor:'red'
                }}>

                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        fontSize: 25,
                        fontWeight: 'bold'
                    }}>
                        GTU
                        </Text>


                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        color: '#404040'
                    }}>
                        Gujarat Technological University
                        </Text>
                </View>

                <Image resizeMode={"stretch"} style={{
                    height: 50,
                    width: 40,
                }} source={require("../../../assets/images/GTU.png")} />
            </View>
            <View style={{
                borderBottomColor: '#808080',
                borderBottomWidth: 1,
                marginHorizontal: 20,

            }} />
            <ScrollView>

                <View style={{
                    // backgroundColor: 'red',
                    paddingVertical: 17,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: '#000',
                        fontWeight: 'bold'
                    }}>
                        Circular
                    </Text>

                </View>
                <View style={{
                    // backgroundColor: 'yellow'
                }}>
                    {/* <View style={{
                        borderBottomColor: '#808080',
                        borderBottomWidth: 1,
                        marginHorizontal: 25,
                    }} /> */}
                    <BookCover />
                    <BookCover2 />
                    <BookCover />
                    <BookCover2 />
                    <BookCover />
                    <BookCover2 />
                    <BookCover />
                    <BookCover2 />
                    <BookCover />
                    <BookCover2 />

                </View>

            </ScrollView>

        </SafeAreaView >
    );
}


const BookCover2 = () => {
    return (
        <View style={{
            marginVertical: 3,
            marginHorizontal: 20,
            padding: 5,
            paddingTop: 0,
            // flexDirection:'row',
            backgroundColor: '#d9d9d9',
            alignItems: 'center',
            borderRadius: 5
        }}  >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 35,
                borderBottomEndRadius: 5,
                borderBottomStartRadius: 5,
                padding: 10
            }}>
                <Text style={{
                    color: '#fff'
                }}>12 March 2020</Text>

            </View>
            <View style={{
                padding:5,
            }}>
                <Text style={{
                    fontSize: 15,
                    color: '#000'
                }}>Virtual Sessions with Overseas Employment & Career Information Centre in collaboration with Indo American Education Society | Brochure | Link for registration</Text>

            </View>


        </View>
    )
}

const BookCover = () => {
    return (
        <View style={{
            marginVertical: 3,
            marginHorizontal: 20,
            padding: 5,
            paddingTop: 0,
            // flexDirection:'row',
            backgroundColor: '#88bcf7',
            alignItems: 'center',
            borderRadius: 5
        }}  >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 35,
                borderBottomEndRadius: 5,
                borderBottomStartRadius: 5,
                padding: 10
            }}>
                <Text style={{
                    color: '#fff'
                }}>12 March 2020</Text>

            </View>
            <View style={{
                padding:5,
            }}>
                <Text style={{
                    fontSize: 15,
                    color: '#000'
                }}>Virtual Sessions with Overseas Employment & Career Information Centre in collaboration with Indo American Education Society | Brochure | Link for registration</Text>

            </View>


        </View>
    )
}





const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});
export default StudentCorner;
