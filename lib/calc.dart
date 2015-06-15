library loggen;

RegExp newline = new RegExp(r"\n");

class Exer {
    String name;
    List<String> data = [];
    int tonnage;

    Exer(String name) {
        this.name = name;
        this.tonnage = 0;
    }

    void addData(String input) {
        this.data.add(input);
        List<int> v = _extractIntegers(input);
        this.tonnage = this.tonnage + _calcTonnage(v);
    }

    int _calcTonnage(List<int> v) {
        int t = 1;
        for (int i = 0; i < v.length; i++) {
            t = t * v[i];
        }
        return t;
    }

    List<int> _extractIntegers(String s) {
        List<int> v = new List(3);
        List<String> t = splitOnWhitespace(s);
        for (int i = 0; i < t.length; i++) {
            RegExp repsIdent = new RegExp(r"x");
            RegExp weightIdent = new RegExp(r"@");
            if (repsIdent.hasMatch(t[i])) {
                List<String> s = t[i].split(repsIdent);
                v[0] = int.parse(s[0]);
                v[1] = int.parse(s[1]);
            } else if (weightIdent.hasMatch(t[i])) {
                List<String> s = t[i].split(weightIdent);
                v[2] = int.parse(s[1]);
            }
        }
        return v;
    }

}

class Loggen {
    List<Exer> exerList = [];

    Loggen(String input) {
        List<String> parsed;
        parsed = input.split(newline);
        for (int i = 0; i < parsed.length; i++) {
            if (isExerciseData(parsed[i])) {
                var e = new Exer(parsed[i]);
                int j = i + 1;
                while (j < parsed.length && isSetData(parsed[j])) {
                    e.addData(parsed[j]);
                    j++;
                }
                this.exerList.add(e);
            }
        }
    }

    String Log() {
        String output = "";
        String tab = "\t";
        String newline = "\n";
        // Print exercise plan
        for (int i = 0; i < this.exerList.length; i++) {
            output = output + this.exerList[i].name + newline;
            for (int j = 0; j < this.exerList[i].data.length; j++) {
                output = output + tab + this.exerList[i].data[j] + newline;
            }
        }
        // Print tonnage
        output = output + newline + "Tonnage:" + newline;
        int total = 0;
        for (int i = 0; i < this.exerList.length; i++) {
            total = total + this.exerList[i].tonnage;
            var t = splitOnWhitespace(this.exerList[i].name);
            for (int j = 1; j < t.length; j++) {
                output = output + t[j];
                if (j < t.length-1) {
                    output = output + " ";
                }
            }
            output = output + ": " + this.exerList[i].tonnage.toString() + newline;
        }
        output = output + "Total: " + total.toString();
        return output;
    }
}

bool isExerciseData(String s) {
    RegExp ExerciseData = new RegExp(r"^[A-Z0-9]+\.\s[A-Za-z\s]+$");
    return ExerciseData.hasMatch(s);
}

bool isSetData(String s) {
	RegExp SetData = new RegExp(r"^([ivx]+\.\s)?[0-9]+x[0-9]+\s@[0-9]+$");
    return SetData.hasMatch(s);
}

List<String> splitOnWhitespace(String s) {
    RegExp SplitSetDataRegExp = new RegExp(r"\s");
    return s.split(SplitSetDataRegExp);
}
