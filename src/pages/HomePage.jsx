import AddPost from "../components/AddPost"; 
import PostCard from "../components/PostCard";

function HomePage({ posts, topPosts, addPost, deletePost }) {
  return (
    <main className="main-content">
        <AddPost onAddPost={addPost} />
        <h2>Top Posts</h2>
        {topPosts.length > 0 ? (
        topPosts.map(post => (
            <PostCard 
              key={post.id} 
              username={post.username} 
              avatar={post.avatar} 
              content={post.content} 
              timestamp={post.timestamp} 
              likes={post.likes} 
              comments={post.comments} 
              shares={post.shares} 
              postId = {post.id}
              onDeletePost= {deletePost} />
          ))
        ) : (
          <div className="empty-feed">
            <h3>No Top Posts</h3>
            <p>No top posts yet! Start sharing your thoughts!</p>
          </div>
        )}

    	{/*Conditionally render your feed*/}
        <h2>Your Feed</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard 
              key={post.id}
              postId={post.id}
              username={post.username}
              content={post.content}
              onDeletePost={deletePost}
            />
          ))
        ) : (
          <div className="empty-feed">
            <h3>Your feed is empty</h3>
            <p>No posts to display. Start sharing your thoughts!</p>
          </div>
        )}
    </main>
    
  );

}

export default HomePage;