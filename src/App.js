import RouteProvider from "./routes/routes";
import "./App.css";

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
