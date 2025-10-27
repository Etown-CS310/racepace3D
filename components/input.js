import {View, TextInput, StyleSheet } from 'react-native';

function Input({title, value,onChangeText, focus}){
    return(
        <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            placeholder={title}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={title === "Password" || title=== "Confirm Password"} 
            autoCorrect={false}       
            autoFocus={focus}
            disableFullscreenUI={true}
            />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    textInput:
    {
        backgroundColor: '#888',
        width: '100%',
        height: 40,
    },
    container: 
    {
        width: '100%',
        margin:10,
        borderColor: 'white',
        borderWidth: 2,
        
    },
});