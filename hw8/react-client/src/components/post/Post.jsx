import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext); // Unwrap the user value to alias currentUser

  // Check if the post is already liked by the viewing user

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [post.likes, currentUser._id]);

  // BEGIN PART 13

  // Get the post author's user

  // YOUR CODE HERE

  // END PART 13

  // Increase the like and update in DB based on states

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img
            className="postImg"
            src={post.image ? PF + post.image : ""}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{likes} people like it</span>
          </div>
        </div>
      </div>
    </div>
  );
}
