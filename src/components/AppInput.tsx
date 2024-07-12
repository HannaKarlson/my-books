import {TextInput, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {selectColormode} from '../store/colormode';
import colors, {getThemeColors} from '../theme/colors';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {ThemeContext} from '../contexts/ThemeContext';
// import {getThemeColors} from '../utils';
// import colors from '../theme/colors';

const AppInput = ({icon, /*error, */ ...props}) => {
  //   const colorMode = useContext(ThemeContext);
  //   const {iconColor, buttonColor, text} = getThemeColors(colorMode);
  //const currentColormode = useSelector(colormode)
  const {iconColor, buttonColor} = getThemeColors(useSelector(selectColormode));
  return (
    <View
      testID="app-input"
      style={[styles.container, {backgroundColor: buttonColor}]}
      /* style={[
        styles.container,
        {backgroundColor: buttonColor},
        error && styles.error,
      ]}*/
    >
      {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}
      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={iconColor}
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
    // backgroundColor:colors.dark800
  },
  input: {
    marginHorizontal: 5,
    flex: 1,
  },
});

export default AppInput;
