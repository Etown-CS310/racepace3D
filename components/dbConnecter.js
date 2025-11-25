import axios from 'axios';
import { createContext } from 'react';
import { API_KEY } from './apikey';
import * as SecureStore from 'expo-secure-store';



export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    uid: null,
});


async function auth(email,password,mode)
{
    //console.log(API_KEY);
    const url = mode === 'login' ?
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    //console.log(email,password,mode)
    const response = await axios.post(url,{
        email: email,
        password: password,
        returnSecureToken: true
    });
    //console.log(response.data);
    AuthContext.token= response.data.idToken;
    AuthContext.isLoggedIn= true;
    AuthContext.uid= response.data.localId;
    await SecureStore.setItemAsync('token',response.data.refreshToken);
    //console.log(await SecureStore.getItemAsync('token'));
    return response.data.idToken;
}

export async function refreshToken()
{
    const token = await SecureStore.getItemAsync('token');
    //console.log(token);
    if(token == null)
        return false;
    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
    const response = await axios.post(url,
        {
            grant_type: 'refresh_token',
            refresh_token: token
        }
    );
    //console.log(response.data.user_id);
    AuthContext.token= response.data.id_token;
    AuthContext.isLoggedIn= true;
    AuthContext.uid= response.data.user_id;
    await SecureStore.setItemAsync('token',response.data.refresh_token);
    return true;
}


export async function login(email, password) 
{
        const id = await auth(email, password, 'login');
        if(id!=null)
            return true;
}

export async function signUp(email, password) 
{
        const id = await auth(email, password, 'signup');
        if(id!=null)
            return true;
}

async function waitForToken({ interval = 500 } = {}) {
  while (true) {
    if (AuthContext.token) return AuthContext.token;
    await new Promise((r) => setTimeout(r, interval));
  }
}

async function queryDB(token,Purpose)
{
    token=await waitForToken();
    const api_url = `https://racepace3d-default-rtdb.firebaseio.com/${Purpose}.json?auth=${token}`;

    const response = await axios.get(api_url);
    return response.data;
}

async function postDB(token,Purpose,data)
{
    const api_url = `https://racepace3d-default-rtdb.firebaseio.com/${Purpose}.json?auth=${token}`;

    const response = await axios.put(api_url,data);
    //console.log(response.data);
    return response.data;
}

export async function getTeams()
{
    const token = AuthContext.token;
    return await queryDB(token,'Teams');
}

export async function getCharacters()
{
    const charData =  await queryDB(AuthContext.token,'Characters');
    return charData;
    //console.log(charData);
}
/*

Fix the weird issue with wiping out the user data in the database. Probally something to do with not awaiting somewhere

*/

export async function getFriends()
{
    const me= await getMe();
    
    const friends=await  Promise.all(me.friendships.map(async (friendID)=>{
        const friendData=await getSinglePerson(friendID.uid);
        friendData.status=friendID.status;
        friendData.uid=friendID.uid;
        return friendData;
    }));
    //console.log(friends);
    return friends;

}

export async function requestFriendship(friendUID)
{
    if(friendUID===AuthContext.uid || friendUID.length===0)
        return 1;
    const friendData=await getSinglePerson(friendUID);
    const myData=await getMe();
    
    if(friendData==null || myData==null)
        return 2;
    
    //console.log(friendData.friendships);
    //console.log(myData.friendships);



    let myResponse,friendResponse;

    if(friendData.friendships===undefined)
        friendResponse=await postDB(AuthContext.token,'Users/'+friendUID+'/friendships',[{"uid":AuthContext.uid,"status":"pending"}]);
    else
    {
        if(friendData.friendships.some((friend) => friend.uid===AuthContext.uid))
            return 3;
        friendResponse=await postDB(AuthContext.token,'Users/'+friendUID+'/friendships',[ ...friendData.friendships, {"uid":AuthContext.uid,"status":"pending"}]);
    }

    //console.log(friendResponse);

    if(myData.friendships===undefined)
        myResponse=await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/friendships',[{"uid":friendUID,"status":"requested"}]);
    else
    {
        myResponse=await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/friendships',[ ...myData.friendships, {"uid":friendUID,"status":"requested"}]);
    }
    //console.log(myResponse);
    return 0;
}

export async function acceptFriendship(friendUID)
{
    //console.log("Accepting friendship with "+friendUID);
    const friendData=await getSinglePerson(friendUID);
    const myData=await getMe();
    //console.log(friendData,myData);
    
    if(friendData==null || myData==null)
        return 2;

    const friendResponse=await postDB(AuthContext.token,'Users/'+friendUID+'/friendships',
        myData.friendships.map((friend) => {
            if(friend.uid===AuthContext.uid)
                return {"uid":AuthContext.uid,"status":"accepted"};
            return friend;
        }));
    const myResponse=await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/friendships',
        myData.friendships.map((friend) => {
            if(friend.uid===friendUID)
                return {"uid":friend.uid,"status":"accepted"};
            return friend;
        }));
    
    if(friendResponse==null || myResponse==null)
        return 1;

    return 0;

}

export async function denyFriendship(friendUID)
{
    const friendData=await getSinglePerson(friendUID);
    const myData=await getMe();
    
    if(friendData==null || myData==null)
        return 2;

    const friendResponse=await postDB(AuthContext.token,'Users/'+friendUID+'/friendships',
        friendData.friendships.map((friend) => {
            if(friend.uid===AuthContext.uid)
                return;
            return friend;
        }));
    const myResponse=await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/friendships',
        myData.friendships.map((friend) => {
            if(friend.uid===friendUID)
                return;
            return friend;
        }));
    //console.log(friendResponse,myResponse);
    if((friendResponse==null && friendData.length!==1) || (myResponse==null && myData.length!==1))
        return 1;

    return 0;
}

export async function removeFriend(friendUID)
{
    const friendData=await getSinglePerson(friendUID);
    const myData=await getMe();
    
    if(friendData==null || myData==null)
        return 2;

    const friendResponse=await postDB(AuthContext.token,'Users/'+friendUID+'/friendships',
        myData.friendships.map((friend) => {
            if(friend.uid===AuthContext.uid)
                return;
            return friend;
        }));
    const myResponse=await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/friendships',
        myData.friendships.map((friend) => {
            if(friend.uid===friendUID)
                return;
            return friend;
        }));
    
    if(friendResponse==null || myResponse==null)
        return 1;

    return 0;
}

export async function getMe()
{
    await waitForToken();
    const me=await queryDB(AuthContext.token,'Users/'+AuthContext.uid);
    //console.log(me);
    if(me==null)
    {
        //console.log("Creating user");
        const newMe={
            "char":{"id":0},
            "highScore":0,
            "username":"Template",
            "teamID":-1,
            "friendships":[],
            "unlockedChars":["cole","eliud","grant","jakob","mo"],
            "completedTracks":[]
            };

        await postDB(AuthContext.token,'Users/'+AuthContext.uid,
            newMe);
        return newMe;
    }
    //console.log(me);
    return me;
}

export async function getSinglePerson(uid) 
{
    return await queryDB(AuthContext.token,'Users/'+uid);
}

export async function createTeam(teamName, teamDesc)
{
    return await postDB(AuthContext.token,'Teams/'+AuthContext.uid, {
        captain: AuthContext.uid,
        description: teamDesc,
        members: [AuthContext.uid],
        name: teamName
    });
}

export async function joinTeam(teamID)
{
    return await postDB(AuthContext.token,'Teams/'+teamID+'/members',
        [...(await queryDB(AuthContext.token,'Teams/'+teamID+'/members')),AuthContext.uid]);
}

export async function leaveTeam(teamID)
{
    const teamData=await queryDB(AuthContext.token,'Teams/'+teamID);
    return await postDB(AuthContext.token,'Teams/'+teamID+'/members',
        teamData.members.filter((member)=>member!==AuthContext.uid));
}

export async function deleteTeam(teamID)
{
    return await postDB(AuthContext.token,'Teams/'+teamID,null);
}
export async function unlockLevels(unlockedLevels)
{
    const response = await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/unlockedLevels',unlockedLevels);
    return response;
}

export async function updateCharacter(charID)
{
    //console.log("Updating character to "+charID);
    const response = await postDB(AuthContext.token,'Users/'+AuthContext.uid+'/char',{"id":charID});
    return response;
}

export async function updateHighScore(newScore)
{

}

export async function getHighScores()
{
    
}