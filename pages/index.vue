<template>
    <div>
        <div id="container">

            <v-btn to="/about">
                About
            </v-btn>
            <v-btn to="/profile/273">
                Profile With ID
            </v-btn>
            <v-btn to="/profile">
                Profile
            </v-btn>
            <!-- <v-btn @click="fetch(data)">
                Alert
            </v-btn> -->
            <v-btn to="/profile/dashboard">
                Carrousel
            </v-btn>
        </div>
    </div>
    <br><br>
    {{ time }} <br>
{{ dateTime }} <br>
{{ tahun }} - {{ bulan }} - {{ tanggal }} || {{ jam }} : {{ menit }} : {{ detik }}
    <br><br>
<!-- {{ jdwlDokters }} -->
    <v-row>
        <v-col v-for="(bebas, i) in tampungKSM.length" :key="i" cols="1" md="2">
            <v-card :color="color" :variant="variant" class="mx-auto">
                <v-card-item>
                    <div>
                        <div class="text-h6 mb-1">
                            {{ tampungKSM[i].idksm }} <br>
                            {{ tampungKSM[i].ket_ksm }}
                        </div>
                        <!-- <div class="text-h6 mb-1">
                            Headline
                        </div> -->
                        <!-- <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div><br> -->
                        <!-- {{ tampungKSM[i].jadwal.length }} -->
                        <br>
                        <v-list dense>
                            <v-list-item v-for="(item, index) in tampungKSM[i].jadwal" :key="index">
                                
                                <!-- <template v-if="new Date(item.Jaga_awal) <= new Date() && new Date(item.Jaga_akhir) >= new Date()"> -->
                                <template v-if="new Date(new Date(item.Jaga_awal)) <= new Date(a) && new Date(item.Jaga_akhir).setDate(new Date(item.Jaga_akhir).getDate() - 1) >= new Date()">
                                    <v-list-item-subtitle>Jaga hari inii</v-list-item-subtitle>
                                    <v-list-item-content>
                                    <v-list-item-title>{{ item.Nama_petugas }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.Level.Nama_level_igd }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ item.Jaga_awal }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ item.Jaga_akhir.replace(/T/g, ' ') }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ new Date(item.Jaga_awal).toLocaleString() }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ new Date(item.Jaga_akhir).toLocaleString().replace(/T/g, ' ') }}</v-list-item-subtitle>
                                </v-list-item-content>
                                </template>
                            <template v-else>
                                <v-list-item-subtitle>Jaga hari inii</v-list-item-subtitle>
                                    <v-list-item-content>
                                    <v-list-item-title>{{ item.Nama_petugas }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.Level.Nama_level_igd }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ item.Jaga_awal }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ item.Jaga_akhir.replace(/T/g, ' ') }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ new Date(item.Jaga_awal).toLocaleString() }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>{{ new Date(item.Jaga_akhir).toLocaleString().replace(/T/g, ' ') }}</v-list-item-subtitle>
                                </v-list-item-content>                            
                            </template>
                                
                            </v-list-item>
                        </v-list>
                        
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>


<script setup>
import Swal from 'sweetalert2'
// const _dataPPI = await useFetch(`https://satu.rssa.top/items/data_ppi`);
const _dataKSM = await $fetch(`https://satu.dev.rssa.id/items/daftar_ksm`);
const dataKSM = _dataKSM.data;
const _Users = await useFetch(`http://127.0.0.1:8000/api/getUsers`);
const data = _Users.data;
// const dataPPI = _dataPPI.data;
// const _jdwlDokter = await $fetch(`https://satu.dev.rssa.id/items/data_jadwal_jaga_dokter?fields=id,Nama_petugas,Ksm,Level.Nama_level_igd,Jaga_awal,Jaga_akhir`);
const _jdwlDokter = await $fetch(`https://satu.dev.rssa.id/items/data_jadwal_jaga_dokter?fields=id,Nama_petugas,Ksm,Level.Nama_level_igd,Jaga_awal,Jaga_akhir&filter[Jaga_awal][_between]=["2024-05-16", "2024-05-18"]`);
const jdwlDokters = _jdwlDokter.data;

let tampungKSM = [];
const ksm = _dataKSM.data
ksm.forEach(_ksm => {
    let idksm = _ksm['id'];

    let filterjdwl = jdwlDokters.filter(jadwal => jadwal['Ksm'] === idksm);
    if (filterjdwl && filterjdwl.length > 0) {
        let tampiljadwalBaru = {
            idksm: _ksm['id'],
            ket_ksm: _ksm['Nama_ksm'],
            jadwal: []
        };
        filterjdwl.forEach(jdwl => {
            tampiljadwalBaru.jadwal.push(jdwl);
        });
        tampungKSM.push(tampiljadwalBaru);
    };
});

const a = "2024-05-16T23:00:00"
// _____________________________________________________________
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref(new Date().toLocaleTimeString());
const updateClock = () => {
    time.value = new Date().toLocaleTimeString();
};
let intervalId;
onMounted(() => {
    intervalId = setInterval(updateClock, 1000);
});
// _________________________________________________________________
const dateTime = ref(new Date().toLocaleString());
const updateDateTime = () => {
    dateTime.value = new Date().toLocaleString();
};
let dateTimeIntervalId;
onMounted(() => {
    dateTimeIntervalId = setInterval(updateDateTime, 1000);
});
onUnmounted(() => {
    clearInterval(dateTimeIntervalId);
});


onUnmounted(() => {
    clearInterval(intervalId);
});
// ____________________________________________________________________
const tanggalSekarang = ref(new Date());
const tanggal = ref(tanggalSekarang.value.getDate());
const bulan = ref(tanggalSekarang.value.getMonth() + 1); // Bulan dimulai dari 0, jadi tambahkan 1
const tahun = ref(tanggalSekarang.value.getFullYear());
const jam = ref(tanggalSekarang.value.getHours());
const menit = ref(tanggalSekarang.value.getMinutes());
const detik = ref(tanggalSekarang.value.getSeconds());

const updateWaktu = () => {
    const sekarang = new Date();
    tanggal.value = (sekarang.getDate()<=9)?"0"+sekarang.getDate():sekarang.getDate();
    bulan.value = ((sekarang.getMonth() + 1)<=9)?"0"+(sekarang.getMonth() + 1):(sekarang.getMonth() + 1);
    tahun.value = sekarang.getFullYear();
    jam.value = (sekarang.getHours()<=9)?"0"+sekarang.getHours():sekarang.getHours();
    menit.value = (sekarang.getMinutes()<=9)?"0"+sekarang.getMinutes():sekarang.getMinutes();
    detik.value = (sekarang.getSeconds()<=9)?"0"+sekarang.getSeconds():sekarang.getSeconds();
};

let waktuIntervalId;
onMounted(() => {
    waktuIntervalId = setInterval(updateWaktu, 1000);
});

onUnmounted(() => {
    clearInterval(waktuIntervalId);
});



async function fetch(binding) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: binding,
        showConfirmButton: false,
        timer: 2000
    })
}
</script>

<style  scoped>
h1 {
    margin-bottom: 15px;
}

#container {
    padding: 10px;
}

p {
    margin: 20px 0px 20px 0px;
}
</style>
