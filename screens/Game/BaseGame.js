import { View, Text, StyleSheet, Animated, ImageBackground, Easing, Pressable, Dimensions } from 'react-native';
import React, { use, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import leftimg from '../../assets/buttons/LeftArrow.png';
import restartimg from '../../assets/buttons/Refresh.png';
import nextimg from '../../assets/buttons/NextArrow.png';
import NavigationPressable from '../../components/NavigationPressable';


export default function BaseGame({ background, playerGiF, barrierImg, floorImg, onNext, onExit }) {
    const navigation = useNavigation();

    // player jump animation
    const jumpAnimation = useRef(new Animated.Value(0)).current;
    const [isJumping, setIsJumping] = useState(false);

    // barrier animation
    const barrierX = useRef(new Animated.Value(400)).current;
    const [gameRunning, setGameRunning] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [playerY, setPlayerY] = useState(0);
    const [score, setScore] = useState(0);
    const [barrierPassed, setBarrierPassed] = useState(false);
    const [won, setWon] = useState(false);

    // screen animation values
    const screenX = useRef(new Animated.Value(0)).current;

    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    // dimentions for players and barriers for collision
    const PLAYER = { x: 60, y: 80, width: 80, height: 80, bottom: 100 };
    const BARRIER = { width: 20, height: 50, bottom: 100 };

    // Jumping animation
    const JumpingAnim = () => {
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

    // Barrier movement animation
    const barrierAnim = () => {
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

    // Screen background animation
    useEffect(() => {
        const loopAnim = Animated.loop(
            Animated.sequence([
                Animated.timing(screenX, {
                    toValue: -SCREEN_WIDTH,
                    duration: 3050,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(screenX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                }),
            ])
        );
        loopAnim.start();
        return () => loopAnim.stop();
    }, [screenX]);

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
            screenX.stopAnimation();
        }
    }, [gameOver]);

    useEffect(() => {
        if (won) {
            barrierX.stopAnimation();
            screenX.stopAnimation();
        }
    }, [won]);

    useEffect(() => {
        if (gameRunning) {
            barrierAnim();
        }
    }, [gameRunning]);

    // Collision detection
    useEffect(() => {
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
            setWon(false);
            setGameOver(true);
            setGameRunning(false);
        } 
        if (!barrierPassed && barrierPosX + BARRIER.width < PLAYER.x) { // update score
            setScore(prevScore => {
                const newScore = prevScore + 1;
                if (newScore >= 100) {
                    setGameRunning(false);
                    setWon(true);
                }
                return newScore;
            });
            setBarrierPassed(true);
        }
        if (barrierPosX > SCREEN_WIDTH - 10) {
            setBarrierPassed(false);
        }
    };

    const resetGame = () => {
        // Reset all values
        setGameOver(false);
        setWon(false);
        setScore(0);
        setBarrierPassed(false);
        setGameRunning(true);
        jumpAnimation.setValue(0);
        barrierX.setValue(SCREEN_WIDTH + 50);
        screenX.setValue(0);

        barrierAnim();

        const loopAnim = Animated.loop(
            Animated.sequence([
                Animated.timing(screenX, {
                    toValue: -SCREEN_WIDTH,
                    duration: 3050,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
                Animated.timing(screenX, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: false,
                }),
            ])
        );
        loopAnim.start();
    };
    
    return (
        <Pressable onPressIn={JumpingAnim} style={{ flex: 1 }}>            
            <View style={styles.container}>
            
                {/* Scrolling background images */}
                <Animated.Image
                    source={background}
                    style={[
                        styles.background,
                        { transform: [{ translateX: screenX }] },
                    ]}
                    resizeMode="stretch"
                />
                <Animated.Image
                    source={background}
                    style={[
                        styles.background,
                        {
                            position: 'absolute',
                            left: SCREEN_WIDTH,
                            transform: [{ translateX: screenX }],
                        },
                    ]}
                    resizeMode="stretch"
                />
            
                {/* Game content goes here */}
                <View style={styles.scoreArea}><Text style={styles.scoreText}> Score: {score} </Text></View>

                {/* Floor */}
                <Animated.Image
                    source={floorImg}
                    style={[
                        styles.floor,
                        { transform: [{ translateX: screenX }] },
                    ]}
                    resizeMode="stretch"
                />
                <Animated.Image
                    source={floorImg}
                    style={[
                        styles.floor,
                        {
                            position: 'absolute',
                            left: SCREEN_WIDTH,
                            transform: [{ translateX: screenX }],
                        },
                    ]}
                    resizeMode="stretch"
                />

                {/* Barrier */}
                <Animated.Image
                    source={barrierImg}
                    style={[
                        styles.barrier,
                        { transform: [{ translateX: barrierX }] },
                    ]}
                    resizeMode="contain"
                />

                {/* Player */}
                <Animated.Image
                    source={playerGiF}
                    style={[
                        styles.player,
                        { transform: [{ translateY: jumpAnimation }] },
                    ]}
                    resizeMode="contain"
                />

                {/* Game Over */}
                {(gameOver || won) && (
                    <View style={styles.overlay}>
                        <Text style={styles.gameOverText}>{won ? "You Win!" : "Game Over"}</Text>

                        <View style={styles.buttonsContainer}>
                            {/* Level select */}
                            <NavigationPressable
                                onPress={() => { onExit(won ? true : false); }}
                                source={leftimg}
                            />

                            {/* Restart level */}
                            <NavigationPressable
                                onPress={() => { resetGame(); }}
                                source={restartimg}
                            />

                            {/* Next level */}
                            {/* TODO: Replace 'true' with infinite condition */}
                            {(won || true) && (
                                <NavigationPressable
                                    onPress={() => { onNext(); }}
                                    source={nextimg}
                                />
                            )}
                        </View>
                    </View>
                )}
            </View>
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
        width: 50,
        height: 100,
        position: 'absolute',
        bottom: 90,
        left: 0,
    },
    floor: {
        width: '100%',
        height: 110,
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
    buttonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    gameOverText: {
        fontFamily: 'PressStart2P',
        fontSize: 35,
        color: 'white',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '75%',
        bottom: 100,
        
    },
    scoreArea: {
        justifyContent: 'center',
        alignContents: 'center',  
        paddingBottom: 20,
    },
    scoreText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
});