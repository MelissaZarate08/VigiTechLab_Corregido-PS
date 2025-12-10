const WS_URL = "ws://18.213.21.152:9090/ws"; // ✅ IP correcta del servidor

export function initWebSocket(callback) {
  let ws;

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log("✅ WebSocket conectado");
    
    ws.onerror = err => console.error("❌ WebSocket error", err);

    ws.onclose = e => {
      console.warn(`WebSocket cerrado (code ${e.code}). Reconectando...`);
      setTimeout(connect, 3000);
    };

    ws.onmessage = event => {
      console.log('📨 RAW DATA:', event.data); // DEBUG
      
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        console.error("Error parseando JSON:", e, event.data);
        return;
      }

      // CRÍTICO: Determinar el tipo de sensor
      let enrichedData = { ...data };
      
      // Por sensor_id
      if (data.sensor_id) {
        if (data.sensor_id.includes('GAS')) {
          enrichedData.type = 'gas';
        } else if (data.sensor_id.includes('PM')) {
          enrichedData.type = 'particles';
        } else if (data.sensor_id.includes('PIR')) {
          enrichedData.type = 'motion';
        } else if (data.sensor_id.includes('WEBCAM')) {
          enrichedData.type = 'camera';
        }
      }
      
      // Fallback por campos en el objeto
      if (!enrichedData.type) {
        if (data.lpg !== undefined || data.co !== undefined) {
          enrichedData.type = 'gas';
          enrichedData.id = 'g-' + data.id;
        } else if (data.pm1_0 !== undefined || data.pm2_5 !== undefined) {
          enrichedData.type = 'particles';
          enrichedData.id = 'p-' + data.id;
        } else if (data.motion_detected !== undefined) {
          enrichedData.type = 'motion';
          enrichedData.id = 'motion-' + data.id;
        } else if (data.image_path !== undefined) {
          enrichedData.type = 'camera';
        }
      }

      console.log('📊 PROCESSED DATA:', enrichedData); // DEBUG
      callback(enrichedData);
    };
  }

  connect();
  
  return {
    close: () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    }
  };
}