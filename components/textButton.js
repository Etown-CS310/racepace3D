import {View,Button, StyleSheet } from 'react-native';

function TextButton({title, onPress})
{
    return(
        <View style={styles.container}>
            <Button
                title={title}
                onPress={onPress}  
                color='black'
            />
        </View>
    );
}
export default TextButton;

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:'#EEE',
        borderRadius:4,
        width:'60%',
    },

});