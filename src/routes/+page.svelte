<script lang="ts">
	import { goto } from '$app/navigation';
	import Entry from '$lib/components/Entry.svelte';
	import type { Player } from '$lib/player';
	import {
		ones,
		twos,
		threes,
		fours,
		fives,
		sixes,
		yahtzee,
		bonus,
		threeOfAKind,
		fourOfAKind,
		fullHouse,
		smallStraight,
		largeStraight,
		chance
	} from '$lib/scores';
	import { players } from '$lib/stores/players';
	import { buttonDelay } from '$lib/utils';

	let rerender = 0;

	let endGameClick = false;
	function endGame() {
		endGameClick = true;
		let copy: Player[] = [];
		$players.forEach((player) => copy.push(player));
		copy.sort((a, b) => b.getScore() - a.getScore());
		copy[0].wins += 1;
		$players.forEach((player) => player.resetScores());
		setTimeout(() => (endGameClick = false), buttonDelay);
		rerender += 1;
	}

	let updatePlayersClick = false;
	function updatePlayers() {
		updatePlayersClick = true;
		goto('{base}/config');
		setTimeout(() => (updatePlayersClick = false), buttonDelay);
		rerender += 1;
	}

	let resetClick = false;
	function reset() {
		resetClick = true;
		if (confirm('Reset all statistics?')) {
			$players.forEach((player) => player.resetAll());
			rerender += 1;
		}
		setTimeout(() => (resetClick = false), buttonDelay);
	}
</script>

<h1 class="text-center font-bold italic underline h-8">YAHTZEE</h1>

{#key rerender}
	<div>
		<table>
			<thead>
				<td class="sticky left-0 bg-white"></td>
				{#each $players as player}
					<td class="text-center">{player.name}</td>
				{/each}
			</thead>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">1</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.ones = value;
							}}
							options={ones}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">2</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.twos = value;
							}}
							options={twos}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">3</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.threes = value;
							}}
							options={threes}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">4</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.fours = value;
							}}
							options={fours}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">5</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.fives = value;
							}}
							options={fives}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">6</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.sixes = value;
							}}
							options={sixes}
						/>
					</td>
				{/each}
			</tr>
			<tr class="text-center border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Subtotal:</th>
				{#each $players as player}
					<td class="text-center">
						{player.topScore()}
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Bonus</th>
				{#each $players as player}
					<td class="text-center">
						{#if player.topScore() >= 63}
							{bonus}
						{:else}
							0
						{/if}
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">3 of a kind</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.threeOfAKind = value;
							}}
							options={threeOfAKind}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">4 of a kind</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.fourOfAKind = value;
							}}
							options={fourOfAKind}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Full House</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.fullHouse = value;
							}}
							options={fullHouse}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Small Straight</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.smallStraight = value;
							}}
							options={smallStraight}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Large Straight</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.largeStraight = value;
							}}
							options={largeStraight}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Yahtzee!</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								if (value > player.yahtzee) player.yahtzeeCount += 1;
								else {
									player.yahtzeeCount -= 1;
								}
								player.yahtzee = value;
							}}
							options={yahtzee}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Chance</th>
				{#each $players as player}
					<td>
						<Entry
							onEntry={(value) => {
								player.chance = value;
							}}
							options={chance}
						/>
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Total</th>
				{#each $players as player}
					<td class="text-center">
						{player.getScore()}
					</td>
				{/each}
			</tr>
			<tr>
				<th class="sticky border border-black left-0 bg-slate-400 text-center">Statistics:</th></tr
			>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Wins</th>
				{#each $players as player}
					<td class="text-center">
						{player.wins}
					</td>
				{/each}
			</tr>
			<tr class="border border-black">
				<th class="sticky border border-black left-0 bg-slate-400">Yahtzees</th>
				{#each $players as player}
					<td class="text-center">
						{player.yahtzeeCount}
					</td>
				{/each}
			</tr>
		</table>
		<div class="w-1/12"></div>
	</div>

	<div class="m-5">
		<div class="m-2">
			<button
				class="w-full font-semibold text-white touch-auto py-1 px-1 border rounded {endGameClick
					? 'bg:slate-600'
					: 'bg-slate-400'}"
				on:click={endGame}>End Game</button
			>
		</div>
		<div class="m-2">
			<button
				class="w-full font-semibold text-white touch-auto py-1 px-1 border rounded {updatePlayersClick
					? 'bg:slate-600'
					: 'bg-slate-400'}"
				on:click={updatePlayers}>Update Players</button
			>
		</div>
		<div class="m-2">
			<button
				class="w-full font-semibold text-white touch-auto py-1 px-1 border rounded {resetClick
					? 'bg:slate-600'
					: 'bg-slate-400'}"
				on:click={reset}>Reset</button
			>
		</div>
	</div>
{/key}
