
import React, { useEffect, useState,useContext } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { TouchableNativeFeedback, Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, ActivityIndicator, TextInput, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import QuestionPaperBox from '../../Components/QuestionPaperBoxComponent';
import AllTheBest from '../../Components/AllTheBestComponent';
import SearchResultBook from '../../Components/SearchResultBookComponent';
import SyllabusBox from '../../Components/SyllabusBoxComponent';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';
import { LOCAL_URL } from "../../../config";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from "../../index"


function GTUMainSearch({ location }) {
    const themecolor = useContext(ThemeContext);
      
    const subcode = location.search.slice(9,)
    const [loading, setloading] = useState(false)
    const [datas, setdatas] = useState()
    const [books, setbooks] = useState()
    // console.log(subcode);
 

    useEffect(() => {
        
        let controller = new AbortController();

        const loadData = async () => {
            try {
                setloading(true)
                let url1 = `${LOCAL_URL}/syllabus/BE/` + subcode
                let url2 = `${LOCAL_URL}/papers/` + subcode
                let url3 = `${LOCAL_URL}/gtubooks/` + subcode


                const response1 = await fetch(url1, { signal: controller.signal });
                const response2 = await fetch(url2, { signal: controller.signal });
                const response3 = await fetch(url3, { signal: controller.signal });
                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();
                console.log("fetch: got response");
                console.log(data1);
                console.log(data2);
                console.log(data3);
                let data = {
                    syllabus: data1,
                    papers: data2,
                }
                console.log(data);
                setdatas(data);
                setbooks(data3[0])
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
    }, [])

    function onFolderClick(url) {
        let options = {
            toolbarColor:themecolor.blue,
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
             <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
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
                                color: themecolor.fontprimary,
                                fontSize: 20,
                            }}>{books.subcode} ({books.subname}) </Text>
                            <Text style={{ marginTop: 2 }}>Google drive link {index + 1}</Text>
                        </View>
                        <MaterialCommunityIcons size={25} name="google-drive" style={{
                            color: themecolor.fontprimary
                        }} />
                    </View>
                </View>
            </TouchableNativeFeedback>

        )
    }

    return (
        (loading) ? <ActivityIndicator style={{ flex: 1 }} size="large" color={themecolor.blue} /> :
            <ScrollView showsVerticalScrollIndicator={false}>

                {(datas?.syllabus) ? <View style={{
                    marginBottom: 20
                }}>
                    <Text style={{
                        marginHorizontal: 20,
                        marginVertical: 15,
                        fontSize: 22,
                        fontFamily:styles.baseText.fontFamily,
                        letterSpacing:styles.baseText.letterSpacing,
                        color:themecolor.fontprimary
                    }}>

                        <Text style={{ fontWeight: 'bold', color:themecolor.fontprimary }}>
                            Syllabus
                        </Text>
                    </Text>
                    {(datas.syllabus===404)?<Text style={{alignSelf:'center',fontSize:15,color:themecolor.blue}}>Data Not Found</Text>:
                    <SyllabusBox data={datas.syllabus} />}

                </View> : null}
                <View style={{
                    borderBottomColor: themecolor.fontsecondary,
                    borderBottomWidth: 1,
                    marginHorizontal: 25,
                }} />
                {(datas?.papers) ? <View style={{
                    marginBottom: 20
                }}>
                    <Text style={{
                        marginHorizontal: 20,
                        marginVertical: 15,
                        fontSize: 22,
                        fontFamily:styles.baseText.fontFamily,
                        letterSpacing:styles.baseText.letterSpacing,
                        color:themecolor.fontprimary
                    }}>

                        <Text style={{ fontWeight: 'bold' }}>
                            Question papers
                        </Text>
                    </Text>
                    {(datas.papers.length===0)?<Text style={{alignSelf:'center',fontSize:15,color:themecolor.blue}}>Data Not Found</Text>:null}
                    {datas.papers.map((paper, index) => <QuestionPaperBox key={index} paper={paper} />)}

                </View> : null}
                <View style={{
                    borderBottomColor: themecolor.fontsecondary,
                    borderBottomWidth: 1,
                    marginHorizontal: 25,
                }} />

               
                <AllTheBest />

            </ScrollView>


    );
}


const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    }
});
export default GTUMainSearch;
