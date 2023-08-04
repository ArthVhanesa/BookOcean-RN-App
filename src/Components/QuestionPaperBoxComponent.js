import React from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


function QuestionPaperBox({ paper }) {
    // console.log(paper);
    (!paper) ? paper = { subcode: 123456, session: "W2019" } : null
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("PdfReaderScreen", { link: paper.pdflink })}>

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
                    <Text style={{
                        color: '#000',
                        fontSize: 20,
                    }}>{paper.subcode} ({paper.session}) </Text>
                    <Feather size={25} name="file-text" style={{
                        color: '#000'
                    }} />
                </View>

                {/*   <View style={{ borderBottomWidth: 1, borderColor: '#666666' }} />

            <Text style={{
                color: '#000',
                fontSize: 18,
            }}>Basic Mechanical Engineering</Text> */}
            </View>
        </TouchableWithoutFeedback>

    )
}

export default QuestionPaperBox
