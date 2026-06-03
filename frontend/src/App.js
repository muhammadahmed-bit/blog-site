import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_WORDPRESS_API_URL;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontSize: '20px' }}>Loading workspace updates...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Latest Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ margin: '40px 0', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ color: '#0056b3' }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} style={{ lineHeight: '1.6' }} />
        </article>
      ))}
    </div>
  );
}

export default App;