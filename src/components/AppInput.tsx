import {TextInput, View, StyleSheet} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../theme/colors';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {ThemeContext} from '../contexts/ThemeContext';
// import {getThemeColors} from '../utils';
// import colors from '../theme/colors';

const AppInput = ({icon, /*error, */...props}) => {
//   const colorMode = useContext(ThemeContext);
//   const {iconColor, buttonColor, text} = getThemeColors(colorMode);

  return (
    <View
      testID="app-input"
      style={styles.container}
     /* style={[
        styles.container,
        {backgroundColor: buttonColor},
        error && styles.error,
      ]}*/>
       {icon && (
        <FontAwesomeIcon icon={icon} color={colors.dark300} />
      )} 
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={colors.dark300}
        showSoftInputOnFocus={true}
        autoCorrect={false}
        autoComplete="off"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginRight: 5,
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor:colors.dark800
    },
    input: {
      marginHorizontal: 5,
      flex: 1,
    },

  });

export default AppInput
