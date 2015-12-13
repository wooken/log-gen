var Exer = function (name) {
  this.name = name;
  this.data = [];
  this.tonnage = 0;
  this.addData = function(string) {
    this.data.push(string);
    this.tonnage += 2375;
  }
};

module.exports = Exer;
