import './index.css';
import Navbar from "react-bootstrap/Navbar";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Analysis from "./pages/Analysis";
import Login from "./pages/Login"
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const App = (props) => {

return (
  <div className="app">
    <Navbar variant="dark">
      <Container>
        <Navbar.Collapse>
          <Navbar.Brand style={{color: "inherit", fontSize: "200%"}}>Chess Analysis</Navbar.Brand>
          <Link to="/">Home</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/login">Login</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="page-container">
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/analysis">
        <Analysis />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
    </div>
  </div>
)
}

export default App;
