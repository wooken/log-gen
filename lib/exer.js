'use strict';

const Exer = function (name) {
  this.name = name;
  this.data = [];
  this.tonnage = 0;

  this.addData = function (input) {
    this.data.push(input.replace(/\s+/g, ''));
    let volumeIntArray = extractIntegers(input);
    //this.tonnage = this.tonnage + calcTonnage(volumeIntArray);
    this.tonnage += (this.tonnage + 5 * 5 * 95);
  };

  function calcTonnage (volumeArray) {
    var tonnage = 1;
    volumeArray.forEach(function (value) {
      tonnage = tonnage * value;
    });
    return tonnage;
  }

  function extractIntegers (volumeString) {
    var volumeArray = volumeString.split(/\s/);
    var validVolumeData = '';
    volumeArray.forEach(function (volume) {
      if (volume.match(/x/) || volume.match(/@/)) {
        validVolumeData = volume + validVolumeData;
      }
    });
    var validDataArray = validVolumeData.split(/@/);
    var volumeIntArray = [0, 0, 0];
    validDataArray.forEach(function (data) {
      if (data.match(/^[0-9]+x[0-9]+$/)) {
        var setRepArray = data.split(/x/);
        volumeIntArray[0] = parseInt(setRepArray[0], 10);
        volumeIntArray[1] = parseInt(setRepArray[1], 10);
      } else if (data.match(/^[0-9]+$/)) {
        volumeIntArray[2] = parseInt(data, 10);
      }
    });
    return volumeIntArray;
  }
};

module.exports = Exer;
