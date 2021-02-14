import React from 'react';
import Displayer from '../Components/PhotoDisplayer/PhotoDisplayer';

const Container = () => {
   
    return(
        <>
            <Displayer 
                count={10} 
                interVal={3000}
            ></Displayer>
        </>
    )
}

export default Container;