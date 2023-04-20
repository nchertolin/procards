import React from 'react';

export default function Pagination({ page, setPage, amount }) {
   const previousPage = () => setPage(page === 1 ? amount : page - 1);
   const nextPage = () => setPage(page === amount ? 1 : page + 1);

   return (
      <div className='pagination'>
         <button onClick={previousPage}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M9.72973 20L0 10L9.72973 0L12 2.33333L4.54054 10L12 17.6667L9.72973 20Z"
               />
            </svg>
         </button>
         <p>{page} / {amount}</p>
         <button onClick={nextPage}>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M2.27027 20L0 17.6667L7.45946 10L0 2.33333L2.27027 0L12 10L2.27027 20Z"
               />
            </svg>
         </button>
      </div>
   );
}
