document.getElementById('add-css').onclick = () => {
    document.getElementById('css').style.display = 'block';
};
document.getElementById('add-js').onclick = () => {
    document.getElementById('js').style.display = 'block';
};

document.getElementById('publish').onclick = async () => {
    const name = prompt('Digite o nome do site:');
    if (!name) return alert('Nome do site é obrigatório');

    const email = prompt('Digite seu e-mail para receber o link (opcional):');

    const htmlContent = document.getElementById('editor-area').innerHTML;
    const cssContent = document.getElementById('css').value;
    const jsContent = document.getElementById('js').value;

    const response = await fetch('/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, html: htmlContent, css: cssContent, js: jsContent, email })
    });
    const data = await response.json();
    document.getElementById('result').innerHTML = `Site publicado! <a href="${data.url}" target="_blank">${data.url}</a>`;
};
