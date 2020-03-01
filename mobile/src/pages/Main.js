import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import {MaterialIcons } from '@expo/vector-icons';
function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        }
        loadInitialPosition();
    },[]);

    if(!currentRegion) {
        return null;
    }

    return (
<>
    <MapView initialRegion={currentRegion} style={style.map}>
        <Marker coordinate={{latitude: -23.4363091, longitude: -45.082436}}>
        <Image style={style.avatar} source={{uri: 'https://avatars3.githubusercontent.com/u/55529750?s=460&v=4'}}/>
        <Callout onPress={()=>{
            //navegacao
            navigation.navigate('Profile',{ github_username:'EDnotSheeran' })
        }}>
            <View style={style.calloutView}>
                <Text style={style.devName}>Edson Rodrigues</Text>
                <Text style={style.devBio}>Bio</Text>
                <Text style={style.devTechs}>ReactJs, React Native, oi</Text>
            </View>
        </Callout>
        </Marker>
    </MapView>
    <View style={style.searchForm}>
        <TextInput
            style={style.searchInput}
            placeholder='Buscar devs pors techs...'
            placeholderTextColor='#999'
            autoCapitalize='words'
            autoCorrect={false}
        />
        <TouchableOpacity style={style.loadButton}>
            <MaterialIcons name='my-location' size={20} color="#FFF"/>
        </TouchableOpacity>
    </View>
</>
    );
}

const style = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    calloutView: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row', 
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width:4, height:4
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#BE4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Main;