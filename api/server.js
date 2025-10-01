const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 4000;

// Define o caminho para a pasta principal do projeto (um nível acima da pasta 'api')
const projectRoot = path.join(__dirname, '..');

// Serve os ficheiros estáticos (HTML, CSS, JS, imagens) a partir da pasta principal
app.use(express.static(projectRoot));
app.use(express.urlencoded({ extended: true }));

// Rota para o envio do formulário
// Esta é a rota que corresponde ao action="api/server" do seu HTML
app.post('/api/server', (req, res) => {
    // Usando os campos do formulário do modal como referência
    const { nome, celular, email, cidade, atividade, preferencia_contato } = req.body;

    const transporter = nodemailer.createTransport({
        host: "br762.hostgator.com.br", // O endereço real e correto do seu servidor
        port: 465, // Porta para TLS/SSL
        secure: true, // Define como true para usar TLS/SSL
        auth: {
            user: process.env.EMAIL_USER, // contato@taxmed.com.br
            pass: process.env.EMAIL_PASS, // A senha do seu e-mail
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: `"${nome}" <${process.env.EMAIL_USER}>`, // Mostra o nome da pessoa no remetente
        to: 'contato@taxmed.com.br', // E-mail que vai receber a mensagem
        replyTo: email, // Permite responder diretamente para o e-mail da pessoa
        subject: `Novo Contato do Site TaxMed - ${nome}`,
        html: `
            <h1>Novo Lead Recebido do Site!</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Celular:</strong> ${celular}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr>
            <p><strong>Cidade:</strong> ${cidade || 'Não preenchido'}</p>
            <p><strong>Atividade:</strong> ${atividade || 'Não preenchido'}</p>
            <p><strong>Preferência de Contato:</strong> ${preferencia_contato || 'Não preenchido'}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Ocorreu um erro. Tente novamente mais tarde.');
        }
        // Redireciona para a página de obrigado
        res.redirect('/obrigado.html');
    });
});

// Esta parte só será usada quando você executar o servidor localmente
// Se não houver outro processo a usar a porta, ele irá iniciar
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor local a rodar em http://localhost:${PORT}`);
    });
}

// Exporta a app para a Vercel
module.exports = app;