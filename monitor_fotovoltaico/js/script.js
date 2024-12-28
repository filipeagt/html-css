// Configuração MQTT
const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
const client = mqtt.connect(brokerUrl, {
  clientId: 'dashboard_' + Math.random().toString(16).substr(2, 8)
});

// Configuração dos gráficos
const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 10,
      suggestedMax: 14,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#E0E0E0'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#E0E0E0'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#E0E0E0'
      }
    }
  },
  animation: {
    duration: 0
  }
};

// Dados para os gráficos
const maxDataPoints = 50;
const battery1Data = {
  labels: [],
  datasets: [{
    label: 'Tensão (V)',
    data: [],
    borderColor: '#4CAF50',
    tension: 0.4
  }]
};

const battery2Data = {
  labels: [],
  datasets: [{
    label: 'Tensão (V)',
    data: [],
    borderColor: '#FFC107',
    tension: 0.4
  }]
};

// Inicialização dos gráficos
const ctx1 = document.getElementById('battery1-chart').getContext('2d');
const ctx2 = document.getElementById('battery2-chart').getContext('2d');
const chart1 = new Chart(ctx1, {
  type: 'line',
  data: battery1Data,
  options: chartOptions
});
const chart2 = new Chart(ctx2, {
  type: 'line',
  data: battery2Data,
  options: chartOptions
});

// Funções de atualização da UI
function updateBatteryStatus(batteryNum, voltage) {
  const level = (voltage - 10) * 100 / 4;
  const clampedLevel = Math.max(0, Math.min(100, level));
  
  document.getElementById(`battery${batteryNum}-level`).style.width = `${clampedLevel}%`;
  document.getElementById(`battery${batteryNum}-voltage`).textContent = `${voltage.toFixed(2)}V`;
  
  const chart = batteryNum === 1 ? chart1 : chart2;
  const data = batteryNum === 1 ? battery1Data : battery2Data;
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  
  data.labels.push(timeStr);
  data.datasets[0].data.push(voltage);
  
  if (data.labels.length > maxDataPoints) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }
  
  chart.update();
}

function updateSystemInfo(batt1, batt2) {
  const totalVoltage = batt1 + batt2;
  document.getElementById('total-voltage').textContent = `${totalVoltage.toFixed(2)}V`;
  document.getElementById('last-update').textContent = new Date().toLocaleString();
  
  const status = totalVoltage > 24 ? 'Atenção: Tensão Alta' : 
                 totalVoltage < 20 ? 'Atenção: Tensão Baixa' : 
                 'Normal';
  document.getElementById('system-status').textContent = status;
}

// Eventos MQTT
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  document.getElementById('connection-status').className = 'connection-status connected';
  document.getElementById('connection-status').textContent = 'Conectado';
  client.subscribe('solar/battery1');
  client.subscribe('solar/battery2');
});

client.on('message', (topic, message) => {
  const payload = JSON.parse(message.toString());
  
  if (topic === 'solar/battery1') {
    updateBatteryStatus(1, payload.voltage);
  } else if (topic === 'solar/battery2') {
    updateBatteryStatus(2, payload.voltage);
    updateSystemInfo(parseFloat(document.getElementById('battery1-voltage').textContent),
                    payload.voltage);
  }
});

client.on('error', (error) => {
  console.error('Erro MQTT:', error);
  document.getElementById('connection-status').className = 'connection-status disconnected';
  document.getElementById('connection-status').textContent = 'Erro na conexão';
});

client.on('close', () => {
  document.getElementById('connection-status').className = 'connection-status disconnected';
  document.getElementById('connection-status').textContent = 'Desconectado';
});

// Simulação de dados para teste (remover em produção)
function simulateData() {
  const battery1Voltage = 12 + Math.random() * 0.5;
  const battery2Voltage = 12 + Math.random() * 0.5;
  
  client.publish('solar/battery1', JSON.stringify({voltage: battery1Voltage}));
  client.publish('solar/battery2', JSON.stringify({voltage: battery2Voltage}));
}

setInterval(simulateData, 2000);
