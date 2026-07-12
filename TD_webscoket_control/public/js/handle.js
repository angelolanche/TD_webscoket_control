const imageChooser = document.getElementById('images');
const musicChooser = document.getElementById('music');
const filesSendButton = document.getElementById('sendFiles');

imageChooser.addEventListener('change', function() {
    if (this.files.length > 5) {
        alert('Você pode selecionar no máximo 5 imagens.');
        this.value = '';
    }
});

musicChooser.addEventListener('change', function() {
    if (this.files.length > 1) {
        alert('Voce pode selecionar apenas uma musica');
        this.value = '';
    }
});

filesSendButton.addEventListener('click', function() {
    const images = imageChooser.files;
    const music = musicChooser.files;

    if (images.length === 0) {
        alert('Por favor, selecione pelo menos uma imagem para enviar.');
        return;
    }
    
    if(music.length === 0) {
        alert('Por favor, selecione uma musica para enviar.');
        return;
    }

    for (let i = 0; i < images.length; i++) {
        if (!images[i].type.startsWith('image/jpeg') && !images[i].type.startsWith('image/jpg')) {
            alert('Por favor, selecione apenas arquivos de imagem (JPEG).');
            imageChooser.value = '';
            return;
        }
    }
    
    if (music[0]  && music[0].type !== 'audio/mpeg') {
        alert('Por favor, selecione apenas arquivos de música (MP3).');
        musicChooser.value = '';
        
        return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    formData.append('music', music[0]);
    
    fetch('/uploadFiles', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Arquivos enviados com sucesso!');
            imageChooser.value = '';
            musicChooser.value = '';
        } else {
            alert('Erro ao enviar arquivos.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erro ao enviar arquivos.');
    });
});

presentationType.addEventListener('change', (event) => {
    if(event.target.value === '3') {
        console.log('event: sim')
        document.getElementById('file_upload_section').classList.add('show_content');
        
        return
    }
    console.log('event: ', event.target.value)
    document.getElementById('file_upload_section').classList.remove('show_content');
});