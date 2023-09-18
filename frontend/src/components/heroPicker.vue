<template>
	<div class="relative ">
		<span
			class="
				block
				w-40
				px-4
				py-2
				text-sm
				font-medium
				text-white
				bg-indigo-600
				rounded-lg
				hover:bg-indigo-700
				focus:outline-none
				focus-visible:ring
				focus-visible:ring-indigo-500
				focus-visible:ring-opacity-75
			"
			v-on:click="toggleMenu"
			
		>
			<span v-if="!value">Select a Hero</span>
			<span v-else v-text="`Selected: ${value?.name}`"></span>
		</span>
		<ul
			v-show="isOpen"
			class="
				absolute
				right-0
				z-10
				w-32
				mt-2
				origin-top-right
				bg-slate-800
				border border-slate-500
				rounded-md
				shadow-lg
			"
		>
			<li v-for="option in options" v-bind:key="option.name" class="py-1">
				<a
					href="#"
					class="
						flex
						items-center
						px-4
						py-2
						text-sm text-slate-400
						hover:bg-slate-700
						gap-2
					"
					v-on:click="setOption(option), toggleMenu()"
					
				>
					<img
						v-bind:src="option.avatar"
						alt="avatar"
						class="w-6 aspect-square rounded"
					>
					<span v-text="option.name"></span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {PropType} from 'vue';
import type {Hero} from '../types';
const props = defineProps({
	value: Object as PropType<Hero | null>,
	options: Array as PropType<Hero[]>,
});

const emit = defineEmits(['selected']);
const isOpen = ref(false);
const selectedItem = ref(0);

function toggleMenu() {
	isOpen.value = !isOpen.value;

	if (isOpen.value === true){
	selectedItem.value = 0;
	setTimeout(function() { //A bit hacky, but makes sure this code executes *after* the menu opens so that it's able to select the first item at that point
        (document.getElementsByTagName('li')[selectedItem.value].firstChild).focus();
      }, 0);
	}
}

function setOption(input) {
	emit('selected', input);
}


document.addEventListener('keydown', function(event) {
		

		if (event.key === " ") {
			toggleMenu();
		}
		
		if (isOpen.value === true){
			
			if(event.key === "ArrowDown"){		
				console.log(selectedItem.value)
				if (selectedItem.value >= props.options.length - 1){
					selectedItem.value = 0;
				}
				else {
					selectedItem.value++;
				}
				(document.getElementsByTagName('li')[selectedItem.value].firstChild).focus()
			}
			else if(event.key === "ArrowUp"){
				
				console.log(selectedItem.value)
				if (selectedItem.value <= 0){
					selectedItem.value = 2;
				}
				else {
					
					selectedItem.value--;
				}
				(document.getElementsByTagName('li')[selectedItem.value].firstChild).focus()
			}
		}
	})
</script>
