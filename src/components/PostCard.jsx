import "./PostCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";

// PostCard.jsx
function PostCard({ username, avatar, content, timestamp, likes, comments, shares , postId, onDeletePost }) {
    console.log(`Rendering post from ${username}`);
    const [likeCount, setLikeCount] = useState(likes);
    const [shareCount, setShareCount] = useState(shares);

    const handleLike = () => {
    setLikeCount(likeCount + 1);  // This triggers a re-render
    };
  
    const handleShare = () => {
    setShareCount(shareCount + 1);  // This triggers a re-render
    };
  

    // Components are just functions
    return (
        // This looks like HTML but it's JSX
        <div className="post-card">
            <div className="post-header">
                <img 
                    src={avatar}
                    alt="User avatar" 
                    className="avatar"
                />
                <div className="user-info">
                    <h3 className="username">{username}</h3>
                    <span className="timestamp">{timestamp}</span>
                </div>
            </div>
            <Link to={`/post/${postId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
                <p className="post-content"> {content} </p> 
            </Link>
            <div className="post-actions">
                <button onClick={handleLike}>
                👍 {likeCount}  {/* Now it updates! */}
                </button>
                <button className="action-btn">💬 {comments}</button>
                <button onClick={handleShare}>
                    🔄 {shareCount}  {/* Now it updates! */}
                </button>
            </div>
            <button className="delete-btn" onClick={() => onDeletePost(postId)}>
                    Delete Post
            </button>
        </div>
  );
}

// Every component file must export the component
export default PostCard;