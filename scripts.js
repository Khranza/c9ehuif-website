// Lightbox
const lightboxEls = Array.from(document.querySelectorAll('.project_block img, .project_block video'));

lightboxEls.forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openLightbox(lightboxEls.indexOf(el)));
});

function openLightbox(index) {
    const existing = document.getElementById('lightbox-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.85);
        display: flex; align-items: center; justify-content: center;
        cursor: zoom-out;
        backdrop-filter: blur(6px);
    `;

    function showItem(i) {
        overlay.innerHTML = '';
        const el = lightboxEls[i];
        let clone;
        if (el.tagName === 'VIDEO') {
            clone = document.createElement('video');
            clone.src = el.currentSrc;
            clone.autoplay = true;
            clone.loop = true;
            clone.muted = true;
            clone.controls = true;
        } else {
            clone = document.createElement('img');
            clone.src = el.src;
        }
        clone.style.cssText = `
            max-width: 90vw; max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 0 60px rgba(0,0,0,0.8);
        `;
        overlay.appendChild(clone);
    }

    showItem(index);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
        overlay.remove();
        document.removeEventListener('keydown', onKey);
    });

    function onKey(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', onKey);
        }
        if (e.key === 'ArrowRight') index = (index + 1) % lightboxEls.length, showItem(index);
        if (e.key === 'ArrowLeft')  index = (index - 1 + lightboxEls.length) % lightboxEls.length, showItem(index);
    }

    document.addEventListener('keydown', onKey);
}

const grid = document.querySelector('.game_flexbox_grid');
const items = grid.querySelectorAll('.game_item');
const itemsPerRow = Math.floor(grid.offsetWidth / (items[0].offsetWidth + 20));
const remainder = items.length % itemsPerRow;
if (remainder !== 0) {
    for (let i = 0; i < itemsPerRow - remainder; i++) {
        const phantom = document.createElement('div');
        phantom.style.width = items[0].offsetWidth + 'px';
        phantom.style.visibility = 'hidden';
        grid.appendChild(phantom);
    }
}