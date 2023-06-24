import React from 'react'
import PropTypes from 'prop-types'

function PostItem(props) {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <button>Удалить</button>
            </div>
        </div>
    )
}

PostItem.propTypes = {}

export default PostItem
