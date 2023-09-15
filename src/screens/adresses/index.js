import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../../components/adressList';
import MyAddresses from '../../components/header/myAdresses';

 const App = () => {
  const cardData = [
    {
      id: 1,
      title: 'Home  ',
      title2: 'Salmiya',
      iconUrl: '/assets/img/salmiya home.svg',
      name: 'Salmiya',
      block: 'Block 11, Oman Street,',
      home: 'Home No: 33, ',
      floor: 'Floor: 2 Flat: 4',
    },
    {
      id: 2,
      title: 'Appart',
      title2: 'Salmiya',
      iconUrl: '/assets/img/salmiya appart.svg',
      name: 'Salmiya',
      block: 'Block 11, Oman Street,',
      home: 'Building No: 33, Sahar Building',
      floor: 'Floor: 10 Flat: 20',
    },
    {
      id: 3,
      title: 'Office',
      title2: 'Salmiya',
      iconUrl: '/assets/img/salmiya office.svg',
      name: 'Salmiya',
      block: 'Block 11, Oman Street,',
      home: 'Building No: 33, Sahar Building',
      floor: 'loor: 10, Seazen Office',
    },
  ];

  return (
    <div className="app">
      <MyAddresses/>
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



