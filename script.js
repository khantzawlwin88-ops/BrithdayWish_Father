// Intro Transition & Elegant Gold Confetti Effect
function openBirthdaySite() {
    confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#8C6D3F', '#6D4C41']
    });
    
    const cover = document.getElementById('cake-cover');
    const main = document.getElementById('main-content');
    
    cover.classList.add('opacity-0');
    setTimeout(() => {
        cover.classList.add('hidden');
        main.classList.remove('hidden');
        setTimeout(() => main.classList.remove('opacity-0'), 50);
    }, 1000);
}

let currentTrip = 1;
let currentPhotoIndex = 0;

function openGallery(tripNum) {
    currentTrip = tripNum;
    currentPhotoIndex = 0;
    document.getElementById('modal-title').innerText = `Trip Memory ${tripNum}`;
    updateModalPhoto();
    
    const thumbContainer = document.getElementById('thumbnail-container');
    thumbContainer.innerHTML = '';
    
    const startImgIndex = (tripNum - 1) * 10 + 1;
    
    for (let i = 0; i < 10; i++) {
        const imgNum = startImgIndex + i;
        const img = document.createElement('img');
        
        img.src = `${imgNum}.jpg`;
        img.onerror = function() {
            if (!this.src.includes('.jpeg')) {
                this.src = `${imgNum}.jpeg`;
            } else if (!this.src.includes('.png')) {
                this.src = `${imgNum}.png`;
            } else {
                this.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300`;
            }
        };

        img.className = `w-16 h-12 object-cover rounded-none cursor-pointer border-2 ${i === currentPhotoIndex ? 'border-[#C5A880]' : 'border-transparent opacity-60'}`;
        
        img.onclick = (function(index) {
            return function() {
                currentPhotoIndex = index;
                updateModalPhoto();
            };
        })(i);
        
        thumbContainer.appendChild(img);
    }
    
    document.getElementById('gallery-modal').classList.remove('hidden');
}

function updateModalPhoto() {
    const startImgIndex = (currentTrip - 1) * 10 + 1;
    const actualImgNum = startImgIndex + currentPhotoIndex;
    
    const mainImg = document.getElementById('modal-img');
    mainImg.src = `${actualImgNum}.jpg`;
    mainImg.onerror = function() {
        if (!this.src.includes('.jpeg')) {
            this.src = `${actualImgNum}.jpeg`;
        } else if (!this.src.includes('.png')) {
            this.src = `${actualImgNum}.png`;
        } else {
            this.src = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800`;
        }
    };
    
    const thumbs = document.getElementById('thumbnail-container').children;
    for (let i = 0; i < thumbs.length; i++) {
        if (i === currentPhotoIndex) {
            thumbs[i].classList.add('border-[#C5A880]');
            thumbs[i].classList.remove('border-transparent', 'opacity-60');
        } else {
            thumbs[i].classList.remove('border-[#C5A880]');
            thumbs[i].classList.add('border-transparent', 'opacity-60');
        }
    }
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + 10) % 10;
    updateModalPhoto();
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % 10;
    updateModalPhoto();
}

function closeGallery() {
    document.getElementById('gallery-modal').classList.add('hidden');
}

// Letter Modal Logic
function openLetterModal() {
    document.getElementById('letter-modal').classList.remove('hidden');
}
function closeLetterModal() {
    document.getElementById('letter-modal').classList.add('hidden');
}