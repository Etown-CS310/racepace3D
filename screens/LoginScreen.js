import { StyleSheet, ImageBackground, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import bkimg from '../assets/images/Trackbg.png';

function LoginScreen({children, width='50%'}) {
    return (
        <ImageBackground 
            style={styles.bkimg}
            source={bkimg}
        > 
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={styles.keyboardView}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.container, {width: width}]}>
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    bkimg: {
        flex: 1,
        alignItems: 'center',   
    },

    keyboardView: {
        flex: 1,
        width: '100%',
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        backgroundColor: 'rgba(190, 190, 190, 0.7)',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        paddingHorizontal: 0,
    },
});