<template>
    <div>
        <header class="shadow-sm bg-gradient-to-l from-blue-400 to-green-400">
            <nav class="container mx-auto p-3 flex justify-between items-center border-t-2">
                <div class="flex items-center">
                    <v-img :width="120" aspect-ratio="16/9" cover src="/assets/img/logo-RSSA.png"></v-img>
                    <div>
                        <h1 class="text-lg font-bold text-white">RSUD Syaiful Anwar</h1>
                        <p class="text-base text-white">JawaTimur</p>
                    </div>
                </div>
                <!-- <NuxLink to="/">Home1</NuxLink>
                <nuxt-link to="/">A Home</nuxt-link><br>
                <nuxt-link to="/about">About</nuxt-link> -->
                <h1 class="text-5xl font-bold text-white">{{ time }}</h1>

                <!-- <ul class="flex gap-4">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><nuxt-link to="/about">About</nuxt-link></li>
                    <li><nuxt-link to="/profile/273">Profil ID</nuxt-link></li>
                </ul> -->
            </nav>
        </header>
    </div>

    <div class="container mx-auto p-4">
        <slot />
    </div>
    <footer class="container mx-auto p-4 flex justify-between border-t-2">

    </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref(new Date().toLocaleTimeString());
const updateClock = () => {
    time.value = new Date().toLocaleTimeString();
};
let intervalId;
onMounted(() => {
    intervalId = setInterval(updateClock, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>


<style scoped>
nav ul {
    display: flex;
    list-style-type: none;
}

li {
    margin-right: 10px;
}

a {
    list-style-type: none;
    text-decoration: none;
}

.router-link-exact-active {
    color: #12b488;
}
</style>