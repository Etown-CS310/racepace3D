import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

import Visible from '../assets/buttons/View.png';
import NavigationPressable from './NavigationPressable';

import { COLORS, FONT_SIZES } from '../constants/theme';

function Input({ title, value,onChangeText, focus }){
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPasswordField = title === "Password" || title === "Confirm Password";

    return(
        <View style={[styles.container, isFocused && styles.containerFocused]}>
            <TextInput
                style={[styles.textInput, isFocused && styles.textInputFocused,]}
                placeholder={title}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible && isPasswordField}
                autoCorrect={false}       
                autoFocus={focus}
                disableFullscreenUI={true}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {isPasswordField && (
                <NavigationPressable source={Visible} onPress={() => setIsPasswordVisible(!isPasswordVisible)} size={25} style={styles.toggleButton} />
            )}
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'PressStart2P',
        fontSize: FONT_SIZES.small,
        paddingHorizontal: 10,
        paddingVertical: 12,
        paddingRight: 45,
        backgroundColor: COLORS.textInput,
        textAlignVertical: 'center',
        lineHeight: 18,
        includeFontPadding: false,
    },

    textInputFocused: {
        backgroundColor: COLORS.textInputFocused,
    },

    container: {
        borderColor: 'white',
        borderWidth: 2,
    },

    containerFocused: {
        borderColor: 'yellow',
    },

    toggleButton: {
        position: 'absolute',
        right: 6,
        top: 6,
        bottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});