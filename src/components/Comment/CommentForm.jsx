import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../common/Button/Button';
import avatar from '../../assets/images/avatar.png';

class CommentRender extends React.Component {
  state = {
    isEdit: false,
  };

  commentBox = () => {
    const { isEdit } = this.state;
    const {
      comment,
      currentUser,
      onDeleteComment,
      articleSlug,
    } = this.props;
    return (
      <div key={comment.id} className="comment-box">
        <div className="comment-header">
          <Link className="author-name" to={`../profiles/${comment.author.username}`}>
            <img src={comment.author.image ? comment.author.image : avatar} alt="" className="profile-avatar" />
            {comment.author.username}
          </Link>
          {(comment.userId === currentUser.id) && (
          <span className="control-btn">
            <Button
              classes="my-article-delete"
              onClick={() => onDeleteComment(comment.id, articleSlug)}
            >
              <i className="fa fa-trash" />
            </Button>
            <Button
              classes="my-comment-update"
              onClick={() => this.onEditComment(comment.body)}
            >
              <i className="fa fa-edit" />
            </Button>
          </span>
          )}
        </div>
        <div onDoubleClick={
          () => comment.userId === currentUser.id && this.onEditComment(comment.body)
          }
        >
          { isEdit ? this.commentForm(comment.body, comment.id) : comment.body }
          <span className="comment-time">{comment.version === 'edited' && ` (${comment.version})`}</span>
        </div>
        <div className="comment-time">{moment(comment.createdAt).fromNow()}</div>
      </div>
    );
  }

  commentForm = (oldBody, id) => {
    const { updateComment, enterPress, updateBody } = this.props;
    return (
      <form>
        <Textarea
          className="comment-textarea"
          placeholder="Update your comment..."
          type="text"
          value={updateBody}
          onKeyDown={(e) => { enterPress(e, updateComment, id); this.closeCommentInput(e); }}
          onBlur={this.onFocusOut}
          onChange={this.onChange}
          autoFocus
        />
      </form>
    );
  };

  onEditComment = (body) => {
    const { inputHandler } = this.props;
    this.setState({
      isEdit: true,
    });
    inputHandler(body);
  }

  onFocusOut = () => {
    this.setState({
      isEdit: false,
    });
  }

  closeCommentInput = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      if (!e.target.value.trim()) {
        e.preventDefault();
        return;
      }
      this.onFocusOut();
      e.preventDefault();
    }
  }

  onChange = (e) => {
    const { inputHandler } = this.props;
    inputHandler(e.target.value);
  }

  render() {
    return (
      this.commentBox()
    );
  }
}

CommentRender.propTypes = {
  articleSlug: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  enterPress: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  updateBody: PropTypes.string.isRequired,
};

export const mapStateToProps = ({
  comment: { updateBody },
}) => ({
  updateBody,
});

export default connect(mapStateToProps)(CommentRender);