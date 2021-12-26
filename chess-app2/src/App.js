import './index.css';
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Analysis from "./pages/Analysis";


const App = (props) => {

  return (
    <div className="app">
      <Navbar />
      <div className="page-container">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/analysis">
          <Analysis />
        </Route>
      </Switch>
      </div>
    </div>
  )
}

export default App;
