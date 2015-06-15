import 'package:test/test.dart';
import '../lib/calc.dart';

main() {
    group("[Exer]" , () {
        test("Print()", () {
            var L = new Loggen("A. Push Press\n5x5 @95\n3x3 @125\nB. Squat\n5x5 @95\n3x3 @125");
            var log = L.Log();
            print(log);
        });
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
    });

    group("splitSetData()", () {
    });
}
