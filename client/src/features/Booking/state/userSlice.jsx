import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const userState = localStorage.getItem("userVerification");
    return userState ? JSON.parse(userState) : null;
  } catch (error) {
    return null;
  }
};

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("userVerification", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const initialState = {
  user: loadFromLocalStorage(),
  isVerified: !!loadFromLocalStorage()?.emailVerified,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      saveToLocalStorage(state.user);
    },
    setEmailVerified: (state, action) => {
      state.user = {
        ...state.user,
        emailVerified: true,
        verifiedAt: new Date().toISOString(),
      };
      state.isVerified = true;
      saveToLocalStorage(state.user);
    },
    clearUser: (state) => {
      state.user = null;
      state.isVerified = false;
      localStorage.removeItem("userVerification");
    },
  },
});

export const { setUserDetails, setEmailVerified, clearUser } = userSlice.actions;
export default userSlice.reducer;
