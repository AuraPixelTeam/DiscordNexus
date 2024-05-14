import { exec } from "child_process";

export class Npm {

    static list(path) {
        var cmdString = "npm ls --depth=0 ";
        return new Promise(function(resolve, reject){
            exec(cmdString, {cwd: path?path:"/"},(error, stdout, stderr) => {
                if(stderr !== ""){
                    if (stderr.indexOf("missing")== -1 && stderr.indexOf("required") == -1) {
                        return reject(error);
                    }
                }
                var packages = [];
                packages = stdout.split('\n');
                resolve(packages
                    .filter(line => line.trim() !== '')
                    .map(line => {
                        const atIndex = line.indexOf('@');
                        const spaceIndex = line.indexOf(' ', atIndex);
                
                        if (atIndex !== -1) {
                            return line.slice(0, atIndex);
                        } else if (spaceIndex !== -1) {
                            return line.slice(0, spaceIndex);
                        } else {
                            return line;
                        }
                    })
                    .map(line => line.replace(/^(\+--\s|\`--\s)/, ''))
                    .map(line => line.split('@')[0])
                )
            })
        })
    }
    
    static install(packages, opts){
        if(packages.length == 0 || !packages || !packages.length){return Promise.reject("No packages found");}
        if(typeof packages == "string") packages = [packages];
        if(!opts) opts = {};
        var cmdString = "npm install " + packages.join(" ") + " "
        + (opts.global ? " -g":"")
        + (opts.save   ? " --save":" --no-save")
        + (opts.saveDev? " --save-dev":"")
        + (opts.legacyBundling? " --legacy-bundling":"")
        + (opts.noOptional? " --no-optional":"")
        + (opts.ignoreScripts? " --ignore-scripts":"");
    
        return new Promise(function(resolve, reject){
            var cmd = exec(cmdString, {cwd: opts.cwd?opts.cwd:"/", maxBuffer: opts.maxBuffer?opts.maxBuffer:200 * 1024},(error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
    
            if(opts.output) {
                var consoleOutput = function(msg) {
                    console.log('npm: ' + msg);
                };
    
                cmd.stdout.on('data', consoleOutput);
                cmd.stderr.on('data', consoleOutput);
            }
        });
    }
}