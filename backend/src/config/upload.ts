import multer from 'multer';
import { join } from 'path';

export default {
  storage: multer.diskStorage({
    destination: join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      // essa função vai alterar o nome dos arquivos, para evitar conflitos, caso seja feito o upload de 2 arquivos com mesmo nome.
      const fileName = `${Date.now()}-${file.originalname}`;

      // o callback recebe dois parametro, o primeiro e um erro, e o segundo e o resultado
      // como isso e improvavel de dá algum erro, colocamos um valor nulo. 
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 4 * 1024 * 1024
  }
};