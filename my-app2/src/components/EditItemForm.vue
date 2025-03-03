<template>
    <div class="item-form">
        <h2>Add New Item</h2>
        <form @submit.prevent="submitForm">
            <input type="text" v-model="name" placeholder="Name" required>
            <input type="text" v-model="description" placeholder="Description">
            <select v-model="categoryId" required>
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                </option>
            </select>
            <input type="file" accept="image/*" @change="handleImageUpload">
            <button type="submit">Add Item</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios'
import { gsap } from 'gsap'

export default {
    data() {
        return {
            name: "",
            description: "",
            categoryId: "",
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
        handleImageUpload(event) {
            this.image = event.target.files[0]
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
                /* gsap.fromTo('.item-form', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.9, duration: 0.5, onComplete: () => {
                     this.$router.push({ name: 'Profile' })
                 })*/
                gsap.fromTo('.item-form', { opacity: 1, scale: 1 }, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.5,
                    onComplete: () => {
                        this.$router.push({ name: 'Profile' })
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
.item-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input,
select {
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