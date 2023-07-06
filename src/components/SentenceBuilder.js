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
  const [selectIndex, setSelectIndex] = useState();
  const [editedSentence, setEditedSentence] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const clickType = (speechType, index) => {
    setType(speechType);
    setSelectIndex(index)
  }
  const buildSentence = (newWord) => {
    if (!editedSentence) {
      newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
    }
    setEditedSentence(prevState => prevState + newWord + ' ')
    setType('');
  }

  const postSentence = () => {
    axios.post('http://localhost:5000/sentences/submit', {
      "sentence": editedSentence.trimEnd()
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
      })
      .catch(() => {
        dispatch({type: 'FETCH_ERROR'})
      });
    }, []);
    
  return (
    <div>
      {
        state.loading
          ? <h2 className="text-center">Hang on Shakespeare, we're loading your canvas...</h2>
          : !!state.error
            ? <h2 className="text-center">Seems we have writer's block at the moment, check back in 5 minutes hot shot, We need to do some Pomodoro.</h2>
            : <div>
                <div className="btn-group d-flex flex-wrap" aria-label="...">
                  {
                    wordTypes.slice(1, wordTypes.length-2).map((speechType, index) => {
                      return <button key={speechType} type="button" onClick={() => clickType(speechType, index)} disabled={selectIndex === index} className="btn btn-secondary border w-100">{speechType}</button>
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
                    ? [...new Set(state.words[type])].sort().map((item, index) => {
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