/**
 * Renders a fully visible retrospective reflection card.
 *
 * @flow
 */
// $FlowFixMe
import {EditorState} from 'draft-js';
import React, {Component} from 'react';
import styled from 'react-emotion';
import FontAwesome from 'react-fontawesome';

import EditorInputWrapper from 'universal/components/EditorInputWrapper';
import PlainButton from 'universal/components/PlainButton/PlainButton';
import ReflectionCardWrapper from 'universal/components/ReflectionCardWrapper/ReflectionCardWrapper';
import editorDecorators from 'universal/components/TaskEditor/decorators';

type Props = {
  // The draft-js content for this card
  contentState: Object, // `Object` is yucky, but draft-js types are borked right now...
  // The action to take when this card is deleted
  handleDelete?: () => any,
  // The action to take when this card is saved
  handleSave?: (editorState: EditorState) => any
};

type State = {
  editorState: EditorState,
  showDelete: boolean
};

const DeleteButton = styled(PlainButton)({
  backgroundColor: 'rgba(0, 0, 0, 0)',
  color: 'red',
  position: 'absolute',
  top: '-0.5rem',
  right: '-0.5rem',
  zIndex: 1
});

const ReflectionCardText = styled('div')({
  maxHeight: '10rem',
  overflow: 'auto',
  padding: '0.8rem'
});

export default class ReflectionCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        props.contentState,
        editorDecorators(this.getEditorState)
      ),
      showDelete: false
    };
  }

  componentDidMount() {
    if (this.deleteButton) {
      this.deleteButton.addEventListener('focus', this.showDelete);
      // $FlowFixMe - flow wants us to wrap this in another if (deleteButton)
      this.deleteButton.addEventListener('blur', this.hideDelete);
    }
  }

  componentWillUnmount() {
    if (this.deleteButton) {
      this.deleteButton.removeEventListener('focus', this.showDelete);
    }
    if (this.deleteButton) { // flow makes us check this twice...
      this.deleteButton.removeEventListener('blur', this.hideDelete);
    }
  }

  getEditorState = () => (
    this.state.editorState
  );

  setEditorState = (editorState: EditorState) => {
    this.setState({editorState});
  };

  showDelete = () => {
    this.setState({showDelete: true});
  };

  hideDelete = () => {
    this.setState({showDelete: false});
  };

  saveDeleteButton = (deleteButton: ?HTMLElement) => {
    this.deleteButton = deleteButton;
  };

  deleteButton: ?HTMLElement;

  render() {
    const {handleDelete, handleSave} = this.props;
    const {editorState, showDelete} = this.state;
    return (
      <ReflectionCardWrapper onMouseEnter={handleDelete && this.showDelete} onMouseLeave={handleDelete && this.hideDelete}>
        <ReflectionCardText>
          {handleSave ? (
            <EditorInputWrapper
              editorState={editorState}
              handleReturn={() => 'not-handled'}
              onBlur={handleSave && (() => handleSave(editorState))}
              placeholder="My reflection thought..."
              setEditorState={this.setEditorState}
            />
          ) : (
            <div>{editorState.getCurrentContent().getPlainText()}</div>
          )}
        </ReflectionCardText>
        {handleDelete &&
          <DeleteButton innerRef={this.saveDeleteButton} aria-label="Delete this reflection" onClick={handleDelete}>
            {showDelete && <FontAwesome name="times-circle" />}
          </DeleteButton>
        }
      </ReflectionCardWrapper>
    );
  }
}