import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../../components/adressList';

 const App = () => {
  const cardData = [
    {
      id: 1,
      title: 'Card 1',
      title2: 'Salmiya',
      iconUrl: '/assets/img/salmiya home.svg',
      name: 'John Doe',
      block: 'A',
      home: '101',
      floor: '1',
      imageUrl: 'image1.jpg',
    },
    // {
    //   id: 2,
    //   title: 'Card 2',
    //   iconUrl: 'icon2.png',
    //   name: 'Jane Smith',
    //   block: 'B',
    //   home: '202',
    //   floor: '2',
    //   imageUrl: 'image2.jpg',
    // },
    // {
    //   id: 3,
    //   title: 'Card 3',
    //   iconUrl: 'icon3.png',
    //   name: 'Bob Johnson',
    //   block: 'C',
    //   home: '303',
    //   floor: '3',
    //   imageUrl: 'image3.jpg',
    // },
  ];

  return (
    <div className="app">
      {cardData.map((data) => (
        <Card
          key={data.id}
          title={data.title}
          title2={data.title2}
          iconUrl={data.iconUrl}
          name={data.name}
          block={data.block}
          home={data.home}
          floor={data.floor}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
};

export default App;



