const images = [
    'public/big/1.png',
    'public/big/2.png',
    'public/big/3.png',
    'public/big/4.png',
    'public/big/5.png',
    'public/big/6.png',
    'public/big/7.png',
    'public/big/8.png',
    'public/big/9.png',
    'public/big/10.png',
    'public/big/11.png',
    'public/big/12.png',
    'public/big/13.png'
];

let currentIndex = 0;
let previousIndex = 0; 
const mainPanel = document.querySelector('.image-panel');
const loader = document.getElementById('imageLoader');

const imgPromises = images.map((src) => {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.src = src;
        img.style.display = 'none';
        img.onload = () => {
            img.style.display = 'block';
            resolve(img);
        };
        mainPanel.appendChild(img);
    });
});

Promise.all(imgPromises).then((loadedImages) => {

    loadedImages[0].classList.add('active', 'first'); 
    loader.style.display = 'none';

    setInterval(() => {
        loadedImages[0].classList.remove('first')
        changeImage(loadedImages);
    }, 6000); 
});

function changeImage(loadedImages) {
    const currentImage = loadedImages[previousIndex];
    const nextIndex = (previousIndex + 1) % loadedImages.length;
    const nextImage = loadedImages[nextIndex];

    currentImage.classList.add('exit');

    nextImage.classList.add('active'); 
    setTimeout(() => {
        currentImage.classList.remove('active', 'exit');

        if (previousIndex === 0) {
            currentImage.classList.remove('first');
        }

    }, 1000); 

    previousIndex = nextIndex; 
}

function loadContent(fileName) {
    const loading = document.getElementById('contentLoader');
    const contentDiv = document.getElementById('content');

    loading.style.display = 'flex';
    contentDiv.innerHTML = '';

    fetch(fileName)
    .then(response => response.text())
    .then(data => {
        contentDiv.innerHTML = data;
        loading.style.display = 'none';
    })
    .catch(error => {
        contentDiv.innerHTML = '<div class="group"><div class="panel"><p>Fetching error</p><img class="splash-img" src="public/images/error.png" alt="Error"><p>Try to check your internet connection</p></div></div>';
        loading.style.display = 'none';
    });
}

document.getElementById('content').addEventListener('click', function(event) {
    if (event.target.classList.contains('dropdown-button')) {
        const dropdown = event.target.parentElement;
        dropdown.classList.toggle('active');
    }
})

const radioButtons = document.querySelectorAll('input[name="tabs"]');
radioButtons.forEach(radio => {
    radio.addEventListener('click', function() {
        loadContent(this.value);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('input[name="tabs"]:checked');
    if (defaultTab) {
        loadContent(defaultTab.value);
    }
});

function openTab(tabId) {
    const radioToSelect = document.querySelector(`input[name="tabs"][id="${tabId}"]`);
    if (radioToSelect) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            radioToSelect.checked = true; 
            loadContent(radioToSelect.value); 
        }, 100);
    }
}

const dropdownButtons = document.querySelectorAll('.dropdown-button');

dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {

        const dropdown = button.parentElement;

        dropdown.classList.toggle('active');
    });
});