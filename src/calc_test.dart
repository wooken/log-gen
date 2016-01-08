import 'package:test/test.dart';
import '../lib/calc.dart';

main() {
    group("[Exer]" , () {
        test("constructor() sets name", () {
            var e = new Exer("A. Push Press");
            expect(e.name, equals("A. Push Press"));
        });
        test("constructor() data/tonnage init", () {
            var e = new Exer("A. Push Press");
            expect(e.data.length, equals(0));
            expect(e.tonnage, equals(0));
        });
        test("addData() sets data/tonnage", () {
            var e = new Exer("A. Push Press");
            e.addData("5x5 @95");
            expect(e.data.length, equals(1));
            expect(e.tonnage, equals(2375));
        });
        test("addData() multiple sets data/tonnage", () {
            var e = new Exer("A. Push Press");
            e.addData("5x5 @95");
            e.addData("5x5 @95");
            e.addData("5x5 @95");
            expect(e.data.length, equals(3));
            expect(e.tonnage, equals(7125));
        });
        test("addData() ignores whitespace in data", () {
            var e = new Exer("A. Push Press");
            e.addData("5x5@95");
            expect(e.data.length, equals(1));
            expect(e.tonnage, equals(2375));
        });
    });

    group("[Loggen]", () {
        test("consructor() init 1 item", () {
            var L = new Loggen("A. Push Press\n5x5 @95");
            expect(L.exerList.length, equals(1));
        });
        test("consructor() init 1 item multiple sets", () {
            var L = new Loggen("A. Push Press\n5x5 @95\n5x5 @95");
            expect(L.exerList.length, equals(1));
            expect(L.exerList[0].data.length, equals(2));
        });
        test("constructor() init 2 items multiple sets", () {
            var L = new Loggen("A. Push Press\n5x5 @95\n5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185");
            expect(L.exerList.length, equals(2));
            expect(L.exerList[0].data.length, equals(2));
            expect(L.exerList[1].data.length, equals(3));
        });
        test("constructor() init extra newline whitespace", () {
            var L = new Loggen("A. Push Press\n\n\n5x5 @95\n\n5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185");
            expect(L.exerList.length, equals(2));
            expect(L.exerList[0].data.length, equals(2));
            expect(L.exerList[1].data.length, equals(3));
        });
        test("constructor() init extra space whitespace", () {
            var L = new Loggen("A. Push Press\n   5x5 @95   \n   5x5 @95\nB. Squat\n3x3 @135\n2x2 @155\n1x1 @185");
            expect(L.exerList.length, equals(2));
            expect(L.exerList[0].data.length, equals(2));
            expect(L.exerList[1].data.length, equals(3));
        });
        test("constructor() init variable whitespace", () {
            var L = new Loggen("A. Power Clean\n\n i. 1x5 @105 \n\n 6x3 @115 \n\n 1x5 @105 \n\n C. Squat\n\n i. 1x5 @175 \n\n 2x2 @195 \n\n 1x5 @195 \n\n 2x5 @175 \n\n 1x5 @195 \n\n 2x3 @175");
            expect(L.exerList.length, equals(2));
            expect(L.exerList[0].data.length, equals(3));
            expect(L.exerList[1].data.length, equals(6));
        });
    });

    group("isExerciseData()", () {
        test("accepts names", () {
            String name = "A. Push Press";
            expect(isExerciseData(name), true);
        });
        test("rejects data", () {
            String data = "4x5 @95";
            expect(isExerciseData(data), false);
        });
        test("accepts special characters", () {
            String name = "A. Push Press ([{-:!@#\$%^&*()+";
            expect(isExerciseData(name), true);
        });
    });

    group("isSetData()", () {
        test("rejects names", () {
            String name = "A. Push Press";
            expect(isSetData(name), false);
        });
        test("accepts data with roman numerals", () {
            String data = "i. 4x5 @95";
            expect(isSetData(data), true);
        });
        test("accepts data without roman numerals", () {
            String data = "4x5 @95";
            expect(isSetData(data), true);
        });
        test("ignores all whitespace (sanely)", () {
            String data = "4 x5@ 95";
            expect(isSetData(data), true);
        });
    });

    group("splitSetData()", () {
    });
}
