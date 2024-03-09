import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
	const [beers, setBeers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://api.punkapi.com/v2/beers"
				);
				setBeers(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const filteredBeers = beers.filter((beer) =>
		beer.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="App">
			<h1>Punk Beers</h1>
			<input
				type="text"
				placeholder="Search beers..."
				value={searchQuery}
				onChange={handleSearchChange}
			/>
			<div className="beer-container">
				{filteredBeers.map((beer) => (
					<div className="beer-card" key={beer.id}>
						<img src={beer.image_url} alt={beer.name} />
						<h2>{beer.name}</h2>
						<p>{beer.tagline}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
