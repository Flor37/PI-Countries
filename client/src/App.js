import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import ActivityCrud from './components/ActivityCrud';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path = '/home' component={Home} />
          <Route path = '/countries/:id' component={Detail} />
          <Route path = '/activity' component={ActivityCrud} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
