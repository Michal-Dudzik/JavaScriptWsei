import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetiles from './components/TemperatureAndDetiles';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import MapContainer from './components/Map';

function App() {
	const [query, setQuery] = useState({
		q: 'Kraków',
	});
	const [units, setUnits] = useState('metric');
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormattedWeatherData({ ...query, units }).then((data) => {
				setWeather(data);
			});
		};

		fetchWeather();
	}, [query, units]);

	const formatBackground = () => {
		if (!weather) return 'from-cyan-700 to-blue-700';
		const threshold = units === 'metric' ? 20 : 60;
		if (weather.temp <= threshold) return 'from-blue-700 to-blue-900';

		return 'from-yellow-700 to-orange-700';
	};

	return (
		<div>
			<MapContainer />
			<div
				className={`absolute left-1/2 opacity-95 mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-grey-400 ${formatBackground()} `}>
				<TopButtons setQuery={setQuery}></TopButtons>
				<Inputs setQuery={setQuery} units={units} setUnits={setUnits}></Inputs>

				{weather && (
					<div>
						<TimeAndLocation weather={weather}></TimeAndLocation>
						<TemperatureAndDetiles weather={weather}></TemperatureAndDetiles>

						<Forecast title="hourly forecast" items={weather.hourly}></Forecast>
						<Forecast title="daily forecast" items={weather.daily}></Forecast>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
