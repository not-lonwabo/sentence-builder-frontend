import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  loading: true,
  error: '',
  words: {}
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        words: action.payload,
        error: ''
      }
    case 'FETCH_ERROR':
      return {
        loading: false,
        words: {},
        error: 'Something went wrong!'
      }
    default:
      return state
  }
}

function SentenceBuilder() {

  const [wordTypes, setWordTypes] = useState([]);
  const [type, setType] = useState('');
  const [editedSentence, setEditedSentence] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const buildSentence = (newWord) => {
    setEditedSentence(prevState => prevState + newWord + ' ')
  }

  const postSentence = () => {
    axios.post('http://localhost:5000/sentences/submit', {
      "sentence": editedSentence
    })
    .then(res => {
      alert(res.data)
    })
    .catch(err => {
      alert(err);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/words')
      .then((res) => {
        dispatch({type: 'FETCH_SUCCESS', payload: res.data[0], wordTypes: Object.keys(res.data)});
        setWordTypes(Object.keys(res.data[0]));
        console.log('how is it here... ???');
      })
      .catch(() => {
        dispatch({type: 'FETCH_ERROR'})
        console.log('here... ???');
      });
  }, []);

  return (
    <div>
      {
        state.loading
          ? <h2 className="text-center">Hang on Shakespeare, we're loading your canvas...</h2>
          : state.err
            ? <h2 className="text-center">{state.err}</h2>
            : <div>
                <div className="btn-group d-flex" role="group" aria-label="...">
                  {
                    wordTypes.slice(1, wordTypes.length-2).map(speechType => {
                      return <button key={speechType} type="button" onClick={() => setType(speechType)} className="btn btn-secondary border w-100">{speechType}</button>
                    })
                  }
                </div>
                <br/>
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control input-lg" id="search-church" placeholder="Your sentence goes here!" value={editedSentence}/>
                  <span className="input-group-btn">
                    <button className="btn btn-default btn-lg" type="submit" onClick={() => postSentence()}>Submit</button>
                  </span>
                </div>
                <br/>
                <div className='btn-group d-flex flex-wrap' role='group' aria-label="...">
                  {
                    type
                    ? state.words[type].map((item, index) => {
                        return <div key={index} className="badge bg-secondary col-lg-1 fs6" style={{marginBottom: '8px'}} onClick={() => buildSentence(item)}>{item}</div>
                      })
                    : <></>
                  }
                </div>
              </div>
      }
    </div>
  )
}

export default SentenceBuilder