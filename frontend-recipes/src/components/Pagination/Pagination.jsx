import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import s from "./Pagination.module.css";

const Pagination = ({className, listCount, currentPage, pages, onClick, ...props}) => {
    const activePageStyle = {
        backgroundColor: 'var(--green-color)',
        color: '#eee'

    }

    const page = (i, activePage = false) => (
        
        <li 
            key={i}
            className={s.page_number} 
            onClick={e => onClick(i)}
            style={activePage ? activePageStyle : {}}
        >
            {i}
        </li>
    )

    const new_list = [];
    if (currentPage < Math.ceil(listCount / 2)) {
        const end = pages < listCount ?
            pages : listCount;

        for (let i = 1; i <= end; i++) {
            currentPage === i ?
                new_list.push(page(i, true)) :
                new_list.push(page(i)); 
        }
    } 
    else if (currentPage >= Math.ceil(listCount / 2) &&
            currentPage < pages - Math.ceil(listCount / 2)) {
        
        let start = currentPage - Math.ceil(listCount / 2) + 1;
        let end = currentPage + Math.ceil(listCount / 2);
        if (listCount % 2 === 0) {
            end++;
        } 
        for (let i = start; i < end; i++) {
            currentPage === i ?
                new_list.push(page(i, true)) :
                new_list.push(page(i)); 
            
        }
    } 
    else {
        for (let i = pages - listCount; i <= pages; i++) {
            currentPage === i ?
                new_list.push(page(i, true)) :
                new_list.push(page(i)); 
        }
    }




    return (
        <div className={`${s.container} ${className}`} {...props}>
            <ul className={s.page}>
                <li 
                    className={s.page_btn}
                    onClick={e => {onClick(1)}}>
                    <FontAwesomeIcon icon={faAnglesLeft}/>
                </li>

                <li className={s.page_btn}
                    onClick={e => onClick(currentPage + 1)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </li>

                
                { new_list }
    
                <li className={s.page_btn}
                    onClick={e => onClick(currentPage + 1)}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </li>

                <li className={s.page_btn}
                    onClick={e => onClick(pages)}>
                    <FontAwesomeIcon icon={faAnglesRight}/>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;