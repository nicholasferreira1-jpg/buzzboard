import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header'; 
import Footer from './components/Footer'; // new component 
import HomePage from './pages/HomePage';  // new page
import AboutPage from './pages/AboutPage';  // new page
import PostDetailPage from './pages/PostDetailPage';  // new page
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 

// App.jsx
const defaultPost = [
    {
      id: 1,
      username: "TechGuru42",
      avatar: "https://placehold.co/100x100/FF6B6B/ffffff?text=TG42",
      content: "Finally understood props in React. It's like function arguments!",
      timestamp: "5 minutes ago",
      likes: 5,
      comments: 3,
      shares: 1
    },
    {
      id: 2,
      username: "CodeNinja",
      avatar: "https://placehold.co/100x100/4ECDC4/ffffff?text=CL",
      content: "Building a social media clone to learn React. Best way to learn! 💪",
      timestamp: "20 minutes ago",
      likes: 22,
      comments: 5,
      shares: 2
    },
    {
      id: 3,
      username: "DebugQueen",
      avatar: "https://placehold.co/100x100/95E77E/ffffff?text=Dev",
      content: "React components + props = unlimited possibilities 🚀",
      timestamp: "59 minutes ago",
      likes: 51,
      comments: 6,
      shares: 4
    }
  ];

function App() {
  // 1. LOAD: Initialize state from localStorage or use defaultPosts
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : defaultPosts;
  });

  // 2. SAVE: Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    catch {
      console.warn('Could not save cart to localStorage:', error);
    }
  }, [posts]);
  
  const addPost = (data) => { 
    const newPost = {
      id: posts.length + 1,
      username: data.username,
      content: data.content,
      avatar: "https://placehold.co/100x100/4ECDC4/ffffff",
      timestamp: "0 minutes ago",
      likes: 0,
      comments: 0,
      shares: 0
    };
    setPosts([...posts, newPost]); 
  };

  // Delete a post by id
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  // Use filter to get only top posts (posts with 20+ likes)
  const topPosts = posts.filter(post => post.likes >= 20);

  // Engagement statistics
  const totalLikes = posts.reduce((total, post) => total + post.likes, 0);
  const totalComments = posts.reduce((total, post) => total + post.comments, 0);
  const totalShares = posts.reduce((total, post) => total + post.shares, 0);
  
  
  // Calculate total engagement
  const totalEngagement = posts.reduce((total, post) => {
    return total + post.likes + post.comments + post.shares;
  }, 0);

  
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage posts={posts} deletePost={deletePost} addPost={addPost} topPosts = {topPosts}/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/post/:id" element={<PostDetailPage posts={posts} deletePost = {deletePost} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
  

  

export default App;