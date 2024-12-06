document.getElementById('startTest').addEventListener('click', async () => {
    const pingElement = document.getElementById('ping');
    const jitterElement = document.getElementById('jitter');
    const downloadElement = document.getElementById('download');
    const downloadTimeElement = document.getElementById('downloadTime');
    const resultElement = document.getElementById('result');
    result = true;
  
    resultElement.textContent = '';
/*   
    // Measure Ping
    const startPing = performance.now();
    //await fetch('https://www.google.com', { mode: 'no-cors' });
    await fetch('https://static.flow.com.ar/', { mode: 'no-cors' });
    const endPing = performance.now();
    const ping = Math.round(endPing - startPing);
    pingElement.textContent = `${ping} ms`;
*/
    // Medir Ping y Jitter
    const pingTimes = [];
    for (let i = 0; i < 10; i++) {
        const startPing = performance.now();
        await fetch('https://static.flow.com.ar', { mode: 'no-cors' });
        const endPing = performance.now();
        pingTimes.push(endPing - startPing);
    }

    // Calcular Ping Promedio
    const ping = (pingTimes.reduce((a, b) => a + b, 0) / pingTimes.length).toFixed(2);
    pingElement.textContent = `${ping} ms`;
    // Si el ping es mayor a 300 ms, hasta las manos
    if (ping > 300) {
        result = false;
    }

    // Calcular Jitter
    const jitterValues = [];
    for (let i = 1; i < pingTimes.length; i++) {
        jitterValues.push(Math.abs(pingTimes[i] - pingTimes[i - 1]));
    }
    const jitter = (jitterValues.reduce((a, b) => a + b, 0) / jitterValues.length).toFixed(2);
    jitterElement.textContent = `${jitter} ms`;

    // Si el jitter es mayor a 10 ms, hasta las manos
    if (jitter > 10) {
        result = false;
    }
  
/*
// Measure Ping contra cloudfront
const startPing = performance.now();
//await fetch('https://www.google.com', { mode: 'no-cors' });
await fetch('https://d35bp30xk8khrl.cloudfront.net/', { mode: 'no-cors' });
//await fetch('https://web.app.flow.com.ar/', { mode: 'no-cors' });

const endPing = performance.now();
const pingCF = Math.round(endPing - startPing);
pingElement.textContent = `${pingCF} ms`;
*/

    // Measure Download Speed
    const downloadStart = performance.now();
//    const downloadData = await fetch('https://d35bp30xk8khrl.cloudfront.net/app-ott-prod.apk');
//    const fileSize = 34.5;
    const downloadData = await fetch('https://d35bp30xk8khrl.cloudfront.net/10MB.mp4');
    const fileSize = 10;
//    const downloadData = await fetch('https://d35bp30xk8khrl.cloudfront.net/2MB.mp4');
//    const fileSize = 2;
    const downloadBlob = await downloadData.blob();

    const downloadEnd = performance.now();
    const downloadTime = (downloadEnd - downloadStart) / 1000; // in seconds
    const downloadSpeed = ((fileSize * 8) / downloadTime).toFixed(2); // Mbps
    downloadElement.textContent = `${downloadSpeed} Mbps`;
    downloadTimeElement.textContent = `${downloadTime} seg`;
    
    // Si la velocidad es menor a 10 ms, hasta las manos
    if (downloadSpeed < 10) {
        result = false;
    }

    console.log(result)
    if (result) {
        resultElement.textContent = `Esta todo OK`;
    } else {
        resultElement.textContent = `Hasta las bolas`;
    }


  });
