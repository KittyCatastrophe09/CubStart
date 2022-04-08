import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  // BEGIN PART 12

  // YOUR CODE HERE

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CubstartBook</span>
        </Link>
      </div>
      <div className="topbarRight">{/* YOUR CODE HERE */}</div>
    </div>
  );
  // END PART 12
}
