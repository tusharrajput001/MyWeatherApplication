import Card from "./components/Card/Card";
import SearchApiConn from "./components/SearchCard/SearchApiConn";
import "./App.css";

function App() {
  return (
    <>
      <div className="searchArea">
        <SearchApiConn />
      </div>
      <div className="App">
        <Card />
      </div>
    </>
  );
}

export default App;
