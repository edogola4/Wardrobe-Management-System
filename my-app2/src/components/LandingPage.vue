<template>
    <div class="landing-page">
        <h1>Welcome to Wardrobe Management System</h1>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
    </div>
</template>

<script>
export default {
    mounted() {
        const token = localStorage.getItem('access_token')
        if (token) {
            this.$router.push({ name: 'Profile' })
        }
    }
}
</script>

<style scoped>
.landing-page {
    text-align: center;
    padding: 20px;
}

h1 {
    color: #1976d2;
}

a {
    display: inline-block;
    margin: 10px;
    padding: 10px 20px;
    background-color: #1976d2;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}

a:hover {
    background-color: #1565c0;
}
</style>