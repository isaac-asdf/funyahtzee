import { writable } from 'svelte/store';
import { fromLocalStorage } from '$lib/utils';
import { Player } from '$lib/player';

const defaultPlayers: Player[] = [new Player('Player 1'), new Player('Player 2')];

const playerString = fromLocalStorage('players', JSON.stringify(defaultPlayers)) as string;

const playerArr: Player[] = JSON.parse(playerString);

export const players = writable(playerArr);
