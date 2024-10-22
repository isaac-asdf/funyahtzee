<script lang="ts">
	import { goto } from '$app/navigation';
	import { Player } from '$lib/player';
	import { players } from '$lib/stores/players';
	import { buttonDelay, toLocalStorage } from '$lib/utils';
	let newPlayerName = 'New Player';

	let removedPlayerClick = false;
	let rerender = 0;
	function removePlayer(name: string) {
		$players = $players.filter((player) => player.name != name);
	}

	function playerSortUp(player: Player) {
		const p = $players.indexOf(player);
		if (p <= 0) return;
		const start = $players.slice(0, p - 1);
		const pl = $players[p];
		const end = [$players[p - 1], ...$players.slice(p + 1)];
		$players = [...start, pl, ...end];
		rerender += 1;
	}

	function playerSortDown(player: Player) {
		const p = $players.indexOf(player);
		// sort down is the same as sorting up the player below
		if (p < $players.length) playerSortUp($players[p + 1]);
	}

	let newPlayerClick = false;
	function newPlayer() {
		newPlayerClick = true;
		if (newPlayerName != 'New Player') {
			$players.push(new Player(newPlayerName));
			console.log($players);
			newPlayerName = 'New Player';
			rerender += 1;
		}
		toLocalStorage('players', JSON.stringify($players));
		setTimeout(() => (newPlayerClick = false), buttonDelay);
	}
</script>

<h1 class="m-1 font-bold underline">Player configuration</h1>
{#key rerender}
	<div>
		{#each $players as player}
			<div class="m-2">
				<input bind:value={player.name} />
				<button
					on:click={() => playerSortUp(player)}
					class="p-3 text-xl bg-slate-400 rounded font-bold border border-black">&#8679;</button
				>
				<button
					on:click={() => playerSortDown(player)}
					class="p-3 text-xl bg-slate-400 rounded font-bold border border-black">&#8681;</button
				>
				<button
					on:click={() => removePlayer(player.name)}
					class="p-3 text-xl m-1 rounded font-bold text-center border border-black {removedPlayerClick
						? 'bg-red-400'
						: 'bg-red-200'}">-</button
				>
			</div>
		{/each}
	</div>
	<div class="m-2">
		<input class="text-slate-400 italics" bind:value={newPlayerName} />
		<button
			on:click={() => newPlayer()}
			class="p-3 text-xl rounded font-bold text-center border border-black {newPlayerClick
				? 'bg-slate-400'
				: 'bg-slate-200'}">+</button
		>
	</div>
	<div class="m-5">
		<button
			class="w-full font-semibold text-white touch-auto py-1 px-1 border rounded
					bg-slate-400"
			on:click={() => goto('/')}>Return home</button
		>
	</div>
{/key}
