import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageComponent, FlatList } from 'react-native';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
import { Card } from 'react-native-elements';

export default class PopularMoviesScreen extends React.Component{
    constructor(props){
     super(props);
     this.state = {
         data = []
     }
    }

    getData=()=>{
     const url = 'http://localhost5000/popular-movies'
     axios.get(url)
     .then(async(response)=>{
         this.setState({data: response.data.data})
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
        this.getData()
    }

    keyExtractor=(item, index)=>index.toString()

    renderItem=()=>{
        return(
            <Card
                key={`card-${index}`} image={{uri: item.poster_link}} imageProps={{resizeMode: 'cover'}} featuredTitle={item.title}
                containerStyle={styles.cardContainer} featuredTitleStyle={styles.title} 
                featuredSubTitle={`${item.release_date.split('-')[0]} | ${this.timeConvert(item.duration)}`} 
                featuredSubtitleStyle={styles.subTitle}
             />
        )
    }

    render(){
        const {data} = this.state
        return(
            <View style={styles.container}>
                <FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor: 'white',
    },
    title:{
        fontSize : RFValue(25),
        color: 'white',
        alignSelf: 'flex-start',
        paddingLeft: RFValue(15),
        marginTop: RFValue(65),
    },
    subTitle:{
        fontSize : RFValue(15),
        fontWeight : 'bold',
        alignSelf: 'flex-start',
        paddingLeft: RFValue(15),
    },
    cardContainer:{
        flex: 1,
        borderRadius: RFValue(10),
        justifyContent: 'center',
        height: RFValue(110),
        marginBottom: RFValue(20),
    }
})