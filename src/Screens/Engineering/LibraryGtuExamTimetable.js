
import React, { memo, Component, useEffect, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, VirtualizedList, ActivityIndicator, Alert, TouchableNativeFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { GTUHeader } from '../Engineering/GtuMainPage';
import {ThemeContext} from "../../index"
import { LOCAL_URL } from '../../../config';

function TimetableScreen() {
    const themecolor = useContext(ThemeContext);
    const [degree, setdegree] = useState("BE")
    const [sems, setsems] = useState([{ label: "Select sem", value: "select sem" }])
    const [selectedSem, setselectedSem] = useState("Select sem")
    const [ttdata, setTtdata] = useState()
    const [branch, setbranch] = useState()
    const [loading, setloading] = useState(false)


    useEffect(() => {
        let controller = new AbortController();

        const loadData = async () => {
            try {
                var temp = []

                // let url = "http://3.20.8.168:2853/timetable/"+degree ;
                let url = LOCAL_URL+"/timetable/" + degree;
                // console.log(url);
                const response = await fetch(url, { signal: controller.signal });
                const data = await response.json();
                console.log("fetch: got response");
                // console.log(data);
                delete data.sem[0]
                data.sem.map(sem => temp.push({ label: sem, value: sem }))
                setsems(temp);
                setselectedSem(sems[0].value)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("FetchCancel: caught abort");
                } else {
                    console.log("problem" + error);
                    Alert.alert("Server Error", "Please try again after some time.");
                }
            }
        };
        loadData();

        return () => {
            controller.abort();
        };
    }, [degree]);


    async function onSubmitHandler() {
        setloading(true);

        let url = LOCAL_URL+"/timetable/" + degree + "/" + selectedSem.replace(" ", "-").replace("/", "_") + "/" + branch;
        // console.log(url);
        try {
            let ttdata = await fetch(url).then(response => response.json()).then(data => data)
            // console.log(ttdata);
            setTtdata(ttdata)
            setloading(false);
        } catch (e) {
            console.log(e);
        }
    }
    const openLinkHandler = (url) => {
        let options = {
            toolbarColor: '#0F65CA',
            enableUrlBarHiding: false,
            showPageTitle: true,
            enableDefaultShare: true,
            animations: ANIMATIONS_SLIDE,
            forceCloseOnRedirection: true,
        }
        CustomTabs.openURL(url,options).then((launched) => {
            console.log(`Launched custom tabs: ${launched}`);
        }).catch(err => {
            console.error(err)
        });
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
            <GTUHeader />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{
                    // backgroundColor: 'red',
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
                            Exam Timetable (Winter 2020)
                    </Text>
                     <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={() => openLinkHandler('https://timetable.gtu.ac.in/')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ color: themecolor.blue}}>
                            Go to Website
                            </Text>
                        <Feather size={22} name="chevron-right" style={{
                            color: themecolor.blue
                        }} />

                    </View>
                </TouchableNativeFeedback>
                    </Text>
                    <View style={{
                        marginBottom: 100,
                        marginTop: 10
                    }}>
                        <View style={{
                            width: '100%'
                        }}>
                            <DropDownPicker
                                items={[
                                    { label: 'BA-BACHELOR OF ARCHITECTURE', value: 'BA' },
                                    { label: 'BE-BACHELOR OF ENGINEERING', value: 'BE' },
                                    { label: 'BH-BACHELOR OF HOTEL MANAGEMENT AND CATERING TECHNOLOGY', value: 'BH' },
                                    { label: 'BI-Bachelor of Interior Design', value: 'BI' },
                                    { label: 'BL-BACHELOR OF PLANNING', value: 'BL' },
                                    { label: 'BP-BACHELOR OF PHARMACY', value: 'BP' },
                                    { label: 'BV-Bachelor of Vocation', value: 'BV' },
                                    { label: 'DA-DIPLOMA IN ARCHITECTURE', value: 'DA' },
                                    { label: 'DI-DIPLOMA IN ENGINEERING', value: 'DI' },
                                    { label: 'DP-DIPLOMA IN PHARMACY', value: 'DP' },
                                    { label: 'DV-Diploma in Vocation', value: 'DV' },
                                    { label: 'IC-MASTER OF COMPUTER APPLICATIONS (INTEGRATED)', value: 'IC' },
                                    { label: 'MA-MASTER OF BUSINESS ADMINISTRATION (INTEGRATED / APPLIED MANAGEMENT)', value: 'MA' },
                                    { label: 'MB-MASTER OF BUSINESS ADMINISTRATION', value: 'MB' },
                                    { label: 'MC-MASTER OF COMPUTER APPLICATIONS', value: 'MC' },
                                    { label: 'ME-MASTER OF ENGINEERING', value: 'ME' },
                                    { label: 'MP-MASTER OF PHARMACY', value: 'MP' },
                                    { label: 'MR-Master of Architecture', value: 'MR' },
                                    { label: 'PD-POST DIPLOMA DEGREE COURSE', value: 'PD' },
                                    { label: 'VM-B.Voc Managment(Banking Finance Services and Insurance)', value: 'VM' },
                                ]}
                                defaultValue={degree}
                                containerStyle={{ height: 35 }}
                                style={{ backgroundColor: themecolor.gray }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                    color: themecolor.fontprimary
                                }}
                                dropDownStyle={{ backgroundColor: themecolor.gray, width: '100%' }}
                                onChangeItem={item => setdegree(item.value)}
                            />

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                width: '50%'
                            }}>
                                <DropDownPicker
                                    items={sems}
                                    // defaultValue={selectedSem}
                                    containerStyle={{ height: 35 }}
                                    style={{ backgroundColor: themecolor.gray}}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                        color : themecolor.fontprimary
                                    }}
                                    dropDownStyle={{ backgroundColor: themecolor.gray, width: '100%' }}
                                    onChangeItem={item => setselectedSem(item.value)}

                                />
                            </View>


                            <TextInput placeholderTextColor={themecolor.gray} keyboardType="numeric" maxLength={2} style={{
                                backgroundColor: themecolor.bgcolor,
                                fontSize: 16,
                                color: themecolor.fontprimary,
                                borderBottomWidth: 1,
                                borderBottomColor: themecolor.gray,
                                marginRight: 10

                            }} onChangeText={(text) => (selectedSem !== "1/2") ? setbranch(text) : setbranch("00")} onSubmitEditing={onSubmitHandler} placeholder={'Branch Code'} />


                        </View>
                         <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={onSubmitHandler} style={{
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                width: '100%',
                                height: 35,
                                backgroundColor: themecolor.blue,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5
                            }}>
                                <Text style={{
                                    fontFamily: styles.baseText.fontFamily,
                                    letterSpacing: styles.normalText.letterSpacing,
                                    color: '#fff',
                                    fontSize: 15
                                }}>Search</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={{
                    // backgroundColor: 'yellow'
                }}>
                    <View style={{
                        borderBottomColor: themecolor.gray,
                        borderBottomWidth: 1,
                        marginHorizontal: 25,
                    }} />

                    {(ttdata == []) ? <Text style={{color:themecolor.fontprimary}}>No data found</Text> : null}

                    {(!loading) ? <FlatList showsVerticalScrollIndicator={false}
                        data={ttdata}
                        renderItem={({ item, index }) => <BookCover2 index={index} subname={item.subname} subcode={item.subcode} date={item.date} olddate={item.olddate} time={item.time} />}
                        keyExtractor={item => item._id}
                    /> : <ActivityIndicator size="large" color={themecolor.blue} />}


                </View>

            </ScrollView>

        </SafeAreaView >
    );
}


const BookCover2 = ({ subcode, subname, time, date, olddate, index }) => {
    var bgbox1, circle1;

    if (index % 2 == 1) {
        bgbox1 = '#d9d9d9'
        circle1 = '#999999'
    } else {
        bgbox1 = '#88bcf7'
        circle1 = '#4093f2'
    }
    return (
        <View style={{
            marginVertical: 3,
            marginHorizontal: 20,
            padding: 5,
            flexDirection: 'row',
            backgroundColor: bgbox1,
            alignItems: 'center',
            borderRadius: 5
        }}  >
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: circle1,
                height: 90,
                width: 90,
                borderRadius: 50,
                padding: 10
            }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: '#000'
                }}>{date.slice(0, 2)}</Text>
                <Text style={{
                    color: '#000'
                }}>{date.slice(3, 6)}</Text>
                <Text style={{
                    fontSize: 17,
                    color: '#000'
                }}>{date.slice(7,)}</Text>

            </View>
            <View style={{
                // backgroundColor:'violet',
                marginLeft: 5,
                justifyContent: 'center',
                width: '70%'
            }}>
                <Text numberOfLines={2} style={{
                    fontSize: 18,
                    color: '#000'
                }}>{subname}</Text>
                <Text style={{
                    color: '#000'

                }}>{subcode}
                    {(olddate !== "") ? <Text style={{ color: 'red', fontSize: 12 }}>(Old Date: {olddate})</Text> : null
                    }</Text>
                <Text style={{
                    color: '#000'
                }}>{time}</Text>
            </View>

        </View>
    )
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
export default TimetableScreen;