import { useState } from 'react';
import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dataset, setDataset] = useState({
    labels: ['A', 'B', 'C', 'D', 'E'],
    values: [10, 25, 15, 30, 20],
  });
  const [chartType, setChartType] = useState("bar");
  const [chartOptions, setChartOptions] = useState({
    scaleFigures: false,
    logScale: false,
    cherryPick: [],
  });
  const [history, setHistory] = useState([]);

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setChartOptions(lastState);
      setHistory([...history]);
    }
  };

  const handleApplyChanges = () => {
    setHistory([...history, chartOptions]);
  };

  const chartData = {
    labels: dataset.labels,
    datasets: [
      {
        label: 'Sample Data',
        data: dataset.values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} h-screen`}>
      <aside className="w-1/3 p-4 border-r">
        <h2 className="text-xl">Settings</h2>
        <label>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          Dark Mode
        </label>
        <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="scatter">Scatter Plot</option>
          <option value="pie">Pie Chart</option>
        </select>
        <label>
          <input type="checkbox" checked={chartOptions.scaleFigures} onChange={() => setChartOptions({...chartOptions, scaleFigures: !chartOptions.scaleFigures})} />
          Scale Figures in Bar Chart
        </label>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleApplyChanges}>Apply Changes</button>
      </aside>
      <main className="w-2/3 p-4">
        {chartType === "bar" && <Bar data={chartData} />}
        {chartType === "line" && <Line data={chartData} />}
        {chartType === "scatter" && <Scatter data={chartData} />}
        {chartType === "pie" && <Pie data={chartData} />}
      </main>
    </div>
  );
};

export default App;
