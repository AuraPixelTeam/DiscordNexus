

export class Version {

    static compareVersions(v1, v2) {
        const v1Major = Number(v1.split('.')[0]);
        const v2Major = Number(v2.split('.')[0]);
    
        if (v1Major > v2Major) {
            return '>';
        } else if (v1Major < v2Major) {
            return '<';
        } else {
            return '=';
        }
    }    
}