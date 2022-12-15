import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import PrivateRoute from './component/privateRoute/PrivateRoute';
import TwitterPage from './pages/TwitterPage';
import NewsPage from './pages/NewsPage';
import UserProfilePage from './pages/UserProfile';
import UserProfilePagePremium from './pages/UserProfilePremium';
import TwitterPremiumPage from './pages/TwitterPremiumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuideTwitterStdPage from './pages/GuideTwitterStdPage';
import GuideTwitterPrmPage from './pages/GuideTwitterPrmPage';
import "@fontsource/roboto";

function App() {
  const [isAutheticated] = useState(localStorage.token ? true : false);
  return (
    // <div style={{fontFamilly:'roboto'}}>
    <div>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path='/'
            component={TwitterPage}
            auth={isAutheticated}
          />
          <PrivateRoute
            exact
            path='/news'
            component={NewsPage}
            auth={isAutheticated}
          />
          <PrivateRoute
            path='/user'
            component={UserProfilePage}
            exact
            auth={isAutheticated}
          />
          <PrivateRoute
            path='/user-premium'
            component={UserProfilePagePremium}
            exact
            auth={isAutheticated}
          />
          <PrivateRoute
            path='/premium'
            component={TwitterPremiumPage}
            exact
            auth={isAutheticated}
          />
          <PrivateRoute
            path='/guide-twitter-std'
            component={GuideTwitterStdPage}
            exact
            auth={isAutheticated}
          />
          <PrivateRoute
            path='/guide-twitter-prm'
            component={GuideTwitterPrmPage}
            exact
            auth={isAutheticated}
          />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/register' component={RegisterPage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
