import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainLayout from './components/layout/MainLayout';
import store from './store';
import DetailView from './views/Detail';
import HomeView from './views/Home';

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route path="/" exact component={HomeView}/>
              <Route path="/view/:id" exact component={DetailView}/>
              <Redirect from="*" to="/"/>
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
