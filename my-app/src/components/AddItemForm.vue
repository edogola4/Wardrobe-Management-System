<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Description" v-model="description"></v-text-field>
        <v-select v-model="categoryId" :items="categories" item-title="name" item-value="id" label="Category"></v-select>
        <v-file-input v-model="image" label="Image" accept="image/*"></v-file-input>
        <v-btn type="submit">Submit</v-btn>
    </v-form>
</template>

<script>
import Axios from 'axios'

export default {
    data() {
        return {
            name: "",
            description: "",
            categoryId: null,
            image: null,
            categories: []
        }
    },
    created() {
        this.fetchCategories()
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await Axios.get('/api/categories')
                this.categories = response.data
            } catch (error) {
                console.error(error)
            }
        },
        async submitForm() {
            const formData = new FormData()
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('category_id', this.categoryId)
            if (this.image) formData.append('image', this.image)
            try {
                await Axios.post('/api/clothing-items', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                this.$router.push({ name: 'Profile' })
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>