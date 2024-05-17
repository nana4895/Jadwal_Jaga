// import Swal from "sweetalert2";
// // import "@sweetalert2/theme-bootstrap-4";
// const options = {
//     reverseButtons: true,
//     confirmButtonText: "confirmText",
//     cancelButtonText: "cancelText",
//     confirmButtonColor: "#84bd00",
// }
// const $swal = {
//     install: (Vue, options) => {
//         Vue.provide("$swal", Swal.mixin(options));
//     },
// }
// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use($swal, options);
// });
// import Swal from "sweetalert2";
// // import "@sweetalert2/theme-bootstrap-4";
// const $swal = {
//     install: (Vue, options) => {
//         Vue.config.globalProperties.$swal = Swal.mixin(options);
//     },
// }
// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use($swal, {
//         reverseButtons: true,
//         confirmButtonText: "confirmText",
//         cancelButtonText: "cancelText",
//         confirmButtonColor: "#84bd00",
//     });
// });
// import Swal from 'sweetalert2'

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.provide('swal', Swal)
// })
import Swal from 'sweetalert2'
import type { SweetAlertOptions } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

// Default options
const options: SweetAlertOptions = {}

const $swal = {
    install: (Vue: any, options: SweetAlertOptions) => {
        Vue.provide('$swal', Swal.mixin(options))
    }
}
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use($swal, options)
})
