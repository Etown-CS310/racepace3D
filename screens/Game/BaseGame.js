import { View, Text, StyleSheet, Animated, ImageBackground, Easing } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';



export default function BaseGame({ background, playerGiF, barrierImg, floorColor = 'white', onComplete }) {
    const jumpAnimation = useRef(new Animated.Value(0)).current;
    const [isJumping, setIsJumping] = useState(false);

    const JumpingAnim = () => {

        if (isJumping) return;
        setIsJumping(true);
        
        Animated.sequence([
            Animated.timing(jumpAnimation, {
                toValue: -100,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(jumpAnimation, {
                toValue: 0,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsJumping(false);
        });
    };

    
    return (
        <Pressable onPress={JumpingAnim} style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.container}>
            <View style={[styles.floor, { backgroundColor: floorColor }]} />
            <Animated.Image
                source={playerGiF}
                style={[
                    styles.player,
                    { transform: [{ translateY: jumpAnimation }] },
                ]}
                resizeMode="contain"
            />
            <Image source={barrierImg} style={styles.barrier} resizeMode="contain" />
        </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    player: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: 100
    },
    barrier: {
        width: 50,
        height: 80,
        position: 'absolute',
        bottom: 100,
        right: 40,
    },
    floor: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
    },
});