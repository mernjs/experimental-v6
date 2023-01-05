import React from 'react';
import { Header, Footer } from '../components';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import apiRequest from '../Utilities';
import withRouter from '../components/withRouter';

const Dashboard = (props) => {
  const { isLoading, data } = useQuery(['users'], async () => {
    const response = await apiRequest.get(`users`);
    return response.data.data;
  });

  console.log('Dashboard', props);

  return (
    <>
      <ScrollView>
        <Header />
        <Container>
          <h1>Dashboard</h1>
          {isLoading ? <h3>Loading...</h3> :
            <>
              {data?.map((item, index) => {
                return <div key={index} style={{ padding: '5' }}>
                  <Link to={`/details/${item?._id}`}><p>{item?.email}</p></Link>
                </div>;
              })}
            </>
          }

        </Container>
      </ScrollView>
      <Footer />
    </>
  );
};

export default withRouter(Dashboard);

const ScrollView = styled.div`
  min-height: calc(100vh - 80px);
`;

const Container = styled.div`
  text-align: center;
  padding-top: 50px;
`;
