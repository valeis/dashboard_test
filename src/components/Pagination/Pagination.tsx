import React, { useState } from 'react'
import './Pagination.css'

type PaginationProps ={
    usersPerPage: number,
    totalUsers: number,
    paginate: (number:number) => any,
    currentPage: number
}

const Pagination=({usersPerPage, totalUsers, paginate, currentPage}:PaginationProps)=>{
    const pageNumbers =[];
    const [style, setStyle] = useState("default")
    const changeStyle = () => {
        setStyle("active");
    }

    for(let i =1; i<=Math.ceil(totalUsers / usersPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div className='pagination'>
            {pageNumbers.map((number) =>{
                return(
                    <button 
                    key={number}
                    onClick={()=> paginate(number)}
                    className={number === currentPage ? "active": ""}>
                        {number}
                    </button>
                );
            })}
        </div>
    )
}
export default Pagination;