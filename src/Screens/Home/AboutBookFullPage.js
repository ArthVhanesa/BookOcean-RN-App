
import React, { memo,useContext} from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet,Animated, TouchableNativeFeedback, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../../'

function FullBookDetail({ route, navigation }) {
    const themecolor = useContext(ThemeContext);

    const data = route.params.data
    const pages = route.params.pages;

    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 55)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55]
    })

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themecolor.bgcolor }} >
           <View style={{
                flex: 1
            }}>
                 <Animated.View style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    height:55,
                    elevation: 4,
                    zIndex:100
                }}>
            <View style={{
                flexDirection: 'row',
                height: 55,
                paddingHorizontal: 13,
                backgroundColor: themecolor.bgcolor,
                borderBottomWidth: 1,
                borderColor: themecolor.fontsecondary,
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
            }}>

                 <TouchableNativeFeedback           background={TouchableNativeFeedback.Ripple(themecolor.ripple, true)}

 onPress={() => navigation.goBack()}>
                    <View style={{ padding: 2 }}>
                        <Feather size={23} name="arrow-left" style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: themecolor.blue
                        }} />
                    </View>
                </TouchableNativeFeedback>
            </View>
            </Animated.View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}>


                <View style={{
                    backgroundColor: themecolor.bgcolor,
                    marginTop:55,
                    // borderBottomColor: themecolor.fontsecondary,
                    
                }}>

                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,
                        marginHorizontal: 25,
                        marginVertical: 17,
                        fontSize: 22,
                        color:themecolor.fontprimary
                    }}>About this Ebook</Text>


                    <Text style={{
                        textAlign: 'justify',
                        marginHorizontal: 25,
                        color: themecolor.fontsecondary
                    }}>
                        {data.descr?.replace(/<[^>]*>/g, " ")}
                    </Text>

                </View>
                <View style={{
                    borderBottomColor: themecolor.fontsecondary,
                    borderBottomWidth: 1,
                    marginHorizontal: 25,
                    marginVertical: 25

                }} />


                <View style={{
                    // backgroundColor: 'yellow'

                }}>

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Author</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.author}</Text>
                    </View>

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Publisher</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.publisher}</Text>
                    </View>


                    {
                        (pages) ? <View style={{
                            marginHorizontal: 25,
                            marginVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                            color:themecolor.fontprimary
                            }}>Pages</Text>

                            <Text style={{
                                fontSize: 13,
                                color: themecolor.fontsecondary
                            }}>{pages}</Text>
                        </View> : null
                    }

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>ISBN</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.isbn?.split(",").join("\n")}</Text>
                    </View>

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Language</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.language}</Text>
                    </View>

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Year</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.year}</Text>
                    </View>


                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Size</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary 
                        }}>{(data.filesize / (1024 * 1024)).toFixed(2)} mb</Text>
                    </View>

                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Format</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.extension}</Text>
                    </View>

                    {/* {(data.filesize / (1024 * 1024))} */}




                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Time added</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.timeadded}</Text>
                    </View>
                    <View style={{
                        marginHorizontal: 25,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color:themecolor.fontprimary
                        }}>Time modified</Text>

                        <Text style={{
                            fontSize: 13,
                            color: themecolor.fontsecondary
                        }}>{data.timelastmodified}</Text>
                    </View>

                    {/* <View style={{
                     marginHorizontal:25,
                     marginVertical:10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight:'bold'
                        }}>Category</Text>              
                   
                        <Text style={{
                            fontSize: 13,
                            color:'#404040'
                        }}>Computer</Text>
                    </View>

                    <View style={{
                     marginHorizontal:25,
                     marginVertical:10
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight:'bold'
                        }}>Category</Text>              
                   
                        <Text style={{
                            fontSize: 13,
                            color:'#404040'
                        }}>Computer / DS & Algo.</Text>
                    </View> */}

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
export default FullBookDetail;
