import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = () => {
  const { videoID } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    try {
      // QUESTION 5
      // REPLACE WITH YOUR CODE
    } catch (e) {
      console.log(e);
    }
  }, [videoID])

  return (
    <div className="app">
      <Header />
      <div className="content-container">
          <video controls muted autoPlay>
            {/* QUESTION 6 */}
            <source src={"REPLACE WITH YOUR CODE"} type="video/mp4"></source>
          </video>
          <h1>{ videoData.name }</h1>
      </div>
      <Footer />
    </div>
  )
};

export default Home;
