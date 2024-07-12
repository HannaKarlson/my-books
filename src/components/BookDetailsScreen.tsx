import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import Cover from './Cover';
import {fetchBookDetails} from '../services';
import {addFavorite, selectFavorites, removeFavorite} from '../store/favorites';
import {selectColormode} from '../store/colormode';
import {headerStyle, textStyle} from '../theme/styles';
import colors, {getThemeColors} from '../theme/colors';

const imageWidth = Dimensions.get('window').width * 0.5;

const BookDetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {authors, title, imageUrl, worksKey} = route.params;
  const favorites = useSelector(selectFavorites);
  const colormode = useSelector(selectColormode);
  const {textColor} = getThemeColors(colormode);
  const isFavorite =
    favorites.findIndex(favorite => favorite.worksKey === worksKey) !== -1;
  const getIconColor = () => {
    if (isFavorite) {
      return colors.likesRed;
    }
    if (colormode === 'dark') {
      return colors.dark300;
    }
    return colors.dark600;
  };
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let description = '...';
  if (details?.description?.value) {
    description = details.description.value;
  } else if (details?.description) {
    description = details.description;
  } else if (isLoading) {
    description = '...';
  } else {
    description = 'No description available';
  }
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const data = await fetchBookDetails(worksKey);
      setDetails(data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [worksKey]);
  console.log({details});
  const handlePressFavorite = () => {
    if (!isFavorite) {
      dispatch(addFavorite({authors, title, imageUrl, worksKey}));
    } else {
      dispatch(removeFavorite(worksKey));
    }
    console.log('this is log', {authors, title, imageUrl, worksKey});
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text numberOfLines={5} style={[headerStyle, {color: textColor}]}>
        {title}
      </Text>
      <Text style={[textStyle, styles.description]}>{`by ${
        authors && authors.join()
      }`}</Text>
      <View style={styles.coverContainer}>
        <Cover imageUrl={imageUrl} style={styles.cover} />
        <TouchableOpacity
          onPress={handlePressFavorite}
          style={styles.iconButton}>
          <FontAwesomeIcon icon={faHeart} size={28} color={getIconColor()} />
        </TouchableOpacity>
      </View>
      <Text style={[textStyle, styles.description]}>{description}</Text>
    </ScrollView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  coverContainer: {
    width: '100%',
  },
  cover: {
    height: 1.5 * imageWidth,
    width: imageWidth,
    alignSelf: 'center',
    marginVertical: 20,
  },
  description: {
    marginVertical: 10,
  },
  iconButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
