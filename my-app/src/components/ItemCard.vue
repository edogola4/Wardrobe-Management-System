<template>
    <v-card class="item-card" @click="$emit('edit', item)">
        <v-img :src="`http://localhost:8000/storage/${item.image_path}`" alt="Item"></v-img>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text>{{ item.description }}</v-card-text>
        <v-btn @click.stop="$emit('delete', item.id)">Delete</v-btn>
    </v-card>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        editItem() {
            this.$emit('edit', this.item)
        },
        deleteItem() {
            this.$emit('delete', this.item.id)
        }
    }
}
</script>

<style scoped>
.item-card {
    transition: transform 0.3s;
    perspective: 1000px;
}

.item-card:hover {
    transform: translateZ(20px);
}

.item-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.item-card v-card-text {
    height: 100px;
    overflow: hidden;
}

.item-card v-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.item-card v-card {
    position: relative;
}

.item-card v-card v-card-text {
    padding-bottom: 40px;
}

.item-card v-card v-card-text::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, transparent, white);
}

.item-card v-card v-card-text p {
    margin-bottom: 0;
}

.item-card v-card v-card-text p::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, transparent, white);
}

.item-card v-card v-card-text p span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    max-height: 3.6em;
}

.item-card v-card v-card-text p span::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, transparent, white);
}

.item-card v-card v-card-text p span::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to top, transparent, white);
}
</style>