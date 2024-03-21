import React, { useState } from "react";
import DatePicker from '@/ui/DatePicker';
import styles from './style.module.css';

const list = [
  {
    imageUrl: "https://example.com/image1.jpg",
    title: "list 1",
    description: "Description for list 1",
  },
  {
    imageUrl: "https://example.com/image2.jpg",
    title: "list 2",
    description: "Description for list 2",
  },
  {
    imageUrl: "https://example.com/image2.jpg",
    title: "list 3",
    description: "Description for list 3",
  },
];

const List = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={styles.list}>
      {list.map((listItem, index) => (
        <div className={styles.listItem} key={index}>
          <img src={listItem.imageUrl} alt={listItem.title} className={styles.listItemImg}/>
          <h2 className={styles.listItemTitle}>{listItem.title}</h2>
          <p className={styles.listItemDesc}>{listItem.description}</p>
        </div>
      ))}
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
};

export default List;
