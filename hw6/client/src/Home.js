import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    try {
      // QUESTION 2
      // REPLACE WITH YOUR CODE
    } catch (e) {
      console.log(e);
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <div className="content-container">
          <div className="row">
              {videos.map(video =>
                <div className="col-md-4" key={video.id}>
                    <Link to={`/player/${video.id}`}>
                        <div className="card">
                            <img src={`http://localhost:4000${video.thumbnail}`} alt={video.name} />
                            <div className="card-body">
                                <h3>{video.name}</h3>
                                <p>{video.description}</p>
                            </div>
                        </div>
                    </Link>
                </div>
              )}
          </div>
      </div>
      <Footer />
  </div>
  )
};

export default Home;
