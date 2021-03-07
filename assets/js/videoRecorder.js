const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let videoRecorder;
let streamObject;

const handleVideoData = (event) => {
  console.log(event.data);
  // blob은 0,1로 이뤄진 파일.
  const { data: videoFile } = event;
  // download link 생성
  // 일반적으로 download는 link를 클릭했을 때, 파일을 받는 것.
  const link = document.createElement('a');
  link.href = URL.createObjectURL(videoFile);
  link.download = 'recorded.webm';
  document.body.appendChild(link);
  link.click(); // fake click
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener('click', stopRecording);
  recordBtn.addEventListener('click', getVideo);
  recordBtn.innerHTML = 'Start Recording';
  // videoPreview.srcObject = null;
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start(); // videoRecorder.start(1000); 1초 단위로 끊어진 blob => array에 추가해 저장해야 한다.
  console.log(videoRecorder);
  videoRecorder.addEventListener('dataavailable', handleVideoData);
  // setTimeOut(() => videoRecorder.stop(), 5000);
  // recording이 stop 돼야 data를 획득할 수 있다.
  recordBtn.addEventListener('click', stopRecording);
};

const getVideo = async () => {
  try {
    // const stream
    streamObject = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { facingMode: 'user', mirrored: true, width: 1280, height: 720 }, // true
    });
    // videoPreview.srcObject = stream;
    videoPreview.srcObject = streamObject;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop Recording';
    // streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "😕 You can't Record";
  } finally {
    recordBtn.removeEventListener('click', getVideo);
  }
};

function init() {
  recordBtn.addEventListener('click', getVideo);
}

if (recorderContainer) {
  init();
}

// 비디오 좌우반전하기!!!!!!
