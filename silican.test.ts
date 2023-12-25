import { SilicanDate } from "./silican";

test("Can convert 2018/1/1 to 12018/1/1/1", () => {
   const date = new Date(2018, 0, 1);
   const expected = new SilicanDate(12018, 1, 1, 1);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 2023/5/7 to 12023/2/5/7", () => {
   const date = new Date(2023, 4, 7);
   const expected = new SilicanDate(12023, 2, 5, 7);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 2023/12/24 to 12023/4/12/7", () => {
   const date = new Date(2023, 11, 24);
   const expected = new SilicanDate(12023, 4, 12, 7);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 2000/12/31 to 12000/4/13/7", () => {
   const date = new Date(2000, 11, 31);
   const expected = new SilicanDate(12000, 4, 14, 7);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 2001/1/1 to 12001/1/1/1", () => {
   const date = new Date(2001, 0, 1);
   const expected = new SilicanDate(12001, 1, 1, 1);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 1996/8/12 to 11996/3/7/1", () => {
   const date = new Date(1996, 7, 12);
   const expected = new SilicanDate(11996, 3, 7, 1);
   expect(SilicanDate.from(date)).toEqual(expected);
});