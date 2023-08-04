/* Libraries */
import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Platform, ScrollView, Dimensions, PermissionsAndroid, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob'


// ICONS IMPORT
import Feather from 'react-native-vector-icons/Feather';

// THEME IMPORT
import * as theme from '../../Constants/theme';

// HELPER IMPORT
import Helper from '../../Constants/helper';
import {timing} from 'react-native-reanimated';

// CONSTANTS
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Home2 extends Component {

     async downloadHandler() {
         console.log("Download button clicked");
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message:
                  'App needs access to your storage to download Photos',
              }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
               
                //download method
             
            let DownloadDir = "/storage/emulated/0/Download";

                let task = RNBackgroundDownloader.download({
                    id: 'file123',
                    url:'http://111.90.145.72/get.php?md5=1c0657844e26557f189f5543ac1ddc81&key=RD243YEHO5RCYA9Z&mirr=1',

                    destination: `${DownloadDir}/1c0657844e26557f189f5543ac1ddc81.pdf`
                }).begin((expectedBytes) => {
                    console.log(`Going to download ${expectedBytes} bytes!`);
                }).progress((percent) => {
                    console.log(`Downloaded: ${percent * 100}%`);
                }).done(() => {
                    console.log('Download is done!');
                }).error((error) => {
                    console.log('Download canceled due to error: ', error);
                });

                /////
            } else {
              // If permission denied then show alert
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            // To handle permission related exception
            console.warn(err);
          }
    };

       downloadImage() {
        
      };


    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 0,
            categories: ['Popular', 'Top Book', 'Business', 'UI/UX'],
            books: [
                {
                    id: 1,
                    name: 'Hooked',
                    author: 'Nir Eyal',
                    cover: require('../../../assets/images/hooked-cover.jpg'),
                    price: '$14.99',
                },
                {
                    id: 2,
                    name: 'Sprint',
                    author: 'Jake Knapp',
                    cover: require('../../../assets/images/sprint-cover.jpg'),
                    price: '$16.99',
                },
                {
                    id: 3,
                    name: 'Why Buddhism',
                    author: 'Robert Wright',
                    cover: require('../../../assets/images/wbit-cover.png'),
                    price: '$14.99',
                },
                {
                    id: 4,
                    name: 'The Alchemist',
                    author: 'Paulo Coelho',
                    cover: require('../../../assets/images/alchemist-cover.jpg'),
                    price: '$14.99',
                },
            ],
        };
    }

    static navigationOptions = {
        headerShown: false,
    };

    // LIFECYCLE METHODS
    componentDidMount = () => {};
    // END LIFECYCLE METHODS

    // UTILITY FUNCTIONS
  
    // END UTILITY FUNCTIONS

    // FUNCTIONAL COMPONENTS
    // END FUNCTIONAL COMPONENTS

    // RENDERING FUNCTIONS
    renderItem = ({item, index}) => {
        return (
            <View style={{width: '100%', marginBottom: EStyleSheet.value('30rem'), height: EStyleSheet.value('100rem'), flexDirection: 'row'}}>
                <View style={{flex: 1, ...styles.shadow}}>
                    <Image source={item.cover} style={{height: '100%', width: EStyleSheet.value('70rem'), resizeMode: 'contain'}} />
                </View>
                <View style={{flex: 3, justifyContent: 'space-evenly', paddingLeft: EStyleSheet.value('30rem')}}>
                    <Text
                        style={{
                            fontSize: EStyleSheet.value('14rem'),
                            color: 'black',
                            fontWeight: 'bold',
                            opacity: 0.7,
                        }}>
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: EStyleSheet.value('12rem'),
                            color: 'black',
                            fontWeight: '600',
                            opacity: 0.3,
                        }}>
                        by {item.author}
                    </Text>
                    <Text
                        style={{
                            fontSize: EStyleSheet.value('12rem'),
                            color: 'black',
                            fontWeight: '600',
                            opacity: 0.5,
                        }}>
                        {item.price}
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{paddingRight: EStyleSheet.value('3rem')}}>
                        <Feather name={'heart'} color={'lightgrey'} size={EStyleSheet.value('24rem')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.downloadHandler}
                        style={{
                            ...styles.totalCenter,
                            height: EStyleSheet.value('30rem'),
                            aspectRatio: 1,
                            backgroundColor: theme.colors.themeCol,
                            borderRadius: EStyleSheet.value('15rem'),
                            borderWidth: 1,
                            borderColor: 'gold',
                        }}>
                        <Feather name={'download'} color={'black'} size={EStyleSheet.value('14rem')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                    {/* HEADER */}
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.appDims.boundary}}>
                        <Feather name={'menu'} color={'black'} size={EStyleSheet.value('24rem')} />
                        <Feather onPress={() => this.props.navigation.navigate('Reader')} name={'shopping-bag'} color={'black'} size={EStyleSheet.value('24rem')} />
                    </View>

                    {/* SECTION 1 INFO */}
                    <View style={{width: '100%', padding: theme.appDims.boundary}}>
                        <Text style={{fontSize: EStyleSheet.value('40rem'), fontWeight: 'bold', color: 'black', opacity: 0.7}}>
                            {'Choose your best\ndesign book'}
                        </Text>
                    </View>

                    {/* SECTION 2 SEARCH BAR */}
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: theme.appDims.boundary,
                        }}>
                        <View
                            style={{
                                width: '80%',
                                borderRadius: EStyleSheet.value('5rem'),
                                height: EStyleSheet.value('50rem'),
                                backgroundColor: `${theme.colors.themeCol}3d`,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: theme.appDims.boundary,
                            }}>
                            <View style={{flex: 1}}>
                                <Feather name={'search'} color={'black'} size={EStyleSheet.value('24rem')} />
                            </View>
                            <View style={{flex: 4}}>
                                <TextInput
                                    placeholder={'Search for books..'}
                                    placeholderTextColor={'lightgrey'}
                                    style={{
                                        fontSize: EStyleSheet.value('16rem'),
                                        color: 'black',
                                        flex: 1,
                                    }}
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                ...styles.totalCenter,
                                flex: 1,
                                height: EStyleSheet.value('50rem'),
                                backgroundColor: theme.colors.themeCol,
                                marginLeft: theme.appDims.boundary,
                                borderRadius: EStyleSheet.value('5rem'),
                                borderWidth: 1,
                                borderColor: 'gold',
                            }}>
                            <Feather name={'list'} color={'black'} size={EStyleSheet.value('24rem')} />
                        </View>
                    </View>

                    {/* SELECT CATEGORIES */}
                    <View style={{width: '100%', paddingLeft: theme.appDims.boundary, paddingTop: theme.appDims.boundary}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {this.state.categories.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index.toString()}
                                        style={{marginRight: EStyleSheet.value('20rem')}}
                                        onPress={() => this.setState({selectedCategory: index})}>
                                        <Text
                                            style={{
                                                fontSize: EStyleSheet.value('18rem'),
                                                color: 'black',
                                                fontWeight: '600',
                                                opacity: this.state.selectedCategory == index ? 0.7 : 0.2,
                                            }}>
                                            {item}
                                        </Text>
                                        {this.state.selectedCategory == index && (
                                            <View
                                                style={{
                                                    marginTop: EStyleSheet.value('10rem'),
                                                    width: EStyleSheet.value('15rem'),
                                                    height: EStyleSheet.value('5rem'),
                                                    borderRadius: EStyleSheet.value('5rem'),
                                                    backgroundColor: theme.colors.themeCol,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* BOOKS LIST */}
                    <View style={{flex: 1, padding: theme.appDims.boundary}}>
                        <FlatList
                            data={this.state.books}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
    // END RENDERING FUNCTIONS
}

const styles = EStyleSheet.create({
    totalCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
});

export default Home;
