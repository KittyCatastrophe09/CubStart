const AuthReducer = (state, action) => {
  // BEGIN PART 11
  switch (action.type) {
    // YOUR CODE HERE
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    default:
      return state;
  }
  // END PART 11
};

export default AuthReducer;
