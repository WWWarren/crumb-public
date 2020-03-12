import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import { getComments, postComment } from '../../../store/actions/comments';

import Block from '../../../components/layout/Block';
import Form from '../../../components/form/FormContainer';
import TextArea from '../../../components/form/textarea/TextArea';

import './CommentAreaStyles.scss';

export class CommentArea extends Component {
  state = {
    addComment: false,
  }

  componentDidMount = () => {
    this.props.getComments();
  }

  showComments = () => {
    const comments = this.props.comments;
    const comment = comments.filter(c => c.recipe === this.props.recipeId).map((c, i) => (
      <div
        key={i}
        className="recipePage-commentArea__commentAreaComment"
      >
        <p>{c.text}</p>
        <h3>{c.userName}</h3>
        <div>{c.time}</div>
      </div>
    ));

    if (comment.length === 0) {
      return (
        <div
          className="recipePage-commentArea__commentAreaComment"
        >
          <h3>No comments :(</h3>
          <div>Be the first one to comment on this recipe.</div>
        </div>
      )
    }
    return comment;
  }

  saveComment = (values) => {
    const { user, recipeId } = this.props;
    const obj = {
      userID: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      recipe: this.props.recipeId,
      time: moment().locale('en-gb').format('L'),
      text: values.text,
    }

    if (values.text) {
      this.props.postComment(obj, recipeId, () => this.setState(() => ({
        addComment: false,
      })));
    }
  }

  render() {
    const { addComment } = this.state;
    if (!this.props.comments) return null;
    return (
      <Block
        display="block"
      >
        <div className="recipePage-commentArea__commentAreaHeader">
          <h3
             className="recipePage-commentArea__commentAreaTitle"
          >
            Comments
          </h3>
          {
            addComment ?
            <div
              onClick={() => this.setState(() => ({ addComment: false }))}
              className="recipePage-commentArea__commentAreaButton"
              style={{
                color: '#DA9F93'
              }}
            >
              - Close
            </div>
            :
            <div
              onClick={() => this.setState(() => ({ addComment: true }))}
              className="recipePage-commentArea__commentAreaButton"
              style={{
                color: '#7EA16B'
              }}
            >
              - Add Comment
            </div>
          }
        </div>
        {
          addComment &&
          <>
            <Form
              form="newComment"
              submitText="Post Comment"
              onSubmit={this.saveComment}
            >
              <Field
                name="text"
                component={TextArea}
              />
            </Form>
          </>
        }
        {this.showComments()}
      </Block>
    )
  }
}

export function mapStateToProps({ user, comments, form }) {
  return {
    user: user.activeUser,
    comments: comments.list,
    form
  }
}

export default connect(
  mapStateToProps,
  {
    getComments,
    postComment
  }
)(CommentArea);

CommentArea.propTypes = {
  getComments: PropTypes.func,
  postComment: PropTypes.func,
  user: PropTypes.object,
  comments: PropTypes.array,
  form: PropTypes.object,
  recipeId: PropTypes.string,
}
