import {
    readdirSync,
    statSync
} from "fs";
import path from "path";

export class File {

    static findFile(directory, filename) {
        const files = File.getAllFiles(directory);

        const foundFile = files.find(file => {
            const basename = path.basename(file);
            return basename === filename;
        });

        return foundFile ? foundFile : null;
    }

    static getAllFiles(directory, prefix = '') {
        let result = [];
        const files = readdirSync(directory);

        files.forEach(file => {
            const filePath = path.join(directory, file);
            const stats = statSync(filePath);

            if (stats.isDirectory()) {
                result = result.concat(File.getAllFiles(filePath, `${prefix}${file}/`));
            } else {
                result.push(`${prefix}${file}`);
            }
        });

        return result;
    }
}