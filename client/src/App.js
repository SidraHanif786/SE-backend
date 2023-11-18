import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from "./routes/index.js";

function App() {
  return (
    <Router>
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  </Router>
  );
}

export default App;
