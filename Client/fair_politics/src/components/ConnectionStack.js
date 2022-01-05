import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
const ConnectionStack = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/connection/login">
          <Login/>
        </Route>
        <Route exact path="/connection/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default ConnectionStack;
