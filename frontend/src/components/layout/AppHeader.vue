<!-- src/components/layout/AppHeader.vue -->
<template>
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <router-link to="/">
              <h1>Wardrobe<span>Manager</span></h1>
            </router-link>
          </div>
          
          <nav class="nav-menu" :class="{ active: isMenuOpen }">
            <ul>
              <li><router-link to="/" @click="closeMenu">Home</router-link></li>
              <li v-if="isLoggedIn"><router-link to="/wardrobe" @click="closeMenu">My Wardrobe</router-link></li>
            </ul>
            
            <div class="auth-buttons">
              <template v-if="isLoggedIn">
                <span class="welcome-text">Welcome, {{ username }}</span>
                <button @click="handleLogout" class="btn-logout">Logout</button>
              </template>
              <template v-else>
                <router-link to="/login" class="btn btn-login" @click="closeMenu">Login</router-link>
                <router-link to="/register" class="btn btn-register" @click="closeMenu">Register</router-link>
              </template>
            </div>
          </nav>
          
          <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  // eslint-disable-next-line no-unused-vars
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'AppHeader',
    setup() {
      const router = useRouter();
      const isMenuOpen = ref(false);
      const isLoggedIn = ref(false);
      const username = ref('User');
      
      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
      };
      
      const closeMenu = () => {
        isMenuOpen.value = false;
      };
      
      const handleLogout = () => {
        // Clear user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Update local state
        isLoggedIn.value = false;
        
        // Redirect to home
        router.push('/');
        
        // Close mobile menu
        closeMenu();
      };
      
      // Check login status on component mount
      onMounted(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token) {
          isLoggedIn.value = true;
          
          if (userData) {
            try {
              const user = JSON.parse(userData);
              username.value = user.name || 'User';
            } catch (e) {
              console.error('Error parsing user data:', e);
            }
          }
        }
      });
      
      return {
        isMenuOpen,
        isLoggedIn,
        username,
        toggleMenu,
        closeMenu,
        handleLogout
      };
    }
  };
  </script>
  
  <style scoped>
  .app-header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }
  
  .logo a {
    text-decoration: none;
    color: #333;
  }
  
  .logo h1 {
    font-size: 24px;
    font-weight: 700;
  }
  
  .logo h1 span {
    color: #4caf50;
  }
  
  .nav-menu {
    display: flex;
    align-items: center;
  }
  
  .nav-menu ul {
    display: flex;
    list-style: none;
    margin-right: 24px;
  }
  
  .nav-menu ul li {
    margin-left: 20px;
  }
  
  .nav-menu ul li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 8px 0;
    position: relative;
  }
  
  .nav-menu ul li a:hover,
  .nav-menu ul li a.router-link-active {
    color: #4caf50;
  }
  
  .nav-menu ul li a.router-link-active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #4caf50;
  }
  
  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .welcome-text {
    margin-right: 8px;
    font-weight: 500;
  }
  
  .btn-login {
    background-color: transparent;
    color: #4caf50;
    border: 1px solid #4caf50;
  }
  
  .btn-register {
    background-color: #4caf50;
    color: white;
  }
  
  .btn-logout {
    padding: 8px 16px;
    background-color: transparent;
    border: 1px solid #f44336;
    color: #f44336;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-logout:hover {
    background-color: #f44336;
    color: white;
  }
  
  .menu-toggle {
    display: none;
    flex-direction: column;
    width: 30px;
    height: 21px;
    justify-content: space-between;
    background: transparent;
    border: none;
  }
  
  .menu-toggle span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #333;
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }
    
    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 40px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      z-index: 5;
    }
    
    .nav-menu.active {
      transform: translateX(0);
    }
    
    .nav-menu ul {
      flex-direction: column;
      margin-right: 0;
      margin-bottom: 32px;
    }
    
    .nav-menu ul li {
      margin: 16px 0;
      text-align: center;
    }
    
    .nav-menu ul li a {
      font-size: 18px;
    }
    
    .auth-buttons {
      flex-direction: column;
      gap: 16px;
    }
  }
  </style>