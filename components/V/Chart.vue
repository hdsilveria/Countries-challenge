<template>
    <div>
        <BarChart :chartData="data" />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

const props = defineProps({
    labels: {
        type: Array as PropType<Array<string>>,
        required: true,
    },

    datasets: {
        type: Object,
        required: true
    }
})

const data: any = computed(() => { 
    return {
        labels: props.labels, 
        datasets: props.datasets
    } 
})


onMounted(async () => {
    if (process.client) {
        await Chart.register(...registerables)
    }
})

</script>