import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  loading: true,
  error: '',
  sentences: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        sentences: action.payload,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        sentences: {},
        error: 'Something went wrong!'
      }
    default:
      return state
  }
}

function Sentences() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('http://localhost:4000/sentences')
      .then(res => {
        dispatch({type: 'FETCH_SUCCESS', payload: res.data});
      })
      .catch(() => dispatch({type: 'FETCH_ERROR'}));
  }, []);

  return (
    <div>
      {
        state.loading
          ? <h2>Loading...</h2> 
          : state.sentences.map(sentence => {
            return <p key={sentence.id} className='fs-6'>{sentence.sentence}.</p>
          })
      }
    </div>
  )
}

export default Sentences