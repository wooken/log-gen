library loggen;

bool isSetData(String s) {
	RegExp SetData = new RegExp(r"^([ivx]+\.\s)?[0-9]+x[0-9]+\s@[0-9]+$");
    return SetData.hasMatch(s);
}
