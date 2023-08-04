import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput, TouchableNativeFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import colors from '../../config/theme';

let themecolor = colors.dark;

function SyllabusBox({ data }) {
    // console.log(data);
    (!data) ? data = {
        "_id": "606b21461ac905496f90a073",
        "subcode": "3140705",
        "pdflink": "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/Syallbus/3140705.pdf",
        "branchcode": "07",
        "efffrom": "2018-19",
        "subname": "Object Oriented Programming -I",
        "category": "Professional Core",
        "sem": "4",
        "l": "4",
        "t": "0",
        "p": "2",
        "totalcredit": "5",
        "e": "70",
        "m": "30",
        "i": "20",
        "v": "30",
        "totalmarks": "150"
    } : null
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()

    function viewHandler() {
        setModalVisible(false);
        navigation.navigate("PdfReaderScreen", { link: data.pdflink })
    }
    return (
        <Pressable
            onPress={() => setModalVisible(true)}>

            <View style={{
                marginVertical: 8,
                marginHorizontal: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
                paddingTop: 5,
                backgroundColor: '#88bcf7',
                borderRadius: 5
            }}  >
                <View style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#000',
                        fontSize: 22,
                    }}>{data.subcode}</Text>
                             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", false)}
 onPress={viewHandler} >
                   
                        <Feather size={25} name="book-open" style={{
                            color: '#000'
                        }} />
                    </TouchableNativeFeedback>
                </View>

                <View style={{ borderBottomWidth: 1, borderColor: '#666666' }} />
                <Text style={{
                    color: '#000',
                    fontSize: 18,
                }}>{data.subname}</Text>

                <Text style={{
                    color: '#000',
                    fontSize: 15,
                    marginTop: 2
                }}>Sem : {data.sem} 
                {/* |  Creadit : {data.totalcredit} */}
                </Text>
                <Text style={{
                    color: '#000',
                    fontSize: 15,
                    marginTop: 2
                }}>Effective from : {data.efffrom}</Text>

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
                    <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
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
                            marginHorizontal: 15,
                            marginVertical: 15
                        }}>
                            <View style={{
                                maxWidth: '85%'
                            }}>
                                <Text style={{
                                    color: themecolor.fontprimary,
                                    fontSize: 22,
                                }}>{data.subcode}</Text>
                                <Text style={{
                                    color: themecolor.fontprimary,
                                    fontSize: 18,
                                }}>{data.subname}</Text>
                            </View>
                             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={viewHandler} >

                                <Feather size={25} name="book-open" style={{
                                    marginRight: 5,
                                    color: themecolor.blue
                                }} />
                            </TouchableNativeFeedback>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: themecolor.gray }} />

                        <View style={{
                            marginHorizontal: 26,
                            marginVertical: 10,
                            height: 410,
                            flexDirection: 'column',
                            justifyContent: 'space-evenly' 
                        }}>
                            <Text style={{ fontSize: 16 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Branch :  </Text>{data.branchcode}</Text>
                            <Text style={{ fontSize: 16 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Sem :  </Text>{data.sem}</Text>
                            {/* <Text style={{ fontSize: 16 }}><Text style={{ fontWeight: 'bold' }}>Credit :  </Text>{data.totalcredit}</Text> */}
                            <Text style={{ fontSize: 16 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Category :  </Text>{data.category}</Text>
                            <Text style={{ fontSize: 16 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Effective from :  </Text>{data.efffrom}</Text>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 ,color:themecolor.fontprimary}}>Teaching hours (Weekly)</Text>
                                <View style={{ marginLeft: 15, marginTop: 3 }}>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Leacture :  </Text>{data.l} hours</Text>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Tutorial :  </Text>{data.t} hours</Text>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Practile :  </Text>{data.p} hours</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 ,color:themecolor.fontprimary}}>Evalution out of {data.totalmarks} Marks</Text>
                                <View style={{ marginLeft: 15, marginTop: 3 }}>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>End Sem Examination :  </Text>{data.e} marks</Text>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Mid Sem Examination :  </Text>{data.m} marks</Text>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Internal Marks :  </Text>{data.i} marks</Text>
                                    <Text style={{ fontSize: 15 ,color:themecolor.fontprimary}}><Text style={{ fontWeight: 'bold' }}>Viva Marks :  </Text>{data.v} marks</Text>
                                </View>
                            </View>
                             <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, false)}
 onPress={viewHandler} >
                                <View style={{
                                    backgroundColor: themecolor.blue,
                                    width: '100%',
                                    borderRadius: 7,
                                    marginTop: 5,
                                    padding: 7
                                }}>
                                    <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center' }}>View Syllabus</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </Modal>

        </Pressable>

    )
}

export default SyllabusBox
