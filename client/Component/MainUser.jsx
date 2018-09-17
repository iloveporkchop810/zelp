import React from 'react';
import SophiaPic from '../../SampleGETresponse/SophiaSample.jpg';
import Passport from './Passport.jsx';
import Star from './Star.jsx';
import './MainUser.css';


const defaultInput = 'Your review helps others learn about great local businesses. \n\nPlease Dont review this business if you received a freebie for writing this review, or if you\'re connected in any way to the owner or employees.'

class MainUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInputBox: false,
            value: '',
            userStarRate: '',
        }

        this.changeValue = this.changeValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    showInputBox() {
        console.log('pew pew pew pewwwww')
        this.setState({
            showInputBox: true  
        })  
    }

    changeValue(e) {
        this.setState({
            value: e.target.value
        })
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            showInputBox: false
        })
        var timeStamp = new Date().toLocaleString()
        var timeStampParse = timeStamp.split(' ');
        var timeShuffle = timeStampParse[0].split('/');
        var timeRejoin = [timeShuffle[2].slice(0,4),timeShuffle[0],timeShuffle[1]].join('-');
        var objTime = [timeRejoin, timeStampParse[1]].join(' ');

        this.props.postReview({ 
            // StarRating: this.state.userStarRate,
            // ReviewBody: 'Oh Hi Mark',
           
            StarRating: 2,
            ReviewBody: this.state.value,
            DateTime: objTime,
            Language: 'Engrish',
            PhotoLink: SophiaPic
         })
    }
    
    

    render() {
        const inputField = (
            <div className='input-box'>
            <form onSubmit={this.handleSubmit}>
                <textarea className='review-input' placeholder={defaultInput} value={this.state.value} onChange={(e) => this.changeValue(e)}></textarea>
                <input className='submit-input' type='submit' value='Post Review'></input>
            </form>
            </div> 
        )

        return (
            <div className='main-user'>
                <div className='user-parts'>
                    <Passport user={this.props.user} photo={SophiaPic}/>
                </div>
                <div className='review-parts'>
                    <div className='greybox'>
                        <div className='stars-user-review'>
                            <Star />
                        </div>
                        <div>
                        <span className='review-link' href='#'
                              onClick={() => this.showInputBox()}>Start your review of <strong>{this.props.business}</strong></span> 
                        </div>

                        {this.state.showInputBox ? inputField : null}
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default MainUser;