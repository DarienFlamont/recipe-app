import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
//LOOK INTO WHY WHEN VIEW PAGE SOURCE IT SHOWS index.css and not the code we are writing (likely to do with abstraction of this App.js and the function calls)


const App = () => {
	const APP_ID = "28ca53e3";
	const APP_KEY = 'c6b588fbf5587a87c0c6315a7e1c9b0f';

	//Should be using environment tools to get the APP_ID and APP_KEY hidden maybe get that done in version 2

	//useState return information: "useState returns an array, where the first element is the state variable and the second element is a function to update the value of the variable"
	//const [counter, setCounter] = useState(0);

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("chicken");

	useEffect(() =>{
		getRecipes();
	}, [query]);

	//Need to use backticks in our request in order to pass in variables.
	//Always add await anytime you are using an API or have a promise to return data.
	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		//console.log(data.hits);
		setRecipes(data.hits);
	}

	const updateSearch = e => {
		//e.target.value is the value of the targeted event
		setSearch(e.target.value);
		//console.log(search);
	}

	const getSearch = e => {
		e.preventDefault();
		setQuery(search);
		setSearch("");
	}

	//Return statement that will load all the rendered attributes that we have created
	return(
		<div className="Recipe App">
			<form className="search-form" onSubmit={getSearch}>
				<input className="search-bar" type="text" value={search} onChange={updateSearch}/>
				<button className="search-button" type="submit">Search</button>
			</form>
			<div className="recipes">
			{recipes.map(recipe =>(
				<Recipe 
					key={recipe.recipe.label}
					title={recipe.recipe.label} 
					calories={recipe.recipe.calories} 
					image={recipe.recipe.image}
					ingredients={recipe.recipe.ingredients}
				/>
			))};
			</div>
		</div>
	);
};

export default App;
