import 'package:test/test.dart';
import '../lib/calc.dart';

main() {  
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
}  
