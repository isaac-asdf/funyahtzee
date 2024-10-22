import { writable } from 'svelte/store';
import { fromLocalStorage } from '$lib/utils';
import { Player } from '$lib/player';

const defaultPlayers: Player[] = [new Player('Player 1'), new Player('Player 2')];

const playerString = fromLocalStorage('players', JSON.stringify(defaultPlayers)) as string;

const playerObj: Player[] = JSON.parse(playerString);
const playerArr = playerObj.map((n) => {
	const p = new Player(n.name);
	p.wins = n.wins;
	p.yahtzeeCount = n.yahtzeeCount;
	return p;
});

export const players = writable<Player[]>(playerArr);
