import "./App.css";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <div className="TableHeader">
          <h1>Restaurants</h1>
        </div>
        <div className="TableContainer">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
