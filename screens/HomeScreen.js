import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageComponent } from 'react-native';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import { Header, AirbnbRating, Icon } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
     super();
     this.state = {
         movieDetails = {}
     }
    }

    getMovies=()=>{
     const url = 'http://localhost5000/get-movie'
     axios.get(url)
     .then((response)=>{
         let details = response.data.data
         details['duration'] = this.timeConvert(details.duration)
         this.setState({movieDetails: details})
     })
     .catch((error)=>{
         console.log(error.message)
     })
    }

    timeConvert(num){
        var hours = Math.floor(num/60)
        var minutes = num%60
        return `${hours} hrs ${minutes} mins`
    }
    
    componentDidMount(){
        this.getMovies()
    }

    likedMovies=()=>{
        const url = 'http://localhost5000/liked-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    dislikedMovies=()=>{
        const url = 'http://localhost5000/disliked-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    notWatchedMovies=()=>{
        const url = 'http://localhost5000/notWatched-movie'
        axios.post(url)
        .then((response)=>{
            this.getMovies()
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    render(){
        const {movieDetails} = this.state
        if(movieDetails.poster_link){
            const {
                poster_link, title, release_date, duration, overview, rating
            }=movieDetails
            return(
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header centerComponent={{text: 'Movies', style: styles.headerTitle}} rightComponent={{icon: 'movie-open', color: 'white', 
                    type: 'material-community', onPress:()=>{
                        this.props.navigation.navigate('RecommendedMovies')
                    }}} backgroundColor= {'#d500f9'} containerStyle={{flex: 1}}/>
                    </View>
                    <View style={styles.subTopContainer}>
                        <View style={styles.subTopContainer}>
                            <Image style={styles.posterImage} source={{uri : poster_link}}/>
                        </View>
                        <View style={styles.subBottomContainer}>
                            <View style={styles.upperBottomContainer}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {`${release_date.split('-')[0]} | ${duration}`}
                                </Text>
                            </View>
                            <View style={styles.middleBottomContainer}>
                                <View style={{flex: 0.3}}>
                                    <AirbnbRating count={10} reviews={['', '', '', '']} defaultRating={rating} isDisabled={true} 
                                    size={RFValue(25)} starContainerStyle={{marginTop: -30}}/>
                                </View>
                                <View style={{flex: 0.7, padding: 15}}>
                                    <Text style={styles.overview}>
                                        {overview}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.lowerBottomContainer}>
                                <View style={styles.iconButtonContainer}>
                                    <TouchableOpacity onPress={this.likedMovies}>
                                        <Icon reverse name={'check'} type={'entypo'} size={RFValue(30)} color={'#76ff03'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.dislikedMovies}>
                                        <Icon reverse name={'check'} type={'entypo'} size={RFValue(30)} color={'#ff1744'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={this.notWatchedMovies}>
                                        <Text style={styles.buttonText}>
                                            Did Not Watch
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    headerContainer:{
        flex : 0.1,
    },
    subContainer:{
        flex : 0.9,
    },
    headerTitle:{
        color : 'white',
        fontWeight : 'bold',
        fontSize : RFValue(18),
    },
    subTopContainer:{
        flex : 0.4,
        justifyContent : 'center',
        alignItems : 'center',
    },
    posterImage:{
        width : '60%',
        height : '90%',
        resizeMode : 'stretch',
        borderRadius : RFValue(30),
        marginHorizontal : RFValue(10),
    },
    subBottomContainer:{
        flex : 0.6,
    },
    upperBottomContainer:{
        flex : 0.2,
        alignItems : 'center',
    },
    title:{
        fontSize : RFValue(20),
        fontWeight : 'bold',
        textAlign : 'center',
    },
    subTitle:{
        fontSize : RFValue(14),
        fontWeight : '300',
    },
    middleBottomContainer:{
        flex : 0.35,
    },
    overview:{
        fontSize : RFValue(13),
        fontWeight : '300',
        textAlign : 'center',
        color : 'gray',
    },
    lowerBottomContainer:{
        flex : 0.45,
    },
    iconButtonContainer:{
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
    },
    buttonContainer:{
        justifyContent : 'center',
        alignItems : 'center',
    },
    button:{
        width : RFValue(160),
        height : RFValue(50),
        borderRadius : RFValue(20),
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        marginTop : RFValue(15),
    },
    buttonText:{
        fontSize : RFValue(15),
        fontWeight : 'bold',
    },
})