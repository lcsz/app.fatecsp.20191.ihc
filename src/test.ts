import { sendEmailTemplate } from "./core/email";

const data = {
    userName: 'Test',
    cdReserva: '49174015hfddsf'
};
sendEmailTemplate('asd@gmail.com', 'Seu contato', 'mensagem-recebida', data).then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});
