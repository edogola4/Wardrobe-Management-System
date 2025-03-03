<template>
    <v-form @submit.prevent="register">
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        <v-btn type="submit">Register</v-btn>
    </v-form>
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