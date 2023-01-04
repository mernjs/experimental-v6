import React from 'react';
import { Header, Footer } from '../components';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import apiRequest from '../Utilities';

const UserDetails = () => {
  const { id } = useParams();

  const { isLoading, data } = useQuery(['users', id], async () => {
    const response = await apiRequest.get(`users/${id}`);
    return response.data.data;
  });

  console.log('UserDetails', isLoading, data);

  return (
    <>
      <ScrollView>
        <Header />
        <Container>
          <h1>UserDetails</h1>
          <Link to={`/`}>Go Back</Link>
          {isLoading ? <h3>Loading...</h3> :
            <div>
              <h3>{data?.email}</h3>
            </div>
          }
        </Container>
      </ScrollView>
      <Footer />
    </>
  );
};

export default UserDetails;

const ScrollView = styled.div`
  min-height: calc(100vh - 80px);
`;

const Container = styled.div`
  text-align: center;
  padding-top: 50px;
`;
