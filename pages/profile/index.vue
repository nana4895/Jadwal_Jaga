<template>
  <div>
    <h1>ini profile {{ id }}</h1>
  </div>
  <v-btn @click="fetch( data )">
    FetchAPI
  </v-btn>
  {{ data.pesan }}
  <h1>{{ data.pesan.messages }}</h1>
  <!-- {{ result }} -->
</template>

<script setup>
import Swal from 'sweetalert2'
import Axios from 'axios'

const result = await useFetch(`http://127.0.0.1:8000/api/getUsers`)
const data = result.data

async function fetch(binding) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: binding.pesan.messages + " iconnya: "+binding.pesan.icon,
    showConfirmButton: false,
    timer: 2000
  })
}

</script>

<style lang="scss" scoped></style>