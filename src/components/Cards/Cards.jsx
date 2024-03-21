import React, { useState } from "react";
import DatePicker from '@/ui/DatePicker';
import styles from './style.module.css';

const cardsData = [
  {
    imageUrl: "https://example.com/image1.jpg",
    title: "Card 1",
    description: "Description for Card 1",
  },
  {
    imageUrl: "https://example.com/image2.jpg",
    title: "Card 2",
    description: "Description for Card 2",
  },
  {
    imageUrl: "https://example.com/image2.jpg",
    title: "Card 3",
    description: "Description for Card 3",
  },
];

const Cards = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.cards}>
      {cardsData.map((card, index) => (
        <div className={styles.cardsItem} key={index}>
          <img src={card.imageUrl} alt={card.title} className={styles.cardsImg}/>
          <h2 className={styles.cardsTitle}>{card.title}</h2>
          <p className={styles.cardsDesc}>{card.description}</p>
        </div>
      ))}
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
};

export default Cards;
