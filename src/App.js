import React, { useReducer, useState, useEffect } from "react";
import "./styles.css";
import { createReducer } from "react-use";
import logger from "redux-logger";
import thunk from "redux-thunk";

const useThunkReducer = createReducer(thunk, logger);

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return [...state, 1];
    case "decrement":
      return [...state, 0];
    case "reset":
      return [];
    default:
      throw new Error();
  }
}

var arrayNumbers = [1, 2, 3, 4];

////

export default function App() {
  ///
  const addAndReset = React.useCallback(() => {
    return (dispatch) => {
      dispatch({ type: "increment" });

      setTimeout(() => {
        dispatch({ type: "decrement" });
      }, 300);
    };
  }, [arrayNumbers]);

  ///
  const [state, dispatch] = useThunkReducer(
    reducer,
    Array(window.localStorage.getItem("arrayNumbers")) || arrayNumbers
  );
  ///

  useEffect(() => {
    //Added a type Array to the item in local storage to typecast at the moment of setting and getting
    window.localStorage.setItem(Array("arrayNumbers"), state);
    console.log(window.localStorage.getItem("arrayNumbers"));
  }, [state]);

  return (
    <div>
      <p> {state}</p>

      <button onClick={() => dispatch(addAndReset())}>Cambiale</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reinicio</button>
    </div>
  );
}
