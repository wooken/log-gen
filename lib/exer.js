'use strict';

const Exer = function (name) {
  this.name = name;
  this.data = [];
  this.tonnage = 0;

  function calcTonnage(volumeArray) {
    let tonnage = 1;
    volumeArray.forEach(function (value) {
      tonnage = tonnage * value;
    });
    return tonnage;
  }

  function extractIntegers(volumeString) {
    const volumeArray = volumeString.split(/\s/);
    let validVolumeData = '';
    volumeArray.forEach(function (volume) {
      if (volume.match(/x/) || volume.match(/@/)) {
        validVolumeData = volume + validVolumeData;
      }
    });
    const validDataArray = validVolumeData.split(/@/);
    const volumeIntArray = [0, 0, 0];
    validDataArray.forEach(function (data) {
      if (data.match(/^[0-9]+x[0-9]+$/)) {
        const setRepArray = data.split(/x/);
        volumeIntArray[0] = parseInt(setRepArray[0], 10);
        volumeIntArray[1] = parseInt(setRepArray[1], 10);
      } else if (data.match(/^[0-9]+$/)) {
        volumeIntArray[2] = parseInt(data, 10);
      }
    });
    return volumeIntArray;
  }

  this.addData = function (input) {
    const inputStrippedWhitespace = input.replace(/\s+/g, '');
    this.data.push(inputStrippedWhitespace);
    const volumeIntArray = extractIntegers(inputStrippedWhitespace);
    this.tonnage = this.tonnage + calcTonnage(volumeIntArray);
  };
};

module.exports = Exer;
