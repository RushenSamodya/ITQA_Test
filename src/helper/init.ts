const fs = require('fs-extra');

try {
    fs.ensureDirSync('test-result/reports');
    fs.emptyDirSync('test-result/reports');
} catch (error) {
    console.log("Folder Not Created ", error);
    
}