import React, { Component } from 'react';
import { Comment } from '../../components';
import PropTypes from 'prop-types';
 
class CommentList extends Component {
    render() {
      
      const mapToComponents = data => {
        return data.map((comment, i) => {
          return(
            <Comment data = {comment}
                    key = {comment.comment_id}
                    ownership = {true}
                    index = {i}
                    onEdit = {this.props.onEdit}
                    onRemove = {this.props.onRemove} />
          )
        })
      }

      return (
        <div>
          { 
            mapToComponents(this.props.data)
          }
        </div>
      );
    }
}
 
CommentList.propTypes = {
    data: PropTypes.array,
    onEdit: PropTypes.func,
    onRemove : PropTypes.func
};
 
CommentList.defaultProps = {
    data: [],
    onEdit: (username, comment_id, filename, contents) => {
        console.error('edit function not defined');
 
    },
    onRemove : (user_id, comment_id) => {
      console.error('remove function not defined');
    }
};
 
export default CommentList;
