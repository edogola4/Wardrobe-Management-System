<template>
    <div class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input type="text" v-model="name" placeholder="Name" required>
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios'

export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async register() {
            try {
                await Axios.post('/api/register', { name: this.name, email: this.email, password: this.password })
                this.$router.push({ name: 'Login' })
            } catch (error) {
                console.error(error)
                // Handle error
            }
        }
    }
}
</script>

<style scoped>
.register-form {
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