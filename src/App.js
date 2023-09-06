import "./App.css";
import RouteProvider from "./routes/routes";

function App() {
  return (
    <div className="container">
      <div className="design-section">
        <RouteProvider />
      </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
