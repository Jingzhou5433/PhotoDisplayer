import React, { Component } from 'react';
import classes from './PhotoDisplayer.module.css'
import axios from 'axios';
import PhotoItem from '../PhotoItem/photoItem';

class Displayer extends Component{
    state = {
        URLs:[],
        photoIndex: 0,
        intervalIndex: null
    }

    componentDidMount(){
        console.log(this.props.count);
        let temp = [];
        for (let i = 0; i < this.props.count; i++) {
            axios.get(`https://source.unsplash.com/random/${i}`)
            .then(
                res => {
                    let url = res.request.responseURL;
                   
                    temp.push(url);
                    
                    this.setState({URLs: temp})
                })
           
        }
        this.setTime();
    }

    setTime = ()=>{
        
        let id = setInterval(() => {
            this.setState((prevState)=>{
                return (prevState.photoIndex === this.props.count-1) ? 
                {photoIndex:0} : {photoIndex: prevState.photoIndex + 1}
            })
        }, this.props.interVal);

        this.setState({intervalIndex: id});
    } 

    buttonClickHandler = (direction) =>{
        const count = this.props.count;
        clearInterval(this.state.intervalIndex);
        this.setState((prevState)=>{
            if (prevState.photoIndex === count-1 && direction === 1){
                return {photoIndex:0}
            } else if(prevState.photoIndex === 0 && direction === -1){
                return {photoIndex: count-1}
            } else{
                return {photoIndex: prevState.photoIndex + direction}
            }
        })
        this.setTime();
    }

    labelClickHandler = (index) =>{
        clearInterval(this.state.intervalIndex);
        this.setState({photoIndex: index});
        this.setTime();
    }
    
    render(){
        return(
            <>
              
                <h1>Photo Displayer</h1>
                <div className={classes.Container}>
                    <div className={classes.PhotoHolder}>
                        
                        <PhotoItem URL={this.state.URLs[this.state.photoIndex]} className={classes.Photo}></PhotoItem>
                        <div className={classes.Button}>
                            <button  onClick={() => this.buttonClickHandler(-1)} style={{left: '0px'}}>{"<"}</button>
                            <button  onClick={() => this.buttonClickHandler(1)}>{">"}</button>
                        </div>
                        

                        <div  className = {classes.Label}>
                            {this.state.URLs.map((url, index) => {
                                return(<span
                                    onClick = {() => this.labelClickHandler(index)}
                                    className = {classes.LabelItem}
                                    key={index}>
                                        o
                                    </span>)
                            })}
                        </div>
                    </div>
                   
                </div>
            </>
        )
    }
}

export default Displayer;