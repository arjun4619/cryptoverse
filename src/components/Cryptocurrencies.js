import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = (props) => {
  const count = props.simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filterData = cryptoList?.data?.coins.filter((coint) => coint.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filterData)
  }, [cryptoList, searchTerm]);

  console.log(cryptos);

  if (isFetching) {
    return "Loading..."
  }
    return (
      <Fragment>
        {!props.simplified && (
            <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        )}
        
        <Row gutter={[32, 32]} className="crypto-card-container">
          {cryptos?.map((currency) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={currency.id}
            >
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                >
                  <p>Price: ${millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Fragment>
    );
};

export default Cryptocurrencies;
