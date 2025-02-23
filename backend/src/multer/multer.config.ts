import multer from 'multer';
// multer is a library for image uploading
// memeorystorage() is a function that stores the file in memory

 export const storage = multer.memoryStorage();
 export const upload = multer({ storage: storage, limits:{fileSize: 5 * 1024 * 1024} }); // 5MB