<template>
  <!-- <input
    :value="formattedValue"
    inputmode="numeric"
    @input="onInput($event)"
    @focus="onFocus($event)"
  > -->

  {{ finalOptions }}
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import defaultOptions, { type VueNumberFormatOptions } from '../types/FormatOptions'
import { format } from "../utils"

interface Props {
  value: string | number | null,
  options?: Partial<VueNumberFormatOptions>
}

const props = defineProps<Props>();

const globalOptions = inject('VueNumberFormatOptions') as VueNumberFormatOptions;

const mergedOptions = computed(() => Object.assign(globalOptions, props.options))
const formattedValue = computed(() => format(props.value, mergedOptions.value))
</script>