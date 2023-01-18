import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DishBlock from "../components/DishBlock";
import { addToCart } from "../store/cart.slice";
import { getMenu } from "../store/menu.slice";


const OrderDishApp = () => {

    const dispatch = useDispatch()

    const {loading, dishes} = useSelector(state => state.menu)

    const addToCartHandler = (key) => {
        dispatch(addToCart(key))
    }

    useEffect(() => {
        dispatch(getMenu())
    }, [])

    return(
        <>
            <View>
                <Text style={OrderDishAppStyles.headerText}>Cool cafe</Text>
            </View>
            {
                loading ?
                <View>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View> 
                : null
            }
            {
                Object.keys(dishes).length ? 
                <FlatList
                    data={Object.keys(dishes)}
                    style={OrderDishAppStyles.menuList}
                    renderItem = {(info) => {
                        return <DishBlock
                                    key = {info.item}
                                    imageSource = {dishes[info.item].imageSrc}
                                    dishName = {dishes[info.item].name}
                                    dishCost = {dishes[info.item].cost}
                                    addToCart = {() => addToCartHandler(info.item)}
                                />
                    }}
                />
                : <Text style={OrderDishAppStyles.headerText}>No dishes yet...</Text>
            }
        </>
    )
}

const OrderDishAppStyles = StyleSheet.create({
    headerText: {
        margin: 10,
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    menuList:{
        width: '100%',
        display: 'flex',
        alignContent: 'center'
    }
})

export default OrderDishApp