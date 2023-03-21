import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Option } from 'antd/es/mentions';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  const {data} = useGetCryptosQuery(100);

  if(!cryptoNews?.value) {
    return 'Loading...';
  }

  console.log(cryptoNews);

  return (
    <Row gutter={[24, 24]} >
      {!simplified && (
        <Col span={24} >
          <Select showSearch className='select-news' placeholder="select a crypto" optionFilterProp='children' 
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={(value) => setNewsCategory(value)}
          >
            <Option value="Cryptocurrency" >Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => <Option value={coin.name} >{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'> 
            <a href={news.url} target="_blank" rel='noreferrer' >
                <div className='news-image-container' >
                  <Typography.Title className='news-title' level={4}>
                    {news.name}
                  </Typography.Title>
                  <img  src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news-img"/>
                </div>
                <p>
                  {news.description > 100 ? `${news.description.substring(0, 100)}...`: news.description}
                </p>
                <div className='provider-container'>
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="avatar" />
                      <Typography.Text className='provider-name'>{news.provider[0]?.name}</Typography.Text>
                    </div>
                    <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News