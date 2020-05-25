import React, { Component } from 'react';
import './styling/chat.css';
import { getChatLogs } from '../../actions/chat';
import { connect } from 'react-redux'


//This is the component that will render the group chats along the left side of the screen
//that the user is a part of.
class Contact extends Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this);

    }

    onHover(e) {
        this.setState({})
    }

    componentDidMount() {
        this.props.getChatLogs();
    }

    onClick(e) {
        this.props.onChoose(e)
    }

    render() {
        //This will render all the chat logs.
        let chatlogs;
        if (this.props.chatlogs != null) {
            chatlogs = this.props.chatlogs.map(item => {
                return (
                    <div className='chat-tab' key={item._id} name={item._id} onClick={() => this.onClick(item._id)}>
                        <h5 key={item._id}>{item.name}</h5>
                    </div>
                )
            })
        }
        return (
            <div>
                {chatlogs}
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    chatlogs: state.chat.chatlogs,
})


export default connect(mapStateToProps, { getChatLogs })(Contact);