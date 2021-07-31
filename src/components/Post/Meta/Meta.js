// @flow strict
import React from 'react';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>تم النشر في  {new Date(date).toLocaleDateString('AR', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
    <div>
      اذا اعجبك هذا المقال فلربما يستفيد من شخص اخر اذا قمت بمشاركته
  </div>
  </div>
  
);

export default Meta;
