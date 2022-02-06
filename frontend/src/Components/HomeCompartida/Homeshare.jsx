import React from 'react';
import SearchModificado from './SearchModificado';
import '../SearchBar.css'
import Orders from '../Orders/Orders'
import Cards from '../Cards';
import styles from './HomeShare.module.css'
import Sort from '../Orders/Sort'
function Homeshare() {
  return <div className={styles.container}>
    <div className={styles.bloqueo}>
      <section className={styles.search}>
  <div className={styles.div1}>

  <SearchModificado/>
  </div>
  <div className={styles.div2}>
   
  <Sort/>

  </div>
    </section>
      </div>
    <section className={styles.compartido}>
     
  <div className={styles.orden}>
  <h1>Categories</h1>
      <Orders/>
  </div>
      <div className={styles.cartas}>

      <Cards/>
      </div>
     
    </section>
  </div>;
}

export default Homeshare;
