import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

function Input({ title, value,onChangeText, focus }){
    const [isFocused, setIsFocused] = useState(false);

    return(
        <View style={[styles.container, isFocused && styles.containerFocused]}>
            <TextInput
                style={[styles.textInput, isFocused && styles.textInputFocused,]}
                placeholder={title}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={title === "Password" || title=== "Confirm Password"} 
                autoCorrect={false}       
                autoFocus={focus}
                disableFullscreenUI={true}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'PressStart2P',
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#888',
        textAlignVertical: 'center',
        lineHeight: 18,
        includeFontPadding: false,
    },

    textInputFocused: {
        backgroundColor: '#aaa',
    },

    container: {
        borderColor: 'white',
        borderWidth: 2,
    },

    containerFocused: {
        borderColor: 'yellow',
    },
});