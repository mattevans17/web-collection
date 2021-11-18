import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import PageNotFound from './components/PageNotFound/PageNotFound'
import PageWrapperCenter from './components/PageWrapperCenter/PageWrapperCenter'
import './styles/reset.sass'
import './styles/app.sass'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageWrapperCenter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={PageNotFound} />
          </Switch>
        </PageWrapperCenter>
      </BrowserRouter>
    </div>
  );
}

export default App;