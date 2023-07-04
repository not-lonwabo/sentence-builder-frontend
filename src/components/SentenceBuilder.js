import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SentenceBuilder() {

  const [words, setWords] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/words')
      .then((res) => console.log(res.json))
      .catch((err) => console.log('Error: ' + err));
  }, []);
  return (
    <div>
      <div className="btn-group d-flex" role="group" aria-label="...">
        {
          <button type="button" className="btn btn-default w-100">Left</button>
        }
      </div>
      <div className="input-group input-group-lg">
        <input type="text" className="form-control input-lg" id="search-church" placeholder="Your location (City, State, ZIP)"/>
        <span className="input-group-btn">
          <button className="btn btn-default btn-lg" type="submit">Search</button>
        </span>
      </div>
    </div>
  )
}

export default SentenceBuilder