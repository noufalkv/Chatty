import reducer, {
  addPostFeeling,
  closeModal,
  openModal,
  toggleCommentsModal,
  toggleDeleteDialog,
  toggleFeelingModal,
  toggleGifModal,
  toggleImageModal,
  toggleVideoModal,
  toggleReactionsModal
} from '@redux/reducers/modal/modal.reducer';

const initialState = {
  type: '',
  isOpen: false,
  feeling: '',
  image: '',
  data: null,
  feelingsIsOpen: false,
  openFileDialog: false,
  openVideoDialog: false,
  gifModalIsOpen: false,
  reactionsModalIsOpen: false,
  commentsModalIsOpen: false,
  deleteDialogIsOpen: false
};

const modalData = {
  type: 'add',
  isOpen: true,
  feeling: 'happy',
  image: 'https://place-hold.it',
  data: { username: 'Matt' },
  feelingsIsOpen: true,
  openFileDialog: true,
  openVideoDialog: true,
  gifModalIsOpen: true,
  reactionsModalIsOpen: true,
  commentsModalIsOpen: true,
  deleteDialogIsOpen: true
};

describe('modal reducer', () => {
  beforeEach(() => {
    initialState.type = '';
    initialState.isOpen = false;
    initialState.feeling = '';
    initialState.image = '';
    initialState.data = null;
    initialState.feelingsIsOpen = false;
    initialState.openFileDialog = false;
    initialState.openVideoDialog = false;
    initialState.gifModalIsOpen = false;
    initialState.reactionsModalIsOpen = false;
    initialState.commentsModalIsOpen = false;
    initialState.deleteDialogIsOpen = false;
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should open modal', () => {
    expect(reducer(initialState, openModal({ type: 'add', data: 'This is a message' }))).toEqual({
      type: 'add',
      isOpen: true,
      feeling: '',
      image: '',
      data: 'This is a message',
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should close modal', () => {
    expect(reducer(modalData, closeModal())).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should add post feeling', () => {
    expect(reducer(initialState, addPostFeeling({ feeling: 'happy' }))).toEqual({
      type: '',
      isOpen: false,
      feeling: 'happy',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleImageModal', () => {
    expect(reducer(initialState, toggleImageModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: true,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleVideoModal', () => {
    expect(reducer(initialState, toggleVideoModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: true,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleFeelingModal', () => {
    expect(reducer(initialState, toggleFeelingModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: true,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleGifModal', () => {
    expect(reducer(initialState, toggleGifModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: true,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleReactionsModal', () => {
    expect(reducer(initialState, toggleReactionsModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: true,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleCommentsModal', () => {
    expect(reducer(initialState, toggleCommentsModal(true))).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: null,
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: true,
      deleteDialogIsOpen: false
    });
  });

  it('should toggleDeleteDialog', () => {
    expect(
      reducer(initialState, toggleDeleteDialog({ toggle: true, data: 'deleted data' }))
    ).toEqual({
      type: '',
      isOpen: false,
      feeling: '',
      image: '',
      data: 'deleted data',
      feelingsIsOpen: false,
      openFileDialog: false,
      openVideoDialog: false,
      gifModalIsOpen: false,
      reactionsModalIsOpen: false,
      commentsModalIsOpen: false,
      deleteDialogIsOpen: true
    });
  });
});
