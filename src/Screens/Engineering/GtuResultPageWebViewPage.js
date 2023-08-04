
import React, { memo, Component } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CustomTabs } from 'react-native-custom-tabs';
import { GTUHeader } from '../Engineering/GtuMainPage';
import { WebView } from 'react-native-webview';


function GTUWebView({ route }) {
    const link = route.params.link

    const openLinkHandler = (url) => {
        let options = {
            toolbarColor: '#0F65CA',
            enableUrlBarHiding: true,
            showPageTitle: true,
            enableDefaultShare: true,
            // animations: ANIMATIONS_FADE,
            animations: {
                startEnter: 'slide_up',
                startExit: 'android:anim/fade_out',
                endEnter: 'android:anim/fade_in',
                endExit: 'slide_down',
            },
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url, options).then((launched) => {
            console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <GTUHeader />

            <ScrollView>

                <View style={{
                    // backgroundColor: 'red',                    
                    paddingTop: 10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        fontSize: 22,
                        color: '#000',
                        // fontWeight: ''
                    }}>
                        Result
                    </Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: '#0F65CA',
                        fontFamily: styles.baseText.fontFamily,

                        }} onPress={() => openLinkHandler(link)}>
                            Go to Website
                        </Text>
                        <Feather size={20} name="chevron-right" style={{
                            color: '#0F65CA'
                        }} />
                    </View>

                </View>
                <View style={{
                    marginTop: 7,
                    borderBottomColor: '#000',
                    borderBottomWidth: 2,
                    marginHorizontal: 20,
                }} />


                <View style={{
                    flex: 1,
                    width: '100%',
                    paddingTop: 15,
                    // paddingHorizontal: 20,
                }}>
                    <WebView
                        scrollEnabled={false}
                        source={{ uri: link }}
                        style={{ flex: 1 }}
                        startInLoadingState
                    />
                </View>

            </ScrollView>

        </SafeAreaView >
    );
}



const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});
export default GTUWebView;









