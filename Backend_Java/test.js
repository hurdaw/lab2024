// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo8OPFkNwVBfNjs6uCNac5GqOeuG83_I0",
  authDomain: "tkt1-15e42.firebaseapp.com",
  databaseURL: "https://tkt1-15e42-default-rtdb.firebaseio.com",
  projectId: "tkt1-15e42",
  storageBucket: "tkt1-15e42.appspot.com",
  messagingSenderId: "722983577274",
  appId: "1:722983577274:web:e2af233816a09415d60483",
  measurementId: "G-D7QB571J6M",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// Function to update data in real-time
function getObjectTemp(callback) {
  const dataRef = database.ref("sensor/objectTemp"); // Thay 'your-database-path' bằng đường dẫn tới dữ liệu của bạn

  dataRef.on("value", (snapshot) => {
    const data = snapshot.val();
    // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Hiển thị dữ liệu dạng JSON
    callback(data);
  });
}
function getAmbientTemp(callback) {
  const dataRef = database.ref("sensor/ambientTempC"); // Thay 'your-database-path' bằng đường dẫn tới dữ liệu của bạn

  dataRef.on("value", (snapshot) => {
    const data = snapshot.val();
    // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Hiển thị dữ liệu dạng JSON
    callback(data);
  });
}
function getHearRate(callback) {
  const dataRef = database.ref("sensor/heartRate"); // Thay 'your-database-path' bằng đường dẫn tới dữ liệu của bạn

  dataRef.on("value", (snapshot) => {
    const data = snapshot.val();
    // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Hiển thị dữ liệu dạng JSON
    callback(data);
  });
}
function getSpO2(callback) {
  const dataRef = database.ref("sensor/spO2"); // Thay 'your-database-path' bằng đường dẫn tới dữ liệu của bạn

  dataRef.on("value", (snapshot) => {
    const data = snapshot.val();
    // dataContainer.innerHTML = JSON.stringify(data, null, 2); // Hiển thị dữ liệu dạng JSON
    callback(data);
  });
}
// getObjectTemp((temperature) => {
//   console.log("Temperature:", temperature);
//   document.getElementById("temperature").innerHTML = temperature; // Hiển thị dữ liệu
// });
var chartA = new Highcharts.Chart({
  chart: { renderTo: "chart-body" },
  title: { text: "Nhiệt độ cơ thể" },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: { second: "%H:%M:%S" },
  },
  yAxis: {
    title: { text: "Temperature (Ambient)" },
  },
  credits: { enabled: false },
});
// Add new data points to the chart every second
setInterval(function () {
  // y = Math.random() * (40 - 30) + 30; // Generate random temperature between 30 and 40
  getObjectTemp((temperature) => {
    var x = new Date().getTime(), // Current time
      y = temperature;
    // Round the temperature to one decimal place
    y = parseFloat(y.toFixed(1));
    // Add new point, shift the chart if there are more than 10 points
    if (chartA.series[0].data.length >= 10) {
      chartA.series[0].addPoint([x, y], true, true, true);
    } else {
      chartA.series[0].addPoint([x, y], true, false, true);
    }
    console.log("Temperature:", y);
    document.getElementById("temperature").textContent = y + " " + "°C";
  });
  // Update the displayed temperature value
}, 3000);
var chartB = new Highcharts.Chart({
  chart: { renderTo: "chart-heartRate" },
  title: { text: "nhip tim" },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: { second: "%H:%M:%S" },
  },
  yAxis: {
    title: { text: "BPM" },
  },
  credits: { enabled: false },
});
// Add new data points to the chart every second
setInterval(function () {
  // y = Math.random() * (40 - 30) + 30; // Generate random temperature between 30 and 40
  getHearRate((heartRate) => {
    var x = new Date().getTime(), // Current time
      y = heartRate;
    // Round the temperature to one decimal place
    y = parseFloat(y.toFixed(1));
    // Add new point, shift the chart if there are more than 10 points
    if (chartB.series[0].data.length >= 10) {
      chartB.series[0].addPoint([x, y], true, true, true);
    } else {
      chartB.series[0].addPoint([x, y], true, false, true);
    }
    console.log("nhịp tim: ", y);
    document.getElementById("heartRate").textContent = y + " " + "BPM";
  });
  // Update the displayed temperature value
}, 3000);
var chartC = new Highcharts.Chart({
  chart: { renderTo: "chart-spo2" },
  title: { text: "Nồng độ oxi trong máu" },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: { second: "%H:%M:%S" },
  },
  yAxis: {
    title: { text: "%" },
  },
  credits: { enabled: false },
});
// Add new data points to the chart every second
setInterval(function () {
  // y = Math.random() * (40 - 30) + 30; // Generate random temperature between 30 and 40
  getSpO2((spo2) => {
    var x = new Date().getTime(), // Current time
      y = spo2;
    // Round the temperature to one decimal place
    y = parseFloat(y.toFixed(1));
    // Add new point, shift the chart if there are more than 10 points
    if (chartC.series[0].data.length >= 10) {
      chartC.series[0].addPoint([x, y], true, true, true);
    } else {
      chartC.series[0].addPoint([x, y], true, false, true);
    }
    console.log("Nồng độ oxi trong máu: ", y);
    document.getElementById("spo2").textContent = y + " " + "%";
  });
  // Update the displayed temperature value
}, 3000);
