import { useState } from 'react';
import './App.css';

import { Layout, Typography } from 'antd';


import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { ProductList } from "./ProductList/ProductList";
import { ProductPrice } from "./ProductPrice/ProductPrice";
import { CreateProduct } from "./CreateProduct/CreateProduct";

const { Header, Content } = Layout;
const { Title } = Typography;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
    }),
    cache: new InMemoryCache(),
  });
};

function App() {

  const [client] = useState(createApolloClient());
  const [refetchData, setRefetchData] = useState(false); // For re-call the API after adding a product

  /*
    Called this method to refetch the queries after creating a new product
  */
  function doRefetchData(value: boolean) {
    setRefetchData(value);
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout style={{ height: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Title style={{ color: 'white', margin: 0, textAlign: 'left' }}>Inventory App</Title>
          </Header>
          <Content style={{ padding: '1em', textAlign: 'left' }}>
            <CreateProduct onCreate={doRefetchData} />
            {/* ProductPrice component is for the total value of product price */}
            <ProductPrice refetchData={refetchData} />
            <ProductList refetchData={refetchData} />
          </Content>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
