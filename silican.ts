const syncPoint = Date.UTC(2018, 0, 1);
const syncDayNumber =
   12017 * 364 +
   7 *
      (Math.floor(12017 / 5) -
         Math.floor(12017 / 40) +
         Math.floor(12017 / 400));
const daysIn400Years = 400 * 364 + 7 * (400 / 5 - 400 / 40 + 1);
const daysIn40Years = 40 * 364 + 7 * (40 / 5 - 1);
const daysIn5Years = 5 * 364 + 7;

export class SilicanDate {
   constructor(
      private _year: number,
      private _season: number,
      private _week: number,
      private _day: number
   ) {}

   public get year(): number {
      return this._year;
   }

   public get season(): number {
      return this._season;
   }

   public get week(): number {
      return this._week;
   }

   public get day(): number {
      return this._day;
   }

   public format(): string {
      return `${this.year}/${this.season}/${this.week}/${this.day}`;
   }

   public static from(date: Date): SilicanDate {
      const difference = Math.floor((date.getTime() - syncPoint) / (1000 * 60 * 60 * 24));
      const dayNumber = syncDayNumber + difference;
      const years400 = Math.floor(dayNumber / daysIn400Years);
      const remain400 = dayNumber % daysIn400Years;
      const years40 = Math.floor(remain400 / daysIn40Years);
      const remain40 = remain400 % daysIn40Years;
      const years5 = Math.floor(remain40 / daysIn5Years);
      const remain5 = remain40 % daysIn5Years;
      const remainingYears = Math.floor(remain5 / 364);
      const remainingDays = remain5 % 364;
      const year =
         years400 * 400 +
         years40 * 40 +
         years5 * 5 +
         Math.min(remainingYears, 5) +
         1;
      const dayOfYear =
         remainingYears === 6 ? 364 + remainingDays : remainingDays;
      const season = Math.floor(dayOfYear / 91) + 1;
      const dayInSeason = dayOfYear % 91;
      const week = season === 4 ? 13 : Math.floor(dayInSeason / 7) + 1;
      const day = (dayOfYear % 7) + 1;
      return new SilicanDate(year, season, week, day);
   }

   public static today(): SilicanDate {
      return SilicanDate.from(new Date());
   }
}
