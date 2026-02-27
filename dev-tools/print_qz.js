const qz = require('qz-tray');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

qz.api.setWebSocketType(WebSocket);

const PRINTER_NAME = 'XP-P301G';

async function printArabicRawImage() {
    try {
        console.log('Connecting to QZ Tray...');
        await qz.websocket.connect({ host: '127.0.0.1' });
        console.log('✅ Connected!');

        const config = qz.configs.create(PRINTER_NAME);

        const imagePath = path.join(__dirname, 'invoice.png');
        const imageBase64 = fs.readFileSync(imagePath).toString('base64');

        // إرسال الصورة كأوامر RAW ESC/POS مباشرة
        const data = [{
            type: 'raw',
            format: 'image',
            flavor: 'base64',
            data: imageBase64,
            options: {
                language: "ESCPOS",
                dotDensity: "double"
            }
        }];

        console.log('Sending Image as RAW ESC/POS (Continuous Mode)...');
        await qz.print(config, data);
        console.log('✅ Print job sent successfully!');

    } catch (err) {
        console.error('❌ QZ Error:', err.message);
    } finally {
        if (qz.websocket.isActive()) {
            await qz.websocket.disconnect();
        }
    }
}

printArabicRawImage();
