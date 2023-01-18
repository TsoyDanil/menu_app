import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const DishBlock = (props) => {
    return(
        <Pressable onPress={props.addToCart}>
            <View style={DishBlockStyles.dishBlockContainer}>
                <Image style={DishBlockStyles.image} source={{uri: props.imageSource}}/>
                <Text style={DishBlockStyles.innerText}>
                    {props.dishName} : <Text style={DishBlockStyles.boldText}>{props.dishCost} KZT</Text>
                </Text>
            </View>
        </Pressable>
    )
}

const DishBlockStyles = StyleSheet.create({
    dishBlockContainer:{
        backgroundColor: 'gray',
        padding: 10,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image:{
        width:60,
        height:60,
        resizeMode: 'cover'
    },
    innerText:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    boldText:{
        fontWeight: 'bold'
    }
})

export default DishBlock