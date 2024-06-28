import React from 'react'
import { Link } from 'react-router-dom'

function BackIcon({path}) {
    
    return (
        <div>
            <Link to={`/${path}`} >
            <div className='back_icon_main_div' >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-90deg-left back_icon_self" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z" />
                </svg>
            </div>
            </Link>
        </div>
    )
}

export default BackIcon