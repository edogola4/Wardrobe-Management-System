<template>
    <v-container>
        <v-select v-model="selectedCategoryId" :items="categories" item-title="name" item-value="id" label="Filter by Category"></v-select>
        <v-text-field v-model="searchQuery" label="Search Items" @input="fetchItems"></v-text-field>
        <v-list>
            <v-fade-transition v-for="item in items" :key="item.id">
                <ItemCard :item="item" @edit="editItem" @delete="deleteItem" />
            </v-fade-transition>
        </v-list>
        <v-btn to="/profile/add-item">Add New Item</v-btn>
    </v-container>
</template>

<script>
import Axios from 'axios'
import ItemCard from './ItemCard.vue'

export default {
    components: { ItemCard },
    data() {
        return {
            items: [],
            categories: [],
            selectedCategoryId: null,
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