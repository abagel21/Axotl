import axios from 'axios'

import { USER_LOADED, CREATE_POST, POST_FAIL, EDIT_POST, GET_POSTS, GET_POST, GET_MY_POSTS, ADD_COMMENT, EDIT_COMMENT, ADD_REPLY, EDIT_REPLY, DELETE_POST, DELETE_COMMENT, DELETE_REPLY, ADD_LIKE, REMOVE_LIKE, LIKE_COMMENT, LIKE_REPLY } from './Types.js'

export const createPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/posts', body, config)
        dispatch({
            type: CREATE_POST,
            payload: res.data.newPost
        })
        const payload = {
            user: res.data.user,
            sponsor: res.data.user.sponsor
        }
        dispatch({
            type: USER_LOADED,
            payload
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const editPost = (formData, post_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.put(`/api/posts/${post_id}`, body, config)
        dispatch({
            type: EDIT_POST,
            payload: res.data
        })

    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const deletePost = (post_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}`);
        dispatch({
            type: DELETE_POST,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        // dispatch({
        //     type: POST_FAIL
        // })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/single-view/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const getMyPosts = () => async dispatch => {

    //BACKEND IMPLEMENTATION NOT DONE
    //@TODO
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}


export const addComment = (formData, post_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post(`/api/posts/comment/${post_id}`, body, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const editComment = (formData, post_id, comment_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post(`/api/posts/comment/${post_id}/${comment_id}`, body, config);
        dispatch({
            type: EDIT_COMMENT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const deleteComment = (post_id, comment_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const addReply = (formData, post_id, comment_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.put(`/api/posts/reply/${post_id}/${comment_id}`, body, config);
        dispatch({
            type: ADD_REPLY,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const editReply = (formData, post_id, comment_id, reply_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.put(`/api/posts/${post_id}/${comment_id}/${reply_id}`, body, config);
        dispatch({
            type: EDIT_REPLY,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const deleteReply = (post_id, comment_id, reply_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}/${comment_id}/${reply_id}`);
        dispatch({
            type: DELETE_REPLY,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const addLike = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${post_id}`);
        dispatch({
            type: ADD_LIKE,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const removeLike = (post_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${post_id}`);
        dispatch({
            type: REMOVE_LIKE,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const likeComment = (post_id, comment_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/comment/like/${post_id}/${comment_id}`);
        dispatch({
            type: LIKE_COMMENT,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}

export const likeReply = (post_id, comment_id, reply_id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/reply/like/${post_id}/${comment_id}/${reply_id}`);
        dispatch({
            type: LIKE_REPLY,
            payload: res.data
        })
    } catch (err) {
        console.error(err.message);
        dispatch({
            type: POST_FAIL
        })
    }
}