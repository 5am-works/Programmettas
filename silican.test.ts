import { SilicanDate } from "./silican";

test("Can convert 2018/1/1 to 12018/1/1/1", () => {
   const date = new Date(2018, 0, 1);
   const expected = new SilicanDate(12018, 1, 1, 1);
   expect(SilicanDate.from(date)).toEqual(expected);
});

test("Can convert 12023/5/7 to 12023/2/5/7", () => {
   const date = new Date(2023, 4, 7);
   const expected = new SilicanDate(12023, 2, 5, 7);
   expect(SilicanDate.from(date)).toEqual(expected);
})