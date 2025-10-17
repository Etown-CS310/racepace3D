import {View,Button, StyleSheet } from 'react-native';

function TextButton({title, onPress})
{
    return(
        <View style={styles.container}>
            <Button
                title={title}
                onPress={onPress}        
            />
        </View>
    );
}
export default TextButton;

const styles = StyleSheet.create({
    container:
    {

    },
    button:
    {
        backgroundColor: 'rgba(197, 1, 1, 1);',
        color: 'white',
        width: '100%',
    }

});