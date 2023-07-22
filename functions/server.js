const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Configurações de e-mail (Substitua com as suas credenciais de e-mail)
const emailConfig = {
  service: 'Gmail', // Exemplo: 'Gmail'
  auth: {
    user: 'luffim2020@gmail.com',
    pass: 'Funfaces2014@'
  }
};

// Middleware para processar o corpo das requisições POST como texto
app.use(bodyParser.text());

// Rota para receber os dados do Bling e enviar por e-mail
app.post('/receber-dados-bling', (req, res) => {
  const dadosDoBling = req.body; // Aqui, o req.body conterá a string enviada pelo Bling

  // Configurar o transporte de e-mail
  const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: emailConfig.auth
  });

  // Configurações do e-mail
  const mailOptions = {
    from: emailConfig.auth.user,
    to: 'lucasfagundesmaica@gmail.com', // Substitua pelo e-mail do destinatário
    subject: 'Dados Recebidos do Bling',
    text: dadosDoBling // Aqui, enviamos a string recebida diretamente no corpo do e-mail
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).send("Erro ao enviar e-mail");
    } else {
      console.log("E-mail enviado com sucesso:", info.response);
      res.status(200).send("E-mail enviado com sucesso!");
    }
  });
});

// Iniciar o servidor na porta 3000 (ou a porta fornecida pelo Netlify)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});