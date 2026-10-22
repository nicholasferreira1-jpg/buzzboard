import { useState } from 'react'; 
import "./AddPost.css";

// New component for adding posts
function AddPost({ onAddPost }) {
  // Create state to store username and post content
  const [newUsername, setNewUsername] = useState("");
  const [newContent, setNewContent] = useState("");

  // Update the posts array in App.jsx by calling onAddPost when they submit
  const handleSubmit = () => {
    if (newUsername.trim() && newContent.trim()) {
      const newPost = {
        username: newUsername,
        content: newContent
      };
      onAddPost(newPost);
      setNewUsername(""); // Clear inputs after posting
      setNewContent("");
    }
  };

  return (
    <div className="add-post">
      <h3>Add New Post</h3>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="Your username"
      />
      <input
        type="text"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default AddPost;