import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  aiAunt: true,
  user: null,
  userLogin: null,
  userFriend:null,
  pet:null,
  pets:[],
  token: null,
  tokenP:null,
  friends:[],
  posts: [],
  ai:[],
  post:null,
  comments:[],
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
      state.userLogin = action.payload.userLogin;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
    },
    setLoginPet: (state, action) => {
      state.pet = action.payload.pet;
      
    },
    setaiAunt: (state, action) => {
      state.aiAunt = action.payload.aiAunt;
      
    },
    setUserFriend: (state, action) => {
      state.userFriend = action.payload.userFriend;
      
    },
    setUserPost:(state,action)=>{
      state.post =action.payload.post;
      state.friends =action.payload.friends;
    },
    setLogout: (state) => {
      state.userLogin = null;
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
    setAi: (state, action) => {
      state.ai = action.payload.ai;
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
    setComment: (state, action) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment._id === action.payload.comment._id) return action.payload.comment;
        return comment;
      });
      state.comments = updatedComments;
    },
    setComments: (state, action) => {
      state.comments = action.payload.comments;
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

export const { setMode, setLogin,setLoginPet,setaiAunt,setUserFriend,setUserPost, setLogout,setLogoutPet, setFriends, setPosts,setAi,setPets,setPet, setPost,setComment,setComments,setPostsPets,setPostPets } =
  authSlice.actions;
export default authSlice.reducer;
