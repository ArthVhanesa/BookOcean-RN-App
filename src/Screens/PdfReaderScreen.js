import React,{useState} from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { StyleSheet, Dimensions, View, TouchableNativeFeedback, Text, ToastAndroid } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Pdf from 'react-native-pdf';

const PdfReaderScreen = ({ route }) => {
    // console.log(route.params.link);
    const source = { uri: route.params.link, cache: true };
    const navigation = useNavigation();
    const [currentPage, setcurrentPage] = useState(0);
    const[total,settotal]=useState();
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};


    return (

        <View style={styles.container} >
            <View style={{
                backgroundColor: '#0F65CA',
                flexDirection: 'row',
                paddingHorizontal: 13,
                paddingVertical: 13,
                height: 55,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomColor: '#cccccc',
                borderBottomWidth: 1,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ borderRadius: 50 }}>
                         <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple("#b8d7fa", true)}
 onPress={() => navigation.goBack()}>
                            <View style={{ padding: 2 }}>
                                <Feather size={23} name="arrow-left" style={{
                                    // backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white'
                                }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        marginLeft: 17,
                    }}>Pdf Viewer</Text>
                </View>
                <View>
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        marginLeft: 17,
                    }}>
                       [ {currentPage}/{total} ]
                    </Text>
                </View>
            </View>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    settotal(numberOfPages);
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    setcurrentPage(page);
                    // console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                    ToastAndroid.show("Oops! Looks like book is not there",ToastAndroid.LONG);
                    navigation.goBack();
                }}
                onPressLink={(uri) => {
                    console.log(`Link presse: ${uri}`)
                }}
                horizontal={false}
                style={styles.pdf} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        marginTop: 0,

    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    },
    normalText: {
        letterSpacing: 0.5
    }
});

export default PdfReaderScreen;