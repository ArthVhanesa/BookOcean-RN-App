import React ,{useContext} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'
import {ThemeContext} from "../index"

function SearchResultBook() {
    const themecolor = useContext(ThemeContext);
    
    return (
        <View style={{
            alignItems: "center",
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                // backgroundColor: 'yellow',
                // alignItems: "center",
                width: '87%',
                height: 100,
                marginHorizontal: 10
                // marginVertic

            }}>

                <View style={{
                    marginVertical: 5,

                }}>

                    {/* <Image resizeMode={"stretch"} style={{ height: 80, width: 60, borderRadius: 20 }} source={require("../../assets/images/alchemist-cover.jpg")}></Image> */}
                </View>
                <View style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    // backgroundColor: 'green',
                    width: '75%'

                }}>
                    <Text numberOfLines={1} style={{
                        fontFamily: styles.baseText.fontFamily,

                        marginVertical: 0.5
                    }}>Ikigai: The Japanese secret to a long and happy life</Text>
                    <Text numberOfLines={1} style={{
                        fontFamily: styles.baseText.fontFamily,

                        fontSize: 13,
                        color: '#404040'
                    }}>Hector Garcia</Text>
                    <Text style={{
                        fontFamily: styles.baseText.fontFamily,

                        fontSize: 12,
                        color: '#595959',
                        marginVertical: 0.5
                    }}>1.2mb &#8226; Ebook &#8226; Free</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto"
    }
});

export default SearchResultBook
