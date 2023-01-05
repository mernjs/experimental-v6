import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    return <Component
      {...props}
      location={location}
      navigate={navigate}
      params={params}
      dispatch={dispatch} />;
  }
  return ComponentWithRouterProp;
};

export default withRouter;
