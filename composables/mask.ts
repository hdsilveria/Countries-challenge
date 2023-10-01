import { reactive } from 'vue'

export const cpfMask = reactive({
    mask: "###.###.###-##",
    eager: true
})

export const cepMask = reactive({
    mask: "########",
    eager: true
})