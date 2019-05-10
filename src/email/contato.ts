import { sendEmailTemplate } from "../core/email";
import { ContactMessage } from "../products/model";

export interface ContactClienteParam {
    userName: string;
    contactType: string;
}

export async function sendContato(contact: ContactMessage) {
    if (contact._id === undefined || contact._id === null) {
        throw new Error("Invalid _id");
    }
    const templateClienteName = 'contato-cliente';
    const templateAdminName = 'contato-admin';
    const data: ContactClienteParam = {
        userName: contact.name,
        contactType: contact.subType ? contact.subType : contact.type
    }
    
    return {
        sendCLiente: await sendEmailTemplate(contact.email, '', templateClienteName, data, 'noreply@fatecsp20191ihc.com'),
        sendAdmin: await sendEmailTemplate('noreply@fatecsp20191ihc.com', '', templateAdminName, contact, 'noreply@fatecsp20191ihc.com')
    }
}
