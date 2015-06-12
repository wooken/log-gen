import 'dart:html';
import 'package:polymer/polymer.dart';
import 'package:loggen/calc.dart';

ButtonElement genButton;

void main() {
    genButton = querySelector('#generateButton');
    genButton.onClick.listen(displayResults);
}

void displayResults(Event e) {
    //var value = querySelector('#input').value;
    var input = querySelector('#input') as TextAreaElement;
    print(input.value);
    querySelector('#results').text = input.value;
}
