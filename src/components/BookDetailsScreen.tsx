import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import Cover from './Cover';
import {fetchBookDetails} from '../services';
import {headerStyle, textStyle} from '../theme/styles';

const imageWidth = Dimensions.get('window').width * 0.5;

const BookDetailsScreen = ({route}) => {
  const {authors, title, imageUrl, worksKey} = route.params;
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
 let description = '...'
 if(details?.description?.value){
    description = details.description.value
 }
 else if(details?.description){
    description = details.description
 }
 else if(isLoading){
    description = '...'
 }
 else{
    description = 'No description available'
 }
  useEffect(() => {
    const fetchDetails = async () => {
        setIsLoading(true)
      const data = await fetchBookDetails(worksKey);
      setDetails(data);
      setIsLoading(false)
    };
    fetchDetails();
  }, []);
  console.log({details});
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text numberOfLines={5} style={headerStyle}>
        {title}
      </Text>
      <Text style={[textStyle, styles.description]}>{`by ${
        authors && authors.join()
      }`}</Text>
      <View style={{width: '100%'}}>
        {/* <FastImage
          source={{uri: imageUrl}}
          style={{
            height: 1.5 * imageWidth,
            width: imageWidth,
            alignSelf: 'center',
            marginVertical: 20,
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
        <Cover imageUrl={imageUrl} style={{height: 1.5 * imageWidth,
            width: imageWidth,
            alignSelf: 'center',
            marginVertical: 20}}/>
        <TouchableOpacity style={{position: 'absolute', bottom: 40, right: 20}}>
          <FontAwesomeIcon icon={faHeart} size={28} />
        </TouchableOpacity>
      </View>
      <Text style={[textStyle, styles.description]}>
        {description}
      </Text>
    </ScrollView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  description: {
    marginVertical: 10,
  },
});
