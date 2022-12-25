import * as uuid from "uuid";
import * as path from "path";
import sharp from 'sharp'


class FileService {
  // saveFile(file, to) {
  //   try {
  //     const fileName = uuid.v4() + ".jpg";
  //     //TODO: Не понимаю как определяется папка static
  //     const filePath = path.resolve("static" + to, fileName);
  //     file.mv(filePath);
  //     return "static" + to + '/' + fileName;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  async saveFile(filePicture, to) {
    try {
      console.log(filePicture);
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve("static" + to, fileName);
      await sharp(filePicture.data)
        .jpeg({ quality: 30 })
        .toFile(filePath)
      return "static" + to + "/" + fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new FileService();
