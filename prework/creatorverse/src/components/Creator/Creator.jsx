import React from 'react'
import { useState } from 'react'
import styles from './Creator.module.css'

const Creator = () => {
  const [creatorData, setCreatorData] = useState([
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      image: 'https://via.placeholder.com/150',
      bio: 'John Doe is a software engineer at Google',
      social: 'https://www.google.com',
    },
  ])
  return (

    <div>
      {creatorData.map((creator) => (
        <div key={creator.id} className={styles.creatorCard}>
          <h1 className={styles.creatorName}>{creator.name}</h1>
          <p className={styles.creatorEmail}>{creator.email}</p>
          <p className={styles.creatorPhone}>{creator.phone}</p>
          <img src={creator.image} alt={creator.name} className={styles.creatorImage} />
          <p className={styles.creatorBio}>{creator.bio}</p>
          <a href={creator.social} className={styles.creatorSocial}>{creator.social}</a>
        </div>
      ))}
    </div>
  )
}

export default Creator