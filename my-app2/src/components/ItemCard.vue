<template>
    <div class="item-card" @click="$emit('edit', item)">
        <img :src="`http://localhost:8000/storage/${item.image_path}`" alt="Item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <button @click.stop="$emit('delete', item.id)">Delete</button>
    </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
    props: ['item'],
    mounted() {
        gsap.set(this.$el, { perspective: 1000 })
        this.$el.addEventListener('mousemove', this.handleMouseMove)
    },
    methods: {
        handleMouseMove(event) {
            const rect = this.$el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const mouseX = event.clientX - centerX
            const mouseY = event.clientY - centerY
            const rotateY = mouseX / 20
            const rotateX = -mouseY / 20
            gsap.to(this.$el, { rotationY: rotateY, rotationX: rotateX, duration: 0.3 })
        }
    }
}
</script>

<style scoped>
.item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.3s;
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
</style>