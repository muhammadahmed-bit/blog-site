import React, { useState, useEffect } from 'react';
import './App.css'; // Importing our new CSS classes

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_WORDPRESS_API_URL;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not look right");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        
        // Trigger the Error Toast Notification
        setToast({ show: true, message: "⚠️ Error fetching blog updates. Please try again later." });
        
        // Automatically hide the toast alert after 4 seconds
        setTimeout(() => {
          setToast({ show: false, message: '' });
        }, 4000);
      });
  }, []);

  if (loading) {
    return <div className="loading-container">Loading workspace updates...</div>;
  }

  return (
    <div className="blog-container">
      {/* Dynamic Toast Alert Portal */}
      {toast.show && (
        <div className="toast-container">
          {toast.message}
        </div>
      )}

      <h1 className="blog-title">Latest Blog Posts</h1>
      
      {posts.map((post) => (
        <article key={post.id} className="post-card">
          <h2 className="post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      ))}
    </div>
  );
}

export default App;