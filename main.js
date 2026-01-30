import { API_URL, IMAGES } from './config.js';

const loading = document.getElementById('loading');
const toast = document.getElementById('toast');

function showLoading(show) {
    if (loading) loading.style.display = show ? 'flex' : 'none';
}

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

async function vote(imageName, pointChange) {
    if (API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || !API_URL) {
        showToast('⚠️ Please set the API_URL in config.js');
        return;
    }

    console.log(`[DEBUG] Voting for "${imageName}" (${pointChange})...`);
    showLoading(true);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ imageName, pointChange }),
            mode: 'no-cors',
            redirect: 'follow'
        });

        console.log('[DEBUG] Vote request sent. Status is opaque (no-cors mode), but redirect 302 is normal.');
        showToast(`Vote submitted (+${pointChange})`);

        // Auto-refresh results if we are on the results page
        if (window.location.pathname.includes('results')) {
            setTimeout(renderResults, 2000);
        }
    } catch (error) {
        console.error('[DEBUG] Vote failed!', error);
        showToast('Failed to vote. See browser console.');
    } finally {
        showLoading(false);
    }
}

async function fetchResults() {
    console.log('[DEBUG] Starting fetchResults...');
    console.log('[DEBUG] API_URL:', API_URL);

    if (API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || !API_URL) {
        console.warn('[DEBUG] API_URL not set.');
        return IMAGES.map(img => ({ ...img, points: 0 }));
    }

    showLoading(true);
    try {
        const url = new URL(API_URL);
        url.searchParams.set('_t', Date.now());
        console.log('[DEBUG] Final Request URL:', url.toString());

        const response = await fetch(url);
        console.log('[DEBUG] Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`Google Script returned error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[DEBUG] Data Received:', data);
        return data;
    } catch (error) {
        console.error('[DEBUG] CRITICAL ERROR:', error);
        showToast('Connection failed! See Console (F12) for details.');
        return IMAGES.map(img => ({ ...img, points: 0 }));
    } finally {
        showLoading(false);
    }
}

function renderGallery() {
    const container = document.getElementById('gallery');
    if (!container) return;

    const baseUrl = import.meta.env.BASE_URL || './';

    container.innerHTML = IMAGES.map(img => {
        const imgSrc = img.src.startsWith('http') ? img.src : `${baseUrl}${img.src}`;
        return `
    <div class="image-card">
      <div class="image-container">
        <img src="${imgSrc}" alt="${img.name}">
      </div>
      <div class="image-info">
        <h3 class="image-title">${img.name}</h3>
        <div class="vote-controls">
          <button class="btn btn-up" onclick="window.vote('${img.name}', 10)">
            <span>👍</span> +10
          </button>
          <button class="btn btn-down" onclick="window.vote('${img.name}', -5)">
            <span>👎</span> -5
          </button>
        </div>
      </div>
    </div>
  `}).join('');
}

async function renderResults() {
    const container = document.getElementById('results-gallery');
    if (!container) return;

    const results = await fetchResults();
    // Get base URL and ensure it ends with a slash
    let baseUrl = import.meta.env.BASE_URL || './';
    if (!baseUrl.endsWith('/')) baseUrl += '/';

    // Find highest points
    const maxPoints = Math.max(...results.map(r => r.points));

    container.innerHTML = results.map((res, index) => {
        // Try to find image by name, fallback to index if name doesn't match
        let imgInfo = IMAGES.find(i => i.name === res.name);
        if (!imgInfo && IMAGES[index]) {
            imgInfo = IMAGES[index];
        }

        const isWinner = maxPoints > 0 && res.points === maxPoints;

        // Final fallback if still no image info
        const src = imgInfo && imgInfo.src ? imgInfo.src : '';
        const name = res.name || (imgInfo ? imgInfo.name : 'Unknown');

        let imgSrc = src;
        if (src && !src.startsWith('http')) {
            // Remove any leading slashes or dots from src to combine with baseUrl
            const cleanSrc = src.replace(/^(\.\/|\/)/, '');
            imgSrc = `${baseUrl}${cleanSrc}`;
        }

        return `
      <div class="image-card ${isWinner ? 'winner-frame' : ''}">
        <div class="image-container">
          <img src="${imgSrc}" alt="${name}" onerror="this.src='https://via.placeholder.com/400?text=Missing+Image'">
          ${isWinner ? '<span class="winner-tag">Переможець</span>' : ''}
        </div>
        <div class="image-info">
          <h3 class="image-title">${name}</h3>
          <div class="points-badge">${res.points} ВлаДіка-поінтів</div>
        </div>
      </div>
    `;
    }).join('');
}

// Expose vote to window for inline onclick
window.vote = vote;

// Init
const path = window.location.pathname;
if (path.includes('results.html') || path.endsWith('/results')) {
    renderResults();
} else {
    renderGallery();
}
