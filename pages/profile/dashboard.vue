<template>
      
    <h2>Ini Halaman About Firman</h2>
    <v-btn to="/" id="btn"
      prepend-icon="mdi-home-circle-outline"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>

      Home

    </v-btn>
    <div>
        <v-carousel height="400" hide-delimiter-background show-arrows cycle :interval="2000">
            <template v-slot:prev="{ props }">
                <v-btn color="success" variant="elevated" @click="props.onClick">Previous slide</v-btn>
            </template>
            <template v-slot:next="{ props }">
                <v-btn color="info" variant="elevated" @click="props.onClick">Next slide</v-btn>
            </template>
            <v-carousel-item v-for="(ksmItem, i) in tampungKSM.length" :key="i">
                <v-sheet height="100%">
                    <div class=" fill-height justify-center align-center">
                        <div class="text-h2">
                            {{ tampungKSM[i].ket_ksm }}
                        </div><br>
                        <v-list dense>
                            <v-list-item v-for="(item, index) in tampungKSM[i].jadwal" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.Nama_petugas }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ item.Level.Nama_level_igd }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon
                                        @click="fetch('Jaga dari ' + item.Jaga_awal.replace(/T/g, ' ') + ' sampai ' + item.Jaga_akhir.replace(/T/g, ' '))">
                                        <v-icon>mdi-information</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2'
const _dataKSM = await $fetch(`https://satu.dev.rssa.id/items/daftar_ksm`);
const dataKSM = _dataKSM.data;


const _jdwlDokter = await $fetch(`https://satu.dev.rssa.id/items/data_jadwal_jaga_dokter?fields=id,Nama_petugas,Ksm,Level.Nama_level_igd,Jaga_awal,Jaga_akhir`);
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

<style lang="scss" scoped></style>