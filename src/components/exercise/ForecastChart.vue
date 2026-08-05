<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useConfigStore } from '@/stores/configStore'

const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
  timezone: {
    type: Number,
    required: true,
  },
})

const configStore = useConfigStore()

const pad = (n) => String(n).padStart(2, '0')

const series = computed(() => [
  {
    name: '기온',
    data: props.points.map((point) => configStore.toDisplayTemp(point.temp)),
  },
])

const options = computed(() => ({
  chart: {
    type: 'area',
    background: 'transparent',
    fontFamily: 'inherit',
    toolbar: { show: false },
    zoom: { enabled: false },
    parentHeightOffset: 0,
  },
  colors: ['#ffffff'],
  stroke: { curve: 'smooth', width: 3 },
  fill: {
    type: 'gradient',
    gradient: { opacityFrom: 0.32, opacityTo: 0, stops: [0, 100] },
  },
  dataLabels: {
    enabled: true,
    formatter: (value) => `${value}°`,
    offsetY: -8,
    style: { fontSize: '12px', fontWeight: 500, colors: ['rgba(255, 255, 255, 0.9)'] },
    background: { enabled: false },
    dropShadow: { enabled: false },
  },
  markers: { size: 0, strokeWidth: 0, hover: { size: 4 } },
  grid: { show: false, padding: { top: 16, left: 8, right: 8, bottom: 0 } },
  xaxis: {
    categories: props.points.map((point) => {
      const date = new Date((point.dt + props.timezone) * 1000)
      return `${pad(date.getUTCHours())}시`
    }),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' } },
    tooltip: { enabled: false },
  },
  yaxis: { show: false },
  tooltip: {
    theme: 'dark',
    y: { formatter: (value) => `${value}${configStore.unitSymbol}` },
  },
}))
</script>

<template>
  <VueApexCharts type="area" height="200" :series="series" :options="options" />
</template>
