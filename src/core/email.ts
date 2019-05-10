import * as nodemailer  from 'nodemailer';
import ejs from 'ejs';
// import fs from 'fs';


function createTransport() {
    const hostname = 'email-ssl.com.br';
    const port = 465;
    const username = 'contato@fatecsp20191ihc.com';
    const password = 'admin@fatecsp20191ihc';

    return nodemailer.createTransport({
        host: hostname,
        port: port,
        secure: true,
        auth: {
            user: username,
            pass: password
        },
        debug: true
    });
}

export interface SendMailOptions extends nodemailer.SendMailOptions {
    from?: string;
}

export async function sendEmail(options: SendMailOptions) {
    const defaultSender = 'contato@fatecsp20191ihc.com';

    const transporter = createTransport();
    options.from = options.from || defaultSender;
    return await new Promise((resolve, reject) => {
        transporter.sendMail(options, (error, result: nodemailer.SentMessageInfo) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

export async function compileTemplate(templateName: string, data: any) {
    const path = `./templates/${templateName}.ejs`;
    return await <string>ejs.renderFile(path, data);
}

export async function sendEmailTemplate(to: string, subject: string, templateName: string, data?: any, from?: string) {
    try {
        const compiled = await compileTemplate(templateName, data);
        return await sendEmail({
            to: to,
            subject: subject,
            html: compiled, 
            from: from,
            attachments: [],
        });
    } catch (error) {
        throw error;
    }
}
