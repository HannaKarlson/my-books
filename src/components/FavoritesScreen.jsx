import React from 'react'
import {View, Text, FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import Book from './Book'
import {favorites} from '../store/favorites'


const FavoritesScreen = () => {
    const favoriteBooks = useSelector(favorites)
    console.log({favoriteBooks})
    return(
        <View>
        <FlatList
        data={favoriteBooks}
        renderItem={({item}) => (
            <Book
            title={item.title}
            authors={item.authors}
            imageUrl={item.imageUrl}
            worksKey={item.worksKey}
            />
        )}
        ItemSeparatorComponent={() => <View style={{height:5}}/>}
        ListEmptyComponent={() => <View><Text>Add books to favorites tapping the heart icon</Text></View>}
/>
        </View>
    )
}

export default FavoritesScreen