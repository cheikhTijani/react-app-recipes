import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// style
import './App.css';
// components
import Navbar from "./components/Navbar";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
// pages
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';


function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create" exact>
            <Create />
          </Route>
          <Route path="/recipes/:id" exact>
            <Recipe />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
