// 1. Importar as ferramentas que instalámos
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// 2. Configurar as variáveis de ambiente (para segurança)
dotenv.config();

// 3. Inicializar o servidor Express
const app = express();
const PORT = 4000; // A porta onde o nosso servidor vai "ouvir"

// 4. Configurar o servidor para "entender" os dados do formulário e servir os nossos arquivos
app.use(express.urlencoded({ extended: true })); // Para interpretar dados de formulários
app.use(express.static(__dirname)); // Para servir os nossos arquivos HTML, CSS, JS e imagens

// 5. Criar a rota que vai receber os dados do formulário
//    O action="/enviar-dados" do nosso formulário em contato.html vai acionar este código
app.post('/enviar-dados', (req, res) => {
    // Extrair os dados do corpo da requisição (req.body)
    const { nome, celular, email, cidade, atividade, preferencia_contato } = req.body;

    // 6. Configurar o "transportador" de e-mail com Nodemailer
    //    Ele vai usar as credenciais que vamos definir no arquivo .env
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Vamos usar o Gmail como exemplo
        auth: {
            user: process.env.EMAIL_USER, // O teu e-mail
            pass: process.env.EMAIL_PASS, // A tua senha de aplicação
        },
    });

    // 7. Montar o corpo do e-mail que o administrador vai receber
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'karineduarte.dev@gmail.com', // << MUDA ISTO para o teu e-mail de administrador
        subject: `Novo Contato do Site TaxMed - ${nome}`,
        html: `
            <h1>Novo Lead Recebido do Site!</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Celular:</strong> ${celular}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Cidade:</strong> ${cidade}</p>
            <p><strong>Atividade:</strong> ${atividade}</p>
            <p><strong>Preferência de Contato:</strong> ${preferencia_contato}</p>
        `,
    };

    // 8. Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.send('Ocorreu um erro. Tente novamente mais tarde.');
        } else {
            console.log('E-mail enviado com sucesso:', info.response);
            // Redireciona o utilizador para uma página de "obrigado" (ainda a criar)
            // Por agora, vamos apenas enviar uma mensagem de sucesso.
            res.send('<h2>Obrigado pelo seu contato!</h2><p>Recebemos as suas informações e entraremos em contato em breve.</p><a href="/">Voltar ao início</a>');
        }
    });
});

// 9. Ligar o servidor e mantê-lo à escuta por pedidos
app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});