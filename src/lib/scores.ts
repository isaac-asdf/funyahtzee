export const ones = Array.from(Array(5), (_, i) => (i + 1) * 1);
export const twos = Array.from(Array(5), (_, i) => (i + 1) * 2);
export const threes = Array.from(Array(5), (_, i) => (i + 1) * 3);
export const fours = Array.from(Array(5), (_, i) => (i + 1) * 4);
export const fives = Array.from(Array(5), (_, i) => (i + 1) * 5);
export const sixes = Array.from(Array(5), (_, i) => (i + 1) * 6);
export const threeOfAKind = Array.from(Array(31), (_, i) => i + 5);
export const fourOfAKind = Array.from(Array(31), (_, i) => i + 5);
export const fullHouse = [25];
export const smallStraight = [30];
export const largeStraight = [40];
export const yahtzee = Array.from(Array(5), (_, i) => {
	if (i == 0) return 50;
	else {
		return i * 100 + 50;
	}
});
export const chance = Array.from(Array(25), (_, i) => i + 5);
export const bonus = 35;
