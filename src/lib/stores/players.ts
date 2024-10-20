import { writable } from 'svelte/store';
import { fromLocalStorage } from '$lib/utils';
import { Player } from '$lib/player';

const playerArr: Player[] = [new Player('Player 1'), new Player('Player 2')];

export const players = writable(playerArr);
