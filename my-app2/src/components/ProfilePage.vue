<template>
    <div class="profile-page">
        <h2>My Wardrobe</h2>
        <div class="filters">
            <input v-model="searchQuery" placeholder="Search items..." @input="fetchItems">
            <select v-model="selectedCategoryId" @change="fetchItems">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div class="items-grid">
            <transition-group name="fade">
                <div v-for="item in items" :key="item.id" class="item-card" @click="editItem(item)">
                    <img :src="`http://localhost:8000/storage/${item.image_path}`" alt="Item">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.description }}</p>
                    <button @click.stop="deleteItem(item.id)">Delete</button>
                </div>
            </transition-group>
        </div>
        <router-link to="/profile/add-item">Add New Item</router-link>
    </div>
</template>

<script>
import Axios from 'axios'
import { gsap } from 'gsap'

export default {
    data() {
        return {
            items: [],
            categories: [],
            selectedCategoryId: '',
            searchQuery: ''
        }
    },
    created() {
        this.fetchCategories()
        this.fetchItems()
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
        async fetchItems() {
            const params = {}
            if (this.selectedCategoryId) params.category_id = this.selectedCategoryId
            if (this.searchQuery) params.search = this.searchQuery
            try {
                const response = await Axios.get('/api/clothing-items', { params })
                this.items = response.data
                // Animate items entering
                gsap.from('.item-card', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 })
            } catch (error) {
                console.error(error)
            }
        },
        editItem(item) {
            this.$router.push({ name: 'EditItem', params: { id: item.id } })
        },
        async deleteItem(itemId) {
            try {
                await Axios.delete(`/api/clothing-items/${itemId}`)
                this.fetchItems()
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
.profile-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filters input, .filters select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    position: relative;
    perspective: 1000px;
    transition: transform 0.3s;
}

.item-card:hover {
    transform: rotateY(20deg);
}

.item-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
}

.item-card h3 {
    margin: 10px 0;
    font-size: 1.1em;
}

.item-card p {
    margin: 0 0 10px 0;
    color: #666;
}

.item-card button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 5px 10px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>