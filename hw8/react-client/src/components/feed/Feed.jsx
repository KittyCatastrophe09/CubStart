import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  // BEGIN PART 14

  // YOUR CODE HERE

  // END PART 14

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(username === user.username || !username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
