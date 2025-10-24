import { View, Text, StyleSheet, Animated, ImageBackground, Easing, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';



export default function BaseGame({ background, playerGiF, barrierImg, floorColor = 'white', onComplete }) {
    const navigation = useNavigation();
    // player jump animation
    const jumpAnimation = useRef(new Animated.Value(0)).current;
    const [isJumping, setIsJumping] = useState(false);

    // barrier animation
    const barrierX = useRef(new Animated.Value(400)).current;
    const [gameRunning, setGameRunning] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [playerY, setPlayerY] = useState(0);

    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    // dimentions for players and barriers for collision
    const PLAYER = { x: 60, y: 80, width: 80, height: 80, bottom: 100 };
    const BARRIER = { width: 20, height: 50, bottom: 100 };

    const JumpingAnim = () => { // player jump function

        if (isJumping || !gameRunning) return;
        setIsJumping(true);
        
        Animated.sequence([
            Animated.timing(jumpAnimation, {
                toValue: -150,
                duration: 400,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }),
            Animated.timing(jumpAnimation, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }),
        ]).start(() => {
            setIsJumping(false);
        });
    };

    const barrierAnim = () => { // barrier movement function
        if (!gameRunning) return;
        barrierX.setValue(SCREEN_WIDTH + 50);

        Animated.timing(barrierX, {
            toValue: -BARRIER.width - 50,
            duration: 3500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(({finished}) => {
            if (finished && gameRunning) {
                barrierAnim();
            }
        });
    };

    useEffect(() => {
        const id = jumpAnimation.addListener(({ value }) => {
            setPlayerY(value);
        });
        return () => {
            jumpAnimation.removeListener(id);
        };
    }, []);

    useEffect(() => {
        if (gameOver) {
            barrierX.stopAnimation();
        }
    }, [gameOver]);

    useEffect(() => {
        barrierAnim();
        return () => setGameRunning(false);
    }, []);

    useEffect(() => { // collision detection
        if (!gameRunning) return;

        const interval = setInterval(() => {
            checkCol(barrierX.__getValue());
        }, 16);

        return () => clearInterval(interval);
    }, [gameRunning]);

    const checkCol = (barrierPosX) => {
        const playerTop = PLAYER.bottom - jumpAnimation.__getValue();
        const playerBottom = playerTop + PLAYER.height;

        const barrierTop = BARRIER.bottom;
        const barrierBottom = barrierTop + 30;

        const horizontalOverlap = 
            PLAYER.x + PLAYER.width > barrierPosX &&
            PLAYER.x < barrierPosX + BARRIER.width;

        const verticalOverlap = 
            playerTop < barrierBottom &&
            playerBottom > barrierTop;

        if (horizontalOverlap && verticalOverlap && !gameOver) {
            setGameOver(true);
            setGameRunning(false);
            if (onComplete) onComplete(false);
        }
    };

    
    return (
        <Pressable onPressIn={JumpingAnim} style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.container}>
            <View style={[styles.floor, { backgroundColor: floorColor }]} />

            {/* Player */}
            <Animated.Image
                source={playerGiF}
                style={[
                    styles.player,
                    {   transform: [{ translateY: jumpAnimation }], 
                        width: PLAYER.width * 1.3,
                        height: PLAYER.height * 1.3,
                    },
                ]}
                resizeMode="contain"
            />

            {/* Barrier */}
            <Animated.Image
                source={barrierImg}
                style={[
                    styles.barrier,
                    { transform: [{ translateX: barrierX }],
                        width: BARRIER.width * 1.5,
                        height: BARRIER.height * 1.5,
                        },
                ]}
                resizeMode="contain"
            />
            {/* Game Over */}
            {gameOver && (
                <View style={styles.overlay}>
                    <Text style={styles.gameOverText}>Game Over</Text>
                    <Pressable style={styles.menuButton}
                        onPress={() => navigation.replace('Game', {mode: 'selectLvl'})}
                    >
                        <Text style={styles.menuButtonText}>Return to Menu</Text>
                    </Pressable>
                </View>
            )}
        </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    menuButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    player: {
        width: 80,
        height: 80,
        position: 'absolute',
        bottom: 100,
        left: 60,
    },
    barrier: {
        width: 30,
        height: 80,
        position: 'absolute',
        bottom: 100,
        left: 0,
    },
    floor: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverText: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold',
    },
});