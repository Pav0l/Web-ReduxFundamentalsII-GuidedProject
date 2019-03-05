import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import uuid from 'uuid';
import Container from './components/Container';
import dummyQuotes from './constants/dummyQuotes';

// =================================================================== ACTION TYPES (pull out)
export const DELETE_QUOTE = 'DELETE_QUOTE';
export const MAKE_QUOTE_OF_THE_DAY = 'MAKE_QUOTE_OF_THE_DAY';
export const ADD_QUOTE = 'ADD_QUOTE';

// =================================================================== REDUCERS  (pull out)
// REDUCER quotes
function quotes(state = dummyQuotes, action) {
  // 1- flesh out using action types as your guide
  switch (action.type) {
    case ADD_QUOTE:
    // I'm getting action.payload containing a new quote
    // I need to return the array of quotes with nrw quote
      return state.concat(action.payload);

    case DELETE_QUOTE:
      return state.filter(quote => quote.id !== action.payload);

    default:
      return state;
  }
}

// REDUCER quoteOfTheDay
function quoteOfTheDay(state = null, action) {
  // 2- flesh out using action types as your guide
  switch (action.type) {
    case MAKE_QUOTE_OF_THE_DAY:
      return action.payload;

    case DELETE_QUOTE:
      return state === action.payload ? null : state;

    default:
      return state;
  }
}

// =================================================================== COMBINE REDUCERS
// 3- use combineReducers to create a root reducer off of our reducers
const rootReducer = combineReducers({ quotes, quoteOfTheDay });

// =================================================================== ACTION CREATORS  (pull out)
// 4- ACTION CREATOR deleteQuote
export function deleteQuote(id) {
  return {
    // what type?
    type: DELETE_QUOTE,
    // what payload?
    payload: id,
  };
}

// 5- ACTION CREATOR makeQuoteOfTheDay
export function makeQuoteOfTheDay(id) {
  return {
    // what type?
    type: MAKE_QUOTE_OF_THE_DAY,
    // what payload?
    payload: id,
  };
}

// 6- ACTION CREATOR addQuote
export function addQuote(author, text) {
  return {
    // what type?
    type: ADD_QUOTE,
    // what payload?
    payload: {
      id: uuid(),
      author,
      text,
    },
  };
}

// =================================================================== CREATE THE STORE
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// =================================================================== INJECT THE STORE
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.querySelector('#target'),
);
