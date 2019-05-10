import * as xml2js from 'xml2js';


export class XML {
    static parse(xmlString: string): Promise<any> {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlString, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}
