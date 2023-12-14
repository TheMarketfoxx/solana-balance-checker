import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import AddressForm from '../components/AddressForm';
import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');

  const addressSubmittedHandler = async (address: string) => {
    try {
      const key = new PublicKey(address);
      setAddress(key.toBase58());

      const connection = new Connection(clusterApiUrl('devnet'));
      const fetchedBalance = await connection.getBalance(key);
      setBalance(fetchedBalance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.imageBox}></div>
        <p>
          Stay Balanced, 
          Stay Informed: 
          Your Solana Holdings at a Glance
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
      </header>
    </div>
  );
};

export default Home;
