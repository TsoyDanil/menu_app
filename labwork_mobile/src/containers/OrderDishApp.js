import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DishBlock from "../components/DishBlock";
import { addToCart, postOrder, removeFromCart } from "../store/cart.slice";
import { getMenu } from "../store/menu.slice";


const OrderDishApp = () => {

    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    const {loading, dishes} = useSelector(state => state.menu)

    const {currentCart, deliveryCost} = useSelector(state => state.cart)

    const addToCartHandler = (key) => {
        dispatch(addToCart(key))
    }

    const removeFromCartHandler = (key) => {
        dispatch(removeFromCart(key))
    }

    const showModalHandler = () => {
        setShowModal(true)
    }

    const hideModalHandler = () => {
        setShowModal(false)
    }

    const postOrderHandler = async () => {
        const mappedArray = Object.keys(currentCart).filter(key => currentCart[key] > 0).map((key) => ({[key]: currentCart[key]}))
        let dataObject = Object.assign({}, ...mappedArray)
        dispatch(postOrder(dataObject))
    }

    const modalExtraChecker = () => {
        if (Object.keys(currentCart).length > 0 && Object.keys(currentCart).filter(key => currentCart[key] > 0).length > 0) return
        setShowModal(false)
    }
    useEffect(() => {
        dispatch(getMenu())
    }, [])

    useEffect(() => {
        modalExtraChecker()
    }, [currentCart])

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
            {
                Object.keys(currentCart).length > 0 && Object.keys(currentCart).filter(key => currentCart[key] > 0).length > 0 ? 
                <View style={OrderDishAppStyles.gotToCartBlock}>
                    <Text>Total price: {Object.keys(currentCart).map((key) => dishes[key].cost * currentCart[key]).reduce((a, b) => a + b)}</Text>
                    <Pressable
                        onPress={showModalHandler}    
                    >
                        <Text style={OrderDishAppStyles.goToCartBtn}>Check Out</Text>
                    </Pressable>
                </View> :
                null
            }
            {
            showModal ? 
                <Modal>
                    <View style={OrderDishAppStyles.containerModal}>
                        <View>
                        <Text style={OrderDishAppStyles.headerText}>Your orders:</Text>
                            <View>
                            {
                                Object.keys(currentCart).map((key) => {
                                    if (currentCart[key] > 0){
                                        return <View style={OrderDishAppStyles.modalOrderData}
                                        key={key}
                                        >
                                        <Text>{dishes[key].name} X {currentCart[key]} <Text style={OrderDishAppStyles.boldText}>{dishes[key].cost * currentCart[key]} KZT</Text></Text>
                                            <Pressable 
                                                onPress={()=>removeFromCartHandler(key)}
                                                style={OrderDishAppStyles.preesable}>
                                                <Text style={OrderDishAppStyles.removeFromCart}>Remove</Text>
                                            </Pressable>
                                        </View>
                                        }
                                            })
                            }
                            </View>
                        </View>
                        <View>
                            <Text>Delivery: {deliveryCost}</Text>
                            <Text style={OrderDishAppStyles.boldText}>Total:{Object.keys(currentCart).length ? Object.keys(currentCart).map((key) => dishes[key].cost * currentCart[key]).reduce((a, b) => a + b) + deliveryCost : null}</Text>
                            <Button color={'grey'} style={OrderDishAppStyles.modalButton} onPress={hideModalHandler} title={'Cancel'}/>
                            <Button style={OrderDishAppStyles.modalButton} onPress={postOrderHandler} title={'Order'}/>
                        </View>
                    </View>
                </Modal>
            :
            null
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
    },
    gotToCartBlock:{
        width: '100%',
        backgroundColor: 'grey',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    goToCartBtn:{
        padding: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'green',
        fontWeight: 'bold'
    },
    removeFromCart:{
        padding: 5,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'red',
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5
    },
    containerModal:{
        flex: 1,
        backgroundColor: 'purple',
        justifyContent: 'space-between'
    },
    modalButton: {
        marginTop: 5
    },
    modalOrderData:{
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10
    },
    boldText:{
        fontWeight: 'bold'
    },
    preesable:{
        alignSelf: 'center'
    }
})

export default OrderDishApp