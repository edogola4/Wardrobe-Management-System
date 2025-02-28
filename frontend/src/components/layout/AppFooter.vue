<!-- src/components/layout/AppFooter.vue -->
<template>
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h2>Wardrobe<span>Manager</span></h2>
            <p>Organize your clothing with style</p>
          </div>
          
          <div class="footer-links">
            <div class="link-group">
              <h3>Navigation</h3>
              <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/wardrobe">My Wardrobe</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/register">Register</router-link></li>
              </ul>
            </div>
            
            <div class="link-group">
              <h3>Contact</h3>
              <ul>
                <li><a href="mailto:support@uzapoint.com">support@uzapoint.com</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} WardrobeManager by UzaPoint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'AppFooter',
    setup() {
      const currentYear = computed(() => new Date().getFullYear());
      
      return {
        currentYear
      };
    }
  };
  </script>
  
  <style scoped>
  .app-footer {
    background-color: #222;
    color: #f5f5f5;
    padding: 40px 0 20px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  
  .footer-logo h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  
  .footer-logo span {
    color: #4caf50;
  }
  
  .footer-logo p {
    color: #aaa;
    max-width: 300px;
  }
  
  .footer-links {
    display: flex;
    gap: 60px;
  }
  
  .link-group h3 {
    font-size: 16px;
    color: #fff;
    margin-bottom: 16px;
    position: relative;
  }
  
  .link-group h3::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: #4caf50;
  }
  
  .link-group ul {
    list-style: none;
  }
  
  .link-group ul li {
    margin-bottom: 10px;
  }
  
  .link-group ul li a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .link-group ul li a:hover {
    color: #4caf50;
  }
  
  .footer-bottom {
    border-top: 1px solid #333;
    padding-top: 20px;
    text-align: center;
    color: #777;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 40px;
    }
    
    .footer-links {
      gap: 40px;
    }
  }
  
  @media (max-width: 480px) {
    .footer-links {
      flex-direction: column;
      gap: 30px;
    }
  }
  </style>