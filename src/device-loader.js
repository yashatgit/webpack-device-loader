/**
 * USECASE:
 * If you need to build separate components for different mobile types, create a base file named <filename>.device.js
 * and create it's device specific files e.g. <filename>.mobile.js OR <filename>.web.js
 *
 *
 * HOW does this work?
 * This loader runs on all the file of the type "*.device.js"
 * and replaces it's content with the subsequent device specific files (foo.mobile.js ; foo.web.js; foo.tv.js)
 *
 * The device type is obtained in following ways:
 * DEV MODE : via external args
 * PROD MODE: bundles different files for all device types
 *
 */

const fs = require('fs');
const loaderUtils = require('loader-utils');

const DEFAULT_DEVICE = 'mobile';


/*
 * checks if .device.<deviceType>.js exists or not.
 * If doesn't, loads the .device.js file
 * */

const getDeviceBasedFilePath = (defaultFilePath, deviceType) => {
  const deviceTypeFileSuffix = `.${deviceType}.js`;
  const deviceFileName = defaultFilePath.replace('.device.js', deviceTypeFileSuffix);

  if (fs.existsSync(deviceFileName)) {
    return deviceFileName;
  }
  return defaultFilePath;
};

module.exports = function (source) {
  const options = loaderUtils.getOptions(this) || {};
  const deviceType = options.device || DEFAULT_DEVICE;

  const callback = this.async();
  const defaultFilePath = this.resourcePath;

  const deviceBasedFilePath = getDeviceBasedFilePath(defaultFilePath, deviceType);
  this.addDependency(deviceBasedFilePath);

  fs.readFile(deviceBasedFilePath, 'utf-8', (err, header) => {
    if (err) {
      return callback(err);
    }
    callback(null, header);
  });
};