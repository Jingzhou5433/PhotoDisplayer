import React from 'react';

const PhotoItem = (props)=>{
    const style = {
        'height': "600px",
        'width': "450px",
        'objectFit': 'cover'
    }
 return(
     <img alt={''} src={props.URL} style = {style}></img>
 )
}

export default PhotoItem;