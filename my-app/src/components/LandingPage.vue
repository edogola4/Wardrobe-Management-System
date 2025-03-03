<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Welcome to Wardrobe Management System</h1>
                <v-btn to="/login">Login</v-btn>
                <v-btn to="/register">Register</v-btn>
            </v-col>
        </v-row>
    </v-container>
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