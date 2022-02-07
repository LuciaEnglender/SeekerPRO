import React from 'react'
import s from '../postulantes/Styles/Pagination.module.css'

function Pagination({vacancyPerPage, filtradas, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(filtradas/vacancyPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            
            <ul >
                {pageNumbers?.map(number => (
                    <li key={number}>
                         <button conClick = {() => paginado(number)}>
                         {number}
                        </button>
                    </li>
                    ))} </ul>
                 
                 
        </nav>
    ) 
}

export default Pagination