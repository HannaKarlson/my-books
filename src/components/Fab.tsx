import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import colors from '../theme/colors'

const Fab = () => {
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')} style={styles.touchable}>
            <FontAwesomeIcon icon={faHeart} size={30} color={'#FF0000'}/>
        </TouchableOpacity>
    )
}

export default Fab

const styles = StyleSheet.create({
    touchable:{
        alignItems:'center',
        borderRadius:30,
        position:'absolute',
        bottom:40,
        justifyContent:'center',
        right:40,
        height:60,
        width:60,
        backgroundColor:colors.white,
        borderColor:'#FF0000',
        borderWidth:5
    }
})