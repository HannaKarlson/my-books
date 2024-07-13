import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '../store/hooks';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import Cover from './Cover';
import AppText from './AppText';
import {fetchBookDetails} from '../services';
import {addFavorite, selectFavorites, removeFavorite} from '../store/favorites';
import {selectColormode} from '../store/colormode';
import colors from '../theme/colors';
import type {RouteProp} from '@react-navigation/native';
import type {RootStackParamList, Book} from '../types';

const imageWidth = Dimensions.get('window').width * 0.5;

type Props = {
  route: RouteProp<RootStackParamList, 'BookDetailsScreen'>;
};

const BookDetailsScreen = ({route}: Props) => {
  const dispatch = useDispatch();
  const {authors, title, imageUrl, key} = route.params.book;
  const favorites: Book[] = useSelector(selectFavorites);
  const colormode = useSelector(selectColormode);
  const isFavorite =
    favorites.findIndex(favorite => favorite.key === key) !== -1;
  const getIconColor = () => {
    if (isFavorite) {
      return colors.likesRed;
    }
    if (colormode === 'dark') {
      return colors.dark300;
    }
    return colors.dark600;
  };
  const [details, setDetails] = useState<any>(null);
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
      const data = await fetchBookDetails(key);
      setDetails(data);
      setIsLoading(false);
    };
    fetchDetails();
  }, [key]);
  const handlePressFavorite = () => {
    if (!isFavorite) {
      dispatch(addFavorite({authors, title, imageUrl, key}));
    } else {
      dispatch(removeFavorite(key));
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText header numberOfLines={5}>
        {title}
      </AppText>
      {authors && (
        <AppText style={styles.description}>{`by ${
          authors && authors.join(', ')
        }`}</AppText>
      )}
      <View style={styles.coverContainer}>
        <Cover imageUrl={imageUrl} style={styles.cover} />
        <TouchableOpacity
          onPress={handlePressFavorite}
          style={styles.iconButton}>
          <FontAwesomeIcon icon={faHeart} size={28} color={getIconColor()} />
        </TouchableOpacity>
      </View>
      <AppText style={styles.description}>{description}</AppText>
    </ScrollView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 30,
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
