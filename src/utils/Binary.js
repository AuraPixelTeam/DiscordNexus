
export class Binary {

    /**
     * @param {string} hexString 
     * @returns {Buffer}
     */
    static bufferFromHexString(hexString) {
        const hexArray = hexString.split('\\x').filter(Boolean);
        const intArray = hexArray.map(hex => parseInt(hex, 16));
        const buffer = Buffer.from(intArray);
        return buffer;
    }

    /**
     * 
     * @param {string} str 
     * @returns {string}
     */
    static stringToHex(str) {
        let hexString = '';
    
        for (let i = 0; i < str.length; i++) {
            const hexValue = str.charCodeAt(i).toString(16);
            hexString += '\\x' + hexValue.padStart(2, '0');
        }
        return hexString;
    }
}