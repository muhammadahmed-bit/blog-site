# Headless Blog Backend

This directory tracks the content management architecture configurations for our decoupled starter blog.

## Local Server Environment Setup
The backend engine runs locally via XAMPP to insulate core data models from production timelines during active feature development.

1. Download and configure XAMPP on Windows.
2. Initialize Apache and MySQL services via the XAMPP Control Panel.
3. Extract the WordPress engine binaries into `C:\xampp\htdocs\blog-backend\`.
4. Establish a local database instance named `wordpress_db` via phpMyAdmin.
5. Map the local API data distribution endpoint directly to the fallback query route: `http://localhost/blog-backend/?rest_route=/wp/v2/posts`