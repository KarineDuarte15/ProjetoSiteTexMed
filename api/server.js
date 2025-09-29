const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path'); // Módulo para lidar com caminhos de arquivos

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

app.post('/enviar-dados', (req, res) => {
    // Captura os novos campos do formulário
    const { nome, email, celular, assunto, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        host: "mail.taxmed.com.br", // Servidor de e-mail da HostGator para o seu domínio
        port: 465,                  // Porta para conexão segura (SSL)
        secure: true,               // Habilita a conexão segura
        auth: {
            user: process.env.EMAIL_USER, // O seu e-mail: contato@taxmed.com.br
            pass: process.env.EMAIL_PASS, // A senha do seu e-mail
        },
    });

    // Monta o novo corpo do e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'contato@taxmed.com.br', // O teu e-mail de administrador
        subject: `Novo Contato (Assunto: ${assunto}) - ${nome}`,
        html: `
            <h1>Novo Lead Recebido do Site!</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone/Celular:</strong> ${celular}</p>
            <hr>
            <p><strong>Assunto:</strong> ${assunto}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${mensagem}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.send('Ocorreu um erro. Tente novamente mais tarde.');
        } else {
            console.log('E-mail enviado com sucesso:', info.response);
            // Redireciona para a nova página de sucesso
            res.sendFile(path.join(__dirname, 'obrigado.html'));
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
module.exports = app;