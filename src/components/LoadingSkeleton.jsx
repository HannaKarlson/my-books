import React, {useRef, useEffect} from 'react';
import {View, Animated, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectColormode} from '../store/colormode';
import {styles as bookStyles} from './Book';
import {ItemSeparatorComponent} from './BookList';
import colors from '../theme/colors';

const LoadingSkeleton = () => {
  const colormode = useSelector(selectColormode);
  const isDarkMode = colormode === 'dark';
  const opacityAnimation = useRef(new Animated.Value(1)).current;
  const opacityStyle = {opacity: opacityAnimation};

  const skeletonItems = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

  useEffect(() => {
    const animateElement = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnimation, {
            toValue: 0.7,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    animateElement();
  }, [opacityAnimation]);
  return (
    <FlatList
      data={skeletonItems}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Animated.View
          style={[
            bookStyles.container,
            {backgroundColor: isDarkMode ? colors.dark100 : colors.dark900},
            opacityStyle,
          ]}>
          <Animated.View
            style={[
              bookStyles.image,
              {backgroundColor: colors.dark500},
              opacityStyle,
            ]}
          />
          <View style={bookStyles.textContainer}>
            <Animated.View style={[styles.title, opacityStyle]} />
            <Animated.View style={[styles.author, opacityStyle]} />
          </View>
        </Animated.View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    height: 18,
    width: '70%',
    borderRadius: 9,
    backgroundColor: colors.dark500,
  },
  author: {
    height: 14,
    width: '50%',
    borderRadius: 7,
    marginTop: 14,
    backgroundColor: colors.dark500,
  },
});

export default LoadingSkeleton;
