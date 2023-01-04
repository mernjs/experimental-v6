import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { history } from './Utilities';
import { store, persistor } from './Store';
// import { ReactQueryDevtools } from 'react-query/devtools';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user !== null ? <Navigate to="/" /> : children;
};
AuthRoute.propTypes = {
  children: PropTypes.element,
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user !== null ? children : <Navigate to={{ pathname: '/login' }} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.element,
};

const AppRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route
          exact={true}
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          exact={true}
          path="/details/:id"
          element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          }
        />
        <Route
          exact={true}
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          exact={true}
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route exact={true} path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <ToastContainer />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>

      </PersistGate>
    </Provider>
  );
};

export default App;
