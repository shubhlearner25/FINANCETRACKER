const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// -----------------------------------------------------------------------------
// Middleware: File Upload Validation
// Ensures uploaded files meet required rules (type, size, format). Used mainly
// for validating receipt image uploads. If the file is missing or invalid, the
// middleware prevents the request from continuing and returns an error response.
// -----------------------------------------------------------------------------

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('receipt'); // 'receipt' is the name of the form field

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images or PDFs Only!');
  }
}

module.exports = upload;