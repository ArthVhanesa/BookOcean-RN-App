
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, Modal, Pressable, TouchableNativeFeedback, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import { Link } from "react-router-native";
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from "../../index"


function PrivacyPolicy() {

    const themecolor = useContext(ThemeContext);
  
    const [modalVisible, setModalVisible] = useState(false);
    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >

            <View style={{
                backgroundColor: themecolor.bgcolor,
                flexDirection: 'row',
                paddingHorizontal: 13,
                paddingVertical: 13,
                height: 55,
                alignItems: 'center',
                borderBottomColor: themecolor.fontsecondary,
                borderBottomWidth: 1
            }}>
                <Link to="/" component={TouchableNativeFeedback}
>

                    <View style={{ padding: 2 }}>
                        <Feather size={23} name="arrow-left" style={{
                            // backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: themecolor.blue
                        }} />
                    </View>
                </Link>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    fontSize: 20,
                    marginLeft: 17,
                    color:themecolor.fontprimary
                }}>Privacy policy</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                }}>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: themecolor.blue }}>Privacy policy</Text>
                        <View style={{ marginVertical: 25 }}>
                            <Text style={{ fontSize: 18 ,color:themecolor.fontprimary}}>Also read our <Text style={{ fontWeight: 'bold' }}>Terms of use</Text></Text>
                            <Text style={{ marginTop: 15, fontSize: 15, textAlign: 'justify' ,color:themecolor.fontprimary}}> We do not store any of your personal information and any personal data. </Text>
                            {/* <Text style={{ marginTop: 15, fontSize: 15, textAlign: 'justify' }}>(ii) In GTU section, Enrollment number is stored temporary on your mobile phone if you entered. It is optional.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, textAlign: 'justify' }}>(iii) We do not store your enrollment number in our database.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, textAlign: 'justify' }}>(iv) BookOcean needs only storage permission for just to store your downloaded books in your mobile phone which you can read offline.</Text> */}

                        </View>
                    </View>

                </View>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                    alignSelf: 'center',
                    fontSize: 25,
                    marginBottom: 25,
                    color: themecolor.blue
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                    }}>BookOcean
                    </Text>
                </Text>



            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.5
    }
});
export default PrivacyPolicy;