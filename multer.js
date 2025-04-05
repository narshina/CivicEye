import multer from 'multer';
import path from 'path';

// Common function for setting storage location dynamically
const storageConfig = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${folder}/`); 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

// File filter function
const fileFilter = (allowedTypes) => (req, file, cb) => {
    const fileTypes = new RegExp(allowedTypes);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error("File type not allowed!"), false);
    }
};

// Multer configuration for complaint uploads (images/videos)
 const complaintUpload = multer({
    storage: storageConfig("proof"),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: fileFilter("jpeg|jpg|png|gif|mp4|avi|mov"),
});

// Multer configuration for user profile updates (ID proof only)
 const profileUpload = multer({
    storage: storageConfig("profiles"),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit for ID proof
    fileFilter: fileFilter("jpeg|jpg|png|pdf"), // Allow only images & PDFs
});
// export const upload = multer({ storage: storageConfig("uploads") });

export { complaintUpload, profileUpload };