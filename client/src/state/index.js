import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  pet:null,
  pets:[],
  token: null,
  tokenP:null,
  posts: [],
  postsPets:[],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoginPet: (state, action) => {
      state.pet = action.payload.pet;
      
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setLogoutPet: (state) => {
      state.pet = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPets: (state, action) => {
      state.pets = action.payload.pets;
    },
    setPet: (state, action) => {
      const updatedPets = state.pets.map((pet) => {
        if (pet._id === action.payload.pet._id) return action.payload.pet;
        return pet;
      });
      state.pets = updatedPets;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setPostsPets: (state, action) => {
      state.postsPets = action.payload.postsPets;
    },
    setPostPets: (state, action) => {
      const updatedPostsPets = state.postsPets.map((postPet) => {
        if (postPet._id === action.payload.postPet._id) return action.payload.postPet;
        return postPet;
      });
      state.postsPets = updatedPostsPets;
    },
  },
});

export const { setMode, setLogin,setLoginPet, setLogout,setLogoutPet, setFriends, setPosts,setPets,setPet, setPost,setPostsPets,setPostPets } =
  authSlice.actions;
export default authSlice.reducer;
