import React from 'react'
import  "../style/loader/PrimaryLoader.css"

function PrimaryLoader() {
  
  return (
    <div style={{height:"100%",width:"100%" , display:"flex",justifyContent:"center",alignItems:"center",zIndex:"9999",backgroundColor:"rgba(0,0,0,0.3)"}} >
        <div className="primaryloader"></div>
    </div>
  )
}

export default PrimaryLoader