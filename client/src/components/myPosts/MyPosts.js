import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {editPost, getPosts, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';
import EditPost from '../posts/EditPost'
import ConfirmationModal from '../common/ConfirmationModal'
import EditComment from '../posts/EditComment'
import EditReply from '../posts/EditReply'
import MyPost from './MyPost'
import {getMyPosts} from '../../actions/post';
import Post from '../posts/Post'
import Spinner from '../common/Spinner'

import '../posts/styling/posts.css'

const MyPosts = ({getMyPosts, loading, myPosts, editPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply}) => {
    useEffect(() => {
       getMyPosts(pageNumber);
    }, [])
    //value of search query
    const [search, setSearch] = useState('')
    //onchange for search
    const onChange = e => {
        setSearch(e.target.value);
    }
    //number for how many results getPosts returns * 10
    const [pageNumber, setPageNumber] = useState(1)
    //getting more posts when "show more" is clicked
    const paginate = e => {
        setPageNumber(pageNumber+1);
        getMyPosts(pageNumber);
    }
    //value for editing post modal to be open or closed
    const [modal, modalToggle] = useState('closed');
    //value of whether confirm deletion modal is open
    const [confirmationModal, setConfirmationModal] = useState('closed');
    //overall storage of current post item
    const [post, setPost] = useState({})
    //post for modal to confirm deletion of post
    const [confirmationPost, setConfirmationPost] = useState({})
    //data for editing comment modal
    const [editingComment, setEditingComment] = useState({});
    //value for editing comment modal
    const [editCommentModal, setEditCommentModal] = useState('closed')
    //data for editing reply modal
    const [editingReply, setEditingReply] = useState({});
    //value for editing reply modal
    const [editReplyModal, setEditReplyModal] = useState('closed')
    return (
        <div className = 'posts'>
            <h3 className="heading">Posts</h3>
            <form className="searchingContainer">
                <input type="text" className="searchBar" placeholder='Search for a post...' onChange = {e => onChange(e)} value= {search}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
            {/**modal to edit a post */}
            <EditPost postState = {post} editPost = {editPost} modal = {modal} modalToggle = {modalToggle}/>
            {/**modal to confirm deletion of a post */}
            <ConfirmationModal setConfirmationModal = {setConfirmationModal} confirmationModalToggle={setConfirmationModal} modal = {confirmationModal} setModal = {setConfirmationModal} text = 'Are you sure you want to do this?' parentClassName='posts' confirmationModal={confirmationModal} confirmationPost = {confirmationPost} deletePost = {deletePost}/>
            {/**modal to edit a comment */}
            <EditComment editingComment = {editingComment} setEditCommentModal = {setEditCommentModal} editCommentModal = {editCommentModal} postState = {post} editComment = {editComment} />
            <EditReply editingReply = {editingReply} setEditReplyModal = {setEditReplyModal} editReplyModal = {editReplyModal} postState = {post} editReply = {editReply} editingComment = {editingComment}/>
            <div className="posts__container">
                {loading ? <Spinner /> : myPosts.filter(post => {
                    return post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase()
                }).map((post, index) => { 
                return (
                    <MyPost index = {index} setPost = {setPost} modal = {modal} key = {index} post={post} editPost = {editPost} deletePost={deletePost} modalToggle = {modalToggle} confirmationModalToggle= {setConfirmationModal} confirmationModal={confirmationModal} setConfirmationPost = {setConfirmationPost} confirmationPost = {confirmationPost} addComment = {addComment} addReply = {addReply} addLike = {addLike} deleteComment = {deleteComment} deleteReply = {deleteReply} setEditingComment = {setEditingComment} setEditCommentModal = {setEditCommentModal} likeComment = {likeComment} likeReply={likeReply} editReply = {editReply} setEditingReply = {setEditingReply} setEditReplyModal = {setEditReplyModal}/>
                )})}
                {!loading && !myPosts ? (<h3 className = 'heading'>You Haven't Made Any Posts Yet</h3>) : null}
            </div>
            {!loading && 
            <button className="posts__see-more button" onClick = {e => paginate(e)}>See More Posts</button>
}
        </div>
    )
}

MyPosts.propTypes = {
    editPost : PropTypes.func.isRequired,
    addComment : PropTypes.func.isRequired,
    addLike : PropTypes.func.isRequired,
    addReply : PropTypes.func.isRequired,
    editComment : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
    deleteComment : PropTypes.func.isRequired,
    deleteReply : PropTypes.func.isRequired,
    getMyPosts: PropTypes.func.isRequired,
    myPosts : PropTypes.array,
}

const mapStateToProps = state => ({
    loading : state.post.myPostsLoading,
    myPosts: state.post.myPosts
})

export default connect(mapStateToProps, { getMyPosts, editPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply})(withRouter(MyPosts))
