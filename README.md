# racepace3D
Upgraded version of racepace made for mobile devices

# What is racepace?
Racepace is a game about running and jumping throughout many different levels, you play as multiple levels and ulock new levels and cosmetics as you go. The purpose of the game is to have fun, unlock levels and build your highscore. You will also be able to have friends to share your highscore with, and teams to build group highscores with as well.

# Game setup
To set up racepace3D simply clone the repo locally and then run npm install to get the node modules missing. Then simply run npm start in the terminal, connect with your mobile device via the QR code or run the simulator on your computer and experience the game

# Current Features So Far

## Game Features

### Level Selection
Different levels to play on in the racepace 3D game. These levels will have different enemies based on the different enviornment and biome that the levels are in.

### Level Unlocking
The seperate levels will be unlocked through playing through and beating the previous levels.

### Basic Game
Running, Jumping, Winning and Losing are all possible. It's in it's early stages, but working none the less

## Customizaiton Features

### Customization Unlocking
Unlock the different characters that Racepace3D has to offer, and equip them through the menu.


# Feature Upgrades Yet to implement

## Game Upgrades

### Different Enemies
Unlike Racepace on the web, there will be multiple different kinds of enemies coming from all angles and not just sitting on the floor.

## Customization upgrades

### Name Customization
Be able to customize your username and tagline.


## User Upgrades

### Teams
New with this version of racepace will be the ability to join a team with a group of people. One person will lead the team, and the others will join it, and compete for high score.

### Friends
Not on a team, but still want to compete for high scores against your friends? then simply send them a friend request and go to your friend page to see there scores, current character, and other customizations they have.

# Installation instructions

- run npm install
- run npm start or npx expo start
- run in a simulator or on your phone in the expo app

# Dependencies and APIs

## APIs

currently we use the firebase Authentication API to manage users. 
And the realtime database APIs 

### current API points

- Login
- Signup
- RealTimeDatabase


# Team member's roles and contributions


## Martin
### Gameplay
I am in charge of building the gameplay portion of RacePace3D. I did this by creating a BaseGame.js, which is essentially a template for each level. After creating this template, I can edit different aspects of it unique to the individual level. Some of these customizations are background, playerGiF, barrierImg, and floorImg. Each of these items create a completely unique level from the same template.

## Asher
### Databases
I am working on the database integration for RacePace3D, I have implemented login, and registration. And Implemented characters syncing from the database. And the beginning of the Teams Screen. I am currently working on integrating the users to the realtime database