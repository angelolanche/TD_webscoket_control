const imageChooser = document.getElementById('images');

imageChooser.addEventListener('change', function() {
    if (this.files.length > 5) {
        alert('Voce pode selecionar no maximo 5 imagens');
        this.value = '';
    }
});

const imageSendButton = document.getElementById('sendImages');

imageSendButton.addEventListener('click', function() {
    const files = imageChooser.files;
    if (files.length === 0) {
        alert('Por favor, selecione pelo menos uma imagem para enviar.');
        return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }
    fetch('/upload', {
        method: 'POST',
        ContentType: 'multipart/form-data',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Imagens enviadas com sucesso!');
            imageChooser.value = '';
        } else {
            alert('Erro ao enviar imagens.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao enviar imagens.');
    });
});

const musicChooser = document.getElementById('music');

musicChooser.addEventListener('change', function() {
    if (this.files.length > 1) {
        alert('Voce pode selecionar apenas uma musica');
        this.value = '';
    }
});

const musicSendButton = document.getElementById('sendMusic');

musicSendButton.addEventListener('click', function() {
    if(!musicChooser.files.length) {
        alert('Por favor, selecione uma musica para enviar.');
        return;
    }

    const file = musicChooser.files[0];
    if (file  && file.type !== 'audio/mpeg') {
        alert('Por favor, selecione apenas arquivos de música (MP3).');
        musicChooser.value = '';
        
        return;
    }

    const formData = new FormData();
    formData.append('music', file);
    fetch('/uploadMusic', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Musica enviada com sucesso!');
            musicChooser.value = '';
        } else {
            alert('Erro ao enviar musica.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao enviar musica.');
    });
});