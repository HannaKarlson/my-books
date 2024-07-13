import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectColormode} from '../store/colormode';
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import colors from '../theme/colors';

const Fab = () => {
  const isDarkMode = useSelector(selectColormode) === 'dark';
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FavoritesScreen')}
      style={[
        styles.touchable,
        {backgroundColor: isDarkMode ? colors.dark100 : colors.white},
      ]}>
      <FontAwesomeIcon icon={faHeart} size={30} color={colors.likesRed} />
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    justifyContent: 'center',
    right: 40,
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    borderColor: colors.likesRed,
    borderWidth: 5,
  },
});
