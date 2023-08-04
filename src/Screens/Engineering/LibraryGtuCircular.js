
import React, { memo, Component, useState, useEffect ,useContext} from 'react';
import { StyleSheet, View, Text, Image, TouchableNativeFeedback, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, Linking, ActivityIndicator, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import { GTUHeader } from '../Engineering/GtuMainPage';
import { ThemeContext } from '../..';
import { LOCAL_URL } from '../../../config';
const Tab = createMaterialTopTabNavigator();



function CircularScreen({ route, navigation }) {
    const themecolor = useContext(ThemeContext);

    const [type, settype] = useState("recent")

    const categories = ['All Circular', 'Important']
    const [selectedCategory, setselectedCategory] = useState(0)
    const openLinkHandler = (url) => {
        let options = {
            toolbarColor: '#0F65CA',
            enableUrlBarHiding: false,
            showPageTitle: true,
            enableDefaultShare: true,
            animations: ANIMATIONS_SLIDE,
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url, options).then((launched) => {
            console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />

            <View style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 17,
                paddingHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: styles.baseText.fontFamily,
                    letterSpacing: styles.baseText.letterSpacing,
                }}>
                    <Text style={{
                        fontSize: 22,
                        color: themecolor.fontprimary,
                        fontWeight: 'bold'
                    }}>
                        Circular
                        </Text>
                </Text>
                 <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler('https://www.gtu.ac.in/Circular.aspx')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ color: themecolor.blue }}>
                            Go to Website
                            </Text>
                        <Feather size={22} name="chevron-right" style={{
                            color: themecolor.blue
                        }} />

                    </View>
                </TouchableNativeFeedback>

            </View>


            <CircularNavigator />

        </SafeAreaView >
    );
}


const AllCircular = ({ route }) => {
    // console.log(route);
    const themecolor = useContext(ThemeContext);

    const [loading, setloading] = useState(false)
    const [datas, setdatas] = useState(null)

    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let url = LOCAL_URL+"/circular/" + "recent";

                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                console.log("fetch: got response");
                // console.log(data);
                setdatas(data);
                setloading(false);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log(error);
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        };
        loadData();

        return () => {
            controller.abort();
        };
    }, []);

    return (

        <View style={{
            backgroundColor: themecolor.bgcolor,
            height:"100%",
            justifyContent:'center'  
        }}>
            {(!loading) ? <FlatList showsVerticalScrollIndicator={false}
                data={datas}
                renderItem={({ item, index }) => <CircularBox index={index} ptags={item.ptags} date={item.date} />}
                keyExtractor={item => item._id}
            /> : <ActivityIndicator size="large" color={themecolor.blue} />}
        </View>
    )
}


const Important = () => {
    const themecolor = useContext(ThemeContext);

    const [loading, setloading] = useState(false)
    const [datas, setdatas] = useState(null)
    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let url = LOCAL_URL+"/circular/" + "important";

                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                console.log("fetch: got response");
                // console.log(data);
                setdatas(data);
                setloading(false);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log(error)
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        };
        loadData();

        return () => {
            controller.abort();
        };
    }, []);

    return (

        <View style={{
            backgroundColor: themecolor.bgcolor,
            height:"100%",
            justifyContent:'center'  
        }}>
            {(!loading) ? <FlatList showsVerticalScrollIndicator={false}
                data={datas}
                renderItem={({ item, index }) => <CircularBox index={index} ptags={item.ptags} date={item.date} />}
                keyExtractor={item => item._id}
            /> : <ActivityIndicator size="large" color={themecolor.blue} />}
        </View>
    )
}


export const CircularBox = ({ index, ptags, date }) => {
    var bgbox1;
  

    if (index % 2 == 1) {
        bgbox1 = '#d9d9d9'
    } else {
        bgbox1 = '#88bcf7'
    }
    return (

        <View style={{
            marginVertical: 3,
            marginHorizontal: 20,
            padding: 5,
            paddingTop: 0,
            // flexDirection:'row',
            backgroundColor: bgbox1,
            alignItems: 'center',
            borderRadius: 5
        }}  >


            {(date) ? <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
                height: 35,
                borderBottomEndRadius: 5,
                borderBottomStartRadius: 5,
                padding: 10,
            }}>
                <Text style={{
                    color: '#fff'
                }}>{date}</Text>

            </View> : null}
            <View style={{
                padding: 5,
                paddingTop: 0,
            }}>
                {ptags.map((ptag, index) => <Ptagcustom key={index} ptext={ptag.ptext} atags={ptag.atags} />)}
            </View>
        </View>
    )
}

export const Ptagcustom = ({ ptext, atags }) => {
    if (ptext == " | ") ptext = ""
    return (<>
        <Text style={{
            fontSize: 15,
            color: '#000',
            marginVertical: 7,
            textAlign: 'justify'
        }}>&#8226; {ptext}
            {atags.map((atag, index) => <Atag key={index} text={atag.atext} link={atag.link} />)}
        </Text>
    </>
    )
}

export const Atag = ({ text, link }) => {
    const navigation = useNavigation();

    const linkHandler = (url) => {

        if (url.slice(-3) === "pdf") {
            navigation.navigate("PdfReaderScreen", { link: link })
        } else {
            CustomTabs.openURL(url).then((launched) => {
                console.log(`Launched custom tabs: ${launched}`);
            }).catch(err => {
                console.error(err)
            });
        }
    }
    return (<><Text style={{ color: '#093c77' }}
        onPress={() => linkHandler(link)} >
        {text}
    </Text><Text> | </Text>
    </>)
}

const CircularNavigator = () => {
    const themecolor = useContext(ThemeContext);
    
    return (

        <Tab.Navigator tabBarOptions={{
            activeTintColor: themecolor.blue,
            inactiveTintColor: themecolor.fontprimary,
            style: { color: "black",backgroundColor:themecolor.bgcolor },
            labelStyle: {
                fontSize: 15,
                letterSpacing: styles.normalText.letterSpacing,
                fontFamily: styles.baseText.fontFamily,
                textTransform: 'none'
            }
        }} >
            <Tab.Screen name="All Circular" component={AllCircular} />
            <Tab.Screen name="Important" component={Important} />

        </Tab.Navigator>

    )
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
    },
    normalText: {
        letterSpacing: 0.5
    }
});
export default CircularScreen;
