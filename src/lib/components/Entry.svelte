<script lang="ts">
	export let onEntry: (a: number) => void;
	export let options: number[];
	let selected = 0;

	const isTopScore = options.length == 5;

	type Option = { value: number; name: string };

	let temp: Option[] = [
		{ value: -1, name: 'X' },
		{ value: 0, name: '0' }
	];
	let myOptions: Option[] = [
		...temp,
		...Array.from(options, (val) => ({ value: val, name: val.toString() }))
	];

	$: backgrounColor = () => {
		let styling = "w-16 text-center [text-align-last:center] ";
		if(selected < 0) styling += "bg-red-200";
		else if(selected == 0) styling += "bg-slate-200";
		else if(selected > 0 && !isTopScore) styling += "bg-green-200";
		else if(selected > 0 && isTopScore) {
			// calculate position in options array
			const index = options.indexOf(selected) + 1;
			if(index == 1) styling += "bg-yellow-400";
			if(index == 2) styling += "bg-yellow-300";
			if(index == 3) styling += "bg-green-200";
			if(index == 4) styling += "bg-green-400";
			if(index == 5) styling += "bg-green-600";
		} 
		return styling;
	}
</script>

<select
	class={backgrounColor()}
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
