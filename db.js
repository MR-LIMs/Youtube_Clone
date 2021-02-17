// export const videos = [
//   { id:32342,
//     title: 'Video awesome1',
//     description: 'this is something',
//     views: 24,
//     videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 432421,
//       name:"Nicolas",
//       email:"nico@las.com"
//     }
//   },
//   { id:12341,
//     title: 'Video awesome2',
//     description: 'this is something',
//     views: 24,
//     videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 323563,
//       name:"Nicolas",
//       email:"nico@las.com"
//     }
//   },
//   { id:52342,
//     title: 'Video awesome3',
//     description: 'this is something',
//     views: 24,
//     videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 123415,
//       name:"Nicolas",
//       email:"nico@las.com"
//     }
//   },
//   { id:34536,
//     title: 'Video awesome4',
//     description: 'this is something',
//     views: 24,
//     videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 345256,
//       name:"Nicolas",
//       email:"nico@las.com"
//     }
//   }
// ]

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// .env파일에 있는 변수들을 process.env.key에 저장.

mongoose.connect(
  // 포트번호, 데이터베이스 이름
  process.env.MONGO_URL,
  {
    useNewUrlParser: true, // mongoDB를 실행할때마다 이 configuration을 실행해
    useFindAndModify: false, // mongoDB를 실행할때마다 이 configuration을 실행하지마
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connect to DB');
const handleError = () => console.log(`❌ Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);
