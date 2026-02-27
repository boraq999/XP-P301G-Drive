const escpos = require('escpos');
escpos.USB = require('escpos-usb');

console.log('Searching for USB printers...');

try {
    const devices = escpos.USB.findPrinter();

    if (devices.length === 0) {
        console.log('No USB printers found. Please check connection and drivers.');
    } else {
        console.log('Found printers:', devices.length);
        devices.forEach((device, index) => {
            console.log(`Device ${index}: VID=${device.deviceDescriptor.idVendor} PID=${device.deviceDescriptor.idProduct}`);
        });
        console.log('\nUse these IDs in your script.');
    }
} catch (error) {
    console.error('Error finding printers:', error.message);
}
