<script setup lang="ts">
import {ref} from 'vue';

import heroPicker from './components/heroPicker.vue';
import type {Hero} from './types';

import AchillesAvatar from '../public/heros/achilles.png';
import OdysseusAvatar from '../public/heros/odysseus.png';
import HerculesAvatar from '../public/heros/hercules.png';

const heros = ref<Hero[]>([
	{
		name: 'Achilles',
		avatar: AchillesAvatar,
		speed: 10,
		strength: 4,
		intelligence: 6,
	},
	{
		name: 'Odysseus',
		avatar: OdysseusAvatar,
		speed: 6,
		strength: 5,
		intelligence: 9,
	},
	{
		name: 'Hercules',
		avatar: HerculesAvatar,
		speed: 6,
		strength: 10,
		intelligence: 4,
	},
]);
const hero = ref<Hero | null>(null);

let bonus = ref(0);
function doBonus() {
	if(bonus.value >= 5) {
		return alert('Only 5 bonus allowed!');
	}
	bonus.value++; // increase bonus!
	applyBonus();
}

function handleUpdate(input) {
	console.log('change', input);
	hero.value = input;
}

function applyBonus(){ //Generates a random number as it maps through the array of characters, applying bonus for each based on the currently generated num
	heros.value.map(x => {
		// console.log(x);
		const diceBlock = Math.floor(Math.random() * 3);
		// console.log(diceBlock); 

		switch(diceBlock) {
			case 0: x.speed++;
			break;
			case 1: x.strength++;
			break;
			case 2: x.intelligence++;
			break;
		}
	})
}
</script>



<template>
	<div
		class="
			bg-slate-800
			rounded
			max-w-sm
			grow
			w-full
			text-white
			flex flex-col
			gap-4
			p-4
		"
	>
		<h1>Hero Stats:</h1>
		<div class="flex gap-4">
			<heroPicker
				class="grow"
				v-bind:value="hero"
				v-bind:options="heros"
				v-on:selected="handleUpdate"
			></heroPicker>
			<button
				class="
					border-green-500
					text-sm text-green-400
					border
					p-4
					px-4
					py-2
					rounded
				"
				v-on:click="doBonus"
			>
				BONUS {{ bonus > 0 ? `(${bonus})` : '' }} ✨
			</button>
		</div>
		<div v-if="hero" class="bg-slate-400 text-black rounded flex gap-2">
			<img v-bind:src="hero.avatar" class="w-52 rounded object-cover h-48 w-48">
			<div>
				<h2 class="uppercase text-xs mb-4">
					Hero Summary
				</h2>
				<p>
					<span v-text="hero.name"></span>
				</p>
				<dl>
					<dt class="uppercse text-sm">
						Speed:
					</dt>
					<dd v-text="hero.speed"></dd>
					<dt class="uppercse text-sm">
						Strength:
					</dt>
					<dd v-text="hero.strength"></dd>
					<dt class="uppercse text-sm">
						Intelligence:
					</dt>
					<dd v-text="hero.intelligence"></dd>
				</dl>
			</div>
		</div>
	</div>
</template>
