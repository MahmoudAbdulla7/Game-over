import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let url = "https://free-to-play-games-database.p.rapidapi.com/api/games"

export let headers = {
  "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
}



export let getKindOfgame =createAsyncThunk('games/getGames' ,
async ( type)=>{
    let {data} =await axios.get(url ,{
      headers :headers,
      params: {'platform':type}
       
    })
    // console.log(type);
    // console.log(data);
    return data
  }
)

const initialState={gms :[] , loading :true}
let getGames =createSlice({
    name:'games',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getKindOfgame.fulfilled ,(state ,action)=>{
            // console.log(action.payload);
            state.gms=action.payload;
        })
    }
    
})
let gameReducer = getGames.reducer;
export default gameReducer;