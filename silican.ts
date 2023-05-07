export class SilicanDate {
	public static readonly SyncPoint = Date.UTC(2018, 0, 1, 0, 0, 0, 0);
	public static readonly MonthNames = [null, "Alandia", "Chloeon", "Espria", "Fayerion",
		"Glacia", "Helion", "Lunaria", "Miralion", "Peridia", "Serenion", "Timia", "Veradion",
		"Zerona"];

	public constructor(
		public readonly year: number,
		public readonly month: number,
		public readonly date: number,
		public readonly degree: number,
		public readonly minute: number,
		public readonly second: number
	) {}

	get monthName(): string {
		return SilicanDate.MonthNames[this.month];
	}

	public static fromGregorian(original: Date): SilicanDate {
		let utcts = Date.UTC(original.getUTCFullYear(), original.getUTCMonth(), original.getUTCDate(), 0, 0, 0, 0);
		let daysDifference = (utcts - SilicanDate.SyncPoint) / (24 * 60 * 60 * 1000);
		let year: number = null;
		let dayInYear: number = null;
		let month: number = null;
		let date: number = null;
		if (daysDifference >= 0) {
			year = 12018;
			while (daysDifference > 364) {
				year += 1;
				if (SilicanDate.isLeapLear(year)) {
					daysDifference -= 371
				} else {
					daysDifference -= 364;
				}
			}
			dayInYear = daysDifference;
		} else {
			year = 12017;
			while (daysDifference < -364) {
				year -= 1;
				if (SilicanDate.isLeapLear(year)) {
					daysDifference += 371;
				} else {
					daysDifference += 364;
				}
			}
			dayInYear = daysDifference + 364;
		}
		month = Math.floor(dayInYear / 28) + 1;
		date = dayInYear % 28 + 1;

		if (month === 14) {
			month = 13;
			date += 28;
		}

		// Time
		let degrees = (original.getUTCMinutes() + original.getUTCHours() * 60 +
			original.getUTCSeconds() / 60 + original.getUTCMilliseconds() / 60000) / 4;
		let degree = Math.floor(degrees);
		let minutes = (degrees - degree) * 60;
		let minute = Math.floor(minutes);
		let seconds = (minutes - minute) * 60;
		return new SilicanDate(year, month, date, degree, minute, seconds);
	}

	public static isLeapLear(year: number): boolean {
		return year % 5 === 0 && (year % 400 === 0 || year % 40 !== 0);
	}
}