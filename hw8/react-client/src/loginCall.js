import axios from "axios";

// BEGIN PART 11

// YOUR CODE HERE
export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };
  

// END PART 11
