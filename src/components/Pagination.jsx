import React from 'react';
import left from '../assets/icons/left.svg';
import right from '../assets/icons/right.svg';

export default function Pagination({ page, setPage, amount }) {
   const previousPage = () => {
      if (page !== 1) {
         setPage(page - 1)
      }
   };

   const nextPage = () => {
      if (page === amount) {
         setPage(1);
      } else {
         setPage(page + 1)
      }
   };

   return (
      <div className='pagination'>
         <button onClick={previousPage}>
            <img src={left} alt="" />
         </button>
         <p>{page} / {amount}</p>
         <button onClick={nextPage}>
            <img src={right} alt="" />
         </button>
      </div>
   );
}
