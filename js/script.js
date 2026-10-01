const projects = [

    {
        title: "Ângulo e Enquadramento",
        author: "Luísa Vitoriano",
        category: "Aula 3",
        images: [
            "img/foto 1.jpeg",
            "img/foto 2.jpeg",
            "img/foto 3.jpeg",
            "img/foto 4.jpeg",
            "img/foto 5.jpeg",
            "img/foto 6.jpeg",
        ],
        description: "Fotos com ângulos e enquadramentos diferentes."
    },

    {
       title: "Dupla Exposição",
        author: "Luísa Vitoriano",
        category: "Aula 3",
        images: [
            "img/Dupla exposição.png",
    
        ],
        description: "É uma técnica fotográfica que consiste em sobrepor duas imagens, criando um lindo efeito artístico."
    },

    {
        title: "Motion Blur",
        author: "Luísa Vitoriano",
        category: "Arte Photoshop",
        images: [
            "img/Motion Blur.JPG",
        
        ],
        description: "É um efeito de rastro ou borrrão que aparece em objetos ou cenários quando movidos rapidamente."
    },

    {
        title: "Espelhos e Paisagens",
        author: "Luísa Vitoriano",
        category: "Revista Luísa Sonza",
        images: [
            "img/1.jpg",
            "img/2.jpg",
            "img/3.jpg",
            "img/4.jpg",
            "img/5.jpg",
        ],
        description: ""
    },

    {
        title: "Texturas",
        author: "Luísa Vitoriano",
        category: "",
        images: [
            "img/ft 3.jpg",
            "img/ft 2.jpg",
            "img/ft 1.jpg",
            "img/ft 4.jpg",
            "img/ft 5.jpg",
            "img/ft 6.jpg",
            "img/ft 7.jpg",
            "img/ft 8.jpg",
            "img/ft 9.jpg",
            "img/ft 10.jpg",
        ],
        description: ""
    },

    {
        title: "Light Paint",
        author: "Luísa Vitoriano",
        category: "Aplicativo Copa do Mundo",
        images: [
            "img/foto 1.jpg",
            "img/foto 2.jpg",
            "img/foto 3.jpg",
        ],
        description: "O obturador da câmera fica aberto po vários segunos, permitindo que a câmera registre o movimento da luz."
    },

    {
        title: " Colagem ",
        author: "Luísa Vitoriano",
        category: "",
        images: [
            "img/Photoshop.png",
        ],
        description: "Atividade de colagem com o que te representa."
    },

    {
        title: "Fotografia produto",
        author: "Luísa Vitoriano",
        category: "",
        images: [
            "img/Revista.png",
            "img/Folder.png",
        ],
        description: ""
    }

];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTag = document.getElementById('lightbox-tag');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let currentImageIndex = 0;

function renderGallery() {
    galleryGrid.innerHTML = '';

    projects.forEach((proj, index) => {
        const card = document.createElement('div');

        card.className = 'project-card';

        card.innerHTML = `
            <div class="thumbnail-container">
                <img 
                    src="${proj.images[0]}" 
                    alt="${proj.title}" 
                    class="project-thumbnail" 
                    loading="lazy"
                >
            </div>

            <div class="card-details">
                <span class="card-tag">
                    ${proj.category}
                </span>

                <h3 class="card-title">
                    ${proj.title}
                </h3>

                <p class="card-author">
                    Por ${proj.author}
                </p>
            </div>
        `;

        card.addEventListener('click', () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(card);
    });
}

function updateLightboxContent() {
    const proj = projects[currentIndex];

    lightboxImg.src = proj.images[currentImageIndex];
    lightboxImg.alt = proj.title;

    lightboxTag.textContent = proj.category;
    lightboxTitle.textContent = proj.title;

    lightboxAuthor.textContent =
        `Obra concebida por ${proj.author}`;

    lightboxDescription.textContent =
        proj.description;

    const currentFormatted =
        String(currentImageIndex + 1).padStart(2, '0');

    const totalFormatted =
        String(proj.images.length).padStart(2, '0');

    lightboxCounter.textContent =
        `${currentFormatted} / ${totalFormatted}`;
}

function openLightbox(index) {
    currentIndex = index;
    currentImageIndex = 0;

    updateLightboxContent();

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
}

function previousImage() {
    const proj = projects[currentIndex];

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = proj.images.length - 1;
    }

    updateLightboxContent();
}

function nextImage() {
    const proj = projects[currentIndex];

    currentImageIndex++;

    if (currentImageIndex >= proj.images.length) {
        currentImageIndex = 0;
    }

    updateLightboxContent();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', previousImage);
nextBtn.addEventListener('click', nextImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) {
        return;
    }

    if (e.key === 'Escape') {
        closeLightbox();
    }

    if (e.key === 'ArrowRight') {
        nextImage();
    }

    if (e.key === 'ArrowLeft') {
        previousImage();
    }
});

renderGallery();