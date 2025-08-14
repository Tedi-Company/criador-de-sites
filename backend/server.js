const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { sendEmail } = require('./email');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../editor')));
app.use('/sites', express.static(path.join(__dirname, '../sites')));

app.post('/publish', (req, res) => {
    const { name, html, css, js, email } = req.body;
    if (!name || !html) return res.status(400).send('Nome e HTML são obrigatórios');

    const siteDir = path.join(__dirname, '../sites', name);
    if (!fs.existsSync(siteDir)) fs.mkdirSync(siteDir);

    fs.writeFileSync(path.join(siteDir, 'index.html'), html);
    if (css) fs.writeFileSync(path.join(siteDir, 'style.css'), css);
    if (js) fs.writeFileSync(path.join(siteDir, 'script.js'), js);

    const siteUrl = `${req.protocol}://${req.get('host')}/sites/${name}/`;

    // Envia e-mail se houver
    if (email) {
        sendEmail(email, 'Seu site foi publicado', `Seu site está online: ${siteUrl}`);
    }

    res.json({ url: siteUrl });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
