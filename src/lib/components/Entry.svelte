<script lang="ts">
	export let onEntry: (a: number) => void;
	export let options: number[];
	let selected = 0;

	type Option = { value: number; name: string };

	let temp: Option[] = [
		{ value: -1, name: 'X' },
		{ value: 0, name: '0' }
	];
	let myOptions: Option[] = [
		...temp,
		...Array.from(options, (val) => ({ value: val, name: val.toString() }))
	];
</script>

<select
	class="{selected < 0
		? 'bg-red-200'
		: selected == 0
			? 'bg-slate-200'
			: 'bg-green-200'} w-16 text-center [text-align-last:center]"
	bind:value={selected}
	on:change={() => {
		if (selected == -1) onEntry(0);
		else {
			onEntry(selected);
		}
	}}
>
	{#each myOptions as option}
		<option class="text-center bg-blue" value={option.value}>{option.name}</option>
	{/each}
</select>
