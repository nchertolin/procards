import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {getPagesList} from "../../js/utils";

export default function Pagination({page, setPage, amount}) {
    const previousPage = () => setPage(page === 1 ? amount : page - 1);
    const goToPage = (numberOfPage) => () => setPage(numberOfPage);
    const nextPage = () => setPage(page === amount ? 1 : page + 1);
    const pages = getPagesList(amount);
    const startIndex = Math.min(Math.max(page - Math.floor(5 / 2), 0), amount - 5);
    const endIndex = Math.min(startIndex + 5, amount);

    return (
        <div className='pagination'>
            <button className='pagination__button' onClick={previousPage}>
                <NavigateBeforeIcon/>
            </button>
            {
                pages.slice(startIndex, endIndex).map(numberOfPage =>
                    <button key={numberOfPage} className={`pagination__button ${page === numberOfPage ? 'active' : ''}`}
                            onClick={goToPage(numberOfPage)}>
                        {numberOfPage}
                    </button>)
            }
            <button className='pagination__button' onClick={nextPage}>
                <NavigateNextIcon/>
            </button>
        </div>
    );
}
