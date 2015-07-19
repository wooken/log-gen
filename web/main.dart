import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:loggen/calc.dart';

ButtonElement genButton;

void main() {
    genButton = querySelector('#generateButton');
    genButton.onClick.listen(displayResults);
}

void displayResults(Event e) {
    var input = querySelector('#input') as TextAreaElement;
    print(input.value);
    var L = new Loggen(input.value);
    var log = L.Log();
    querySelector('#results').text = log;
}
