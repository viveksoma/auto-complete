import React from "react";
import AutoComplete from "./components/AutoComplete";
import { fetchSuggestions } from "./data/mockData";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <h2>Auto Complete</h2>
      <AutoComplete dataFetcher={fetchSuggestions} />
    </div>
  );
};

export default App;
