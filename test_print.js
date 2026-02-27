const escpos = require('escpos');
escpos.USB = require('escpos-usb');

// استخدام الـ IDs التي وجدتها
const device = new escpos.USB(1155, 22339);
const printer = new escpos.printer(device);

device.open(function (error) {
    if (error) {
        console.error('Connection Error:', error);
        return;
    }

    printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .text('TEST RECEIPT')
        .text('--------------------------------')
        .align('lt')
        .text('Item 1 ................. $10.00')
        .text('Item 2 ................. $20.00')
        .text('Item 3 ................. $30.00')
        .text('Item 4 ................. $40.00')
        .text('Item 5 ................. $50.00')
        .text('Item 6 ................. $60.00')
        .text('--------------------------------')
        .align('ct')
        .size(2, 2)
        .text('TOTAL: $210.00')
        .feed(5) // تغذية الورق لضمان الخروج الكامل
        .cut()   // قص الورق (إذا كانت الطابعة تدعم ذلك)
        .close();

    console.log('Test print sent successfully!');
});
