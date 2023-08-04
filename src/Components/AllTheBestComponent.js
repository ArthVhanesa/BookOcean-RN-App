import React,{useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import {ThemeContext} from "../index"


function AllTheBest() {

    const themecolor = useContext(ThemeContext)

    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{
                fontSize: 20,
                alignSelf: 'center',
                color : themecolor.fontprimary,
                fontFamily:styles.baseText.fontFamily,
                letterSpacing: styles.normalText.letterSpacing,
            }}>All the Best ❤
                   </Text>
            <Text style={{
                fontSize: 20,
                alignSelf: 'center',
                fontFamily:styles.baseText.fontFamily,
                letterSpacing:styles.normalText.letterSpacing,
                color:themecolor.fontprimary
            }}>From Team <Text style={{ fontWeight: 'bold',letterSpacing:styles.baseText.letterSpacing, color: themecolor.blue }}>BookOcean</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Roboto",
        letterSpacing: 0.8
    },
    normalText: {
        letterSpacing: 0.5,
    }
});
export default AllTheBest;