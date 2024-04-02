import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import TeamScreen from './screens/TeamScreen/TeamScreen';
import UserScreen from './screens/UserScreen/UserScreen';
import CreateUserScreen from './screens/CreateUserScreen/CreateUserScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store.js';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<HomeScreen />} />
      <Route path='/user/:id' index={true} element={<UserScreen />} />
      <Route path='/user/' index={true} element={<CreateUserScreen />} />
      <Route path='/team' index={true} element={<TeamScreen />} />
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

