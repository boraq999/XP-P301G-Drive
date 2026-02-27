const usb = require('usb');

try {
    console.log('--- USB Library Debug ---');
    // في الإصدارات الجديدة، الـ usb قد يكون موجوداً داخل .usb
    const usbInstance = usb.usb ? usb.usb : usb;

    console.log('Attempting to find printer with VID: 1155, PID: 22339');

    const device = usbInstance.findByIds(1155, 22339);

    if (!device) {
        console.log('Printer not found. Check physical connection.');
    } else {
        console.log('Printer found successfully!');
        console.log('Device info:', device.deviceDescriptor);

        // محاولة فتح الجهاز
        device.open();
        console.log('Device opened successfully!');
        device.close();
    }
} catch (err) {
    console.error('Error during USB access:', err.message);
    console.log('\n--- IMPORTANT FOR WINDOWS ---');
    console.log('If you see "Access Denied" or "Interface Busy", it means Windows Driver is blocking Node.js.');
    console.log('In this case, we MUST use the "Printer Sharing" method instead.');
}
