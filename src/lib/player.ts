export class Player {
	name: string;
	wins = 0;
	yahtzeeCount = 0;
	ones = 0;
	twos = 0;
	threes = 0;
	fours = 0;
	fives = 0;
	sixes = 0;
	subtotal = 0;
	bonus = 0;
	threeOfAKind = 0;
	fourOfAKind = 0;
	fullHouse = 0;
	smallStraight = 0;
	largeStraight = 0;
	yahtzee = 0;
	chance = 0;
	total = 0;

	constructor(playerName: string) {
		this.name = playerName;
	}

	topScore(): number {
		const topScore = this.ones + this.twos + this.threes + this.fours + this.fives + this.sixes;
		return topScore;
	}

	getScore(): number {
		const topScore = this.topScore();
		if (topScore >= 63) this.bonus = 35;
		else this.bonus = 0;

		return (
			topScore +
			this.bonus +
			this.threeOfAKind +
			this.fourOfAKind +
			this.fullHouse +
			this.smallStraight +
			this.largeStraight +
			this.yahtzee +
			this.chance
		);
	}

	resetAll(): void {
		this.resetScores();
		this.yahtzeeCount = 0;
		this.wins = 0;
	}

	resetScores(): void {
		this.ones = 0;
		this.twos = 0;
		this.threes = 0;
		this.fours = 0;
		this.fives = 0;
		this.sixes = 0;
		this.subtotal = 0;
		this.bonus = 0;
		this.threeOfAKind = 0;
		this.fourOfAKind = 0;
		this.fullHouse = 0;
		this.smallStraight = 0;
		this.largeStraight = 0;
		this.yahtzee = 0;
		this.chance = 0;
		this.total = 0;
	}
}
