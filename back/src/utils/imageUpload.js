const multer = require("multer");
const fs = require("fs");
const path = require("path");

function imageUpload(upload_path, file_size) {
  try {
    fs.readdirSync(upload_path); // 폴더 확인
  } catch (err) {
    console.error(`${upload_path} 폴더가 없습니다. 폴더를 생성합니다.`);
    fs.mkdirSync(upload_path); // 폴더 생성
  }

  const storage = multer.diskStorage({   // 저장한공간 정보 : 하드디스크에 저장
    destination: function (req, file, done) { // 저장 위치
      done(null, upload_path + '/'); // uploads라는 폴더 안에 저장
    },
    filename: function (req, file, done) {   // 파일명을 어떤 이름으로 올릴지
      const ext = path.extname(file.originalname); // 파일의 확장자
      const fn = new String(file.originalname)
      const imgFn = new String(fn.getBytes("UTF-8"), "8859-1")
      done(null, path.basename(imgFn, ext) 
        + "_" + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
    }
  });

    const limits = {
        fileSize: file_size * 1024 * 1024, // 용량 제한
    };

    return multer({ storage, limits });
}

export default imageUpload;
