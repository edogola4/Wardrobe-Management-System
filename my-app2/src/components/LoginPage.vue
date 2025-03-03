<template>
    <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async login() {
            try {
                const response = await Axios.post('/api/login', { email: this.email, password: this.password })
                localStorage.setItem('access_token', response.data.access_token)
                this.$router.push({ name: 'Profile' })
            } catch (error) {
                console.error(error)
                // Handle error, e.g., show alert
            }
        }
    }
}
</script>

<style scoped>
.login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #1565c0;
}
</style>