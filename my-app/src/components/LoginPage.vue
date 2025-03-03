<template>
    <v-form @submit.prevent="login">
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        <v-btn type="submit">Login</v-btn>
    </v-form>
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