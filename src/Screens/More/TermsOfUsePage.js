
import React, { memo, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { KeyboardAvoidingView, Modal, Pressable, TouchableNativeFeedback, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import { Link } from "react-router-native";
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from "../../index"

function TermsOfUse() {

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
                }}>Terms of use</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingVertical: 13,
                    paddingHorizontal: 20,
                }}>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: themecolor.blue }}>Terms of use</Text>
                        <View style={{ marginVertical: 25 }}>
                            <Text style={{ fontSize: 18,  color:themecolor.fontprimary,}}>Also read our <Text style={{ fontWeight: 'bold' }}>Privacy policy</Text></Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>BookOcan is a mobile application that provides users with access to discover, download, read books from Library Genesis (LibGen). BookOcean is not an official Library genesis app. The Service is open to the public.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>Please read these terms of use (“Terms”) and BookOcean’ privacy policy (“Privacy”) carefully. These Terms and Privacy govern and apply to your access and use of BookOcean eBook application. By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>Although we may attempt to notify you when major changes are made to these Terms of Service, you should periodically review the most up-to-date version in this app. BookOcean may, in its sole discretion, modify or revise these Terms of Service and policies at any time, and you agree to be bound by such modifications or revisions. Nothing in this Agreement shall be deemed to confer any third-party rights or benefits.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify', fontWeight: 'bold' }}>1. USE OF THE SERVICE</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>As long as you comply with these Terms, you have the right to download and install App to your mobile device, and to access and use the Service, for your own personal use. </Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(i) You agree not to distribute in any medium any part of design of the app without BookOcean’ prior written authorization.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(ii)  You agree not to alter or modify any part of the app. </Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(iii) You agree not to decompile, reverse- engineer, disassemble, or create derivative works of the App or the Service. </Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(iv) You agree not to use the app for any commercial use, without the prior written authorization of BookOcean.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify', fontWeight: 'bold' }}>2. MOBILE APPLICATION</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>A. These Terms of Service apply to all users of the BookOcean mobile app.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>B. <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>For Ebook browser :-</Text></Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(i) BookOcean is not an official Library genesis app.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(ii) BookOcean is unofficial Mobile browser and downloader of biggest ebooks library LibGen.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(iii) This app uses the APIs provided by the Libgen website itself and BookOcean is not associated with Library genesis.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(iv) All PDFs are provided by the public third-party service http://gen.lib.rus.ec .</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(v) All trademarks and copyrights belong to their respective owners and areused here under the terms of Fair Use.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(vi) We do not store any digital format of any books and other user data in our SERVERS.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(vii) The content provided in this application is hosted by LibGen and is available on the website / public domain. BookOcean is not the publisher of any books/materials.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(viii) We do not upload any e-books.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(ix) This application is just a way to organize, browse, view, and find e-books on LibGen.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(x) The BookOcean app contain links to or content from LibGen that are not owned or controlled by BookOcean.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(xi) BookOcean has no control over,  and assumes no responsibility for, the content, privacy policies, or practices of LibGen websites.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(xii) In addition, BookOcean will not and cannot censor or edit the content of any LibGen site.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(xiii) By using the app, you expressly relieve BookOcean from any and all liability arising from your use of any LibGen content.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify', fontStyle: 'italic', textDecorationLine: 'underline' }}>For GTU-Info:-</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(i) All GTU information is provided from official GTU website (https://www.gtu.ac.in). We are just providing bridge between user and website.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>(ii) We are not store any of your data in our database. Enrollment number is stored temporary on your mobile phone if you entered. It is optional.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>C. All e-books offered on the App have been identified as being in the public domain by LibGen. BookOcean does not verify the accuracy of LibGen designations and is not liable for any damage that may result from the downloading or other use of such literary works by you. If you do not reside in the relevant jurisdiction for which the LibGen designation has been made, it is your responsibility to check the laws of your country of residence prior to downloading or accessing such literary works.</Text>
                            <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}>Our Service may change from time to time and/or we may stop (permanently or temporarily) providing the Service (or features within the Service), possibly without prior notice to you. Our Service may, at some point, include advertisements, which may be targeted to the content or information on the Service, queries made through the Service, or from other information. Your dealings with or participation in promotions of advertisers found on BookOcean. The types and extent of advertising on the Service are also subject to change over time. In consideration for providing you the Service, you agree that we and our third party providers and partners may place advertising on our Service or in connection with the display of content or information on our Service.</Text>
                            {/* <Text style={{ marginTop: 15, fontSize: 15, color:themecolor.fontprimary, textAlign: 'justify' }}></Text> */}
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
        letterSpacing:0.5
    }
});
export default TermsOfUse;