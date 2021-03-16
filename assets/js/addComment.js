import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const CommentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');

// client가 comment를 넣고 enter
// axios에서 받아서 url을 요청하고 data 내의 comment를 post해준다.
// videoController의 postAddComment에서 req.body.comment를 이용할 수 있다.

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  CommentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  console.log(comment);
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
      // comment: comment
    },
  });
  console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }

  // fetch(`api/${videoId}/comment`, {

  //   method: 'POST',
  //   data:
  // });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
