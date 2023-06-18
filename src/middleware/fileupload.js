import multer from "multer"
import AppError from "../utils/AppError.js"


export const uploadSingleFile = (filename,folderName) => {    
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

function fileFilter (req, file, cb) {

    if(file.mimetype.startsWith('image')) {
        cb(null,true)
    }
    else {
    cb(new AppError('images only ',400), false)
    }
}
const upload = multer({ storage , fileFilter })
return upload.single(filename)
}


export const uploadMultiFiles = (arrayOfFields,folderName) => {    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })
    
    function fileFilter (req, file, cb) {
    
        if(file.mimetype.startsWith('image')) {
            cb(null,true)
        }
        else {
        cb(new AppError('images only ',400), false)
        }
    }
    const upload = multer({ storage , fileFilter })
    return upload.fields(arrayOfFields)
    }