// Gallery App - Simple JavaScript
const categoryMap = {
    'zafaf': 'زفاف',
    'khotoba': 'خطوبة',
    'ketb-ketab': 'كتب كتاب',
    'sawariya': 'سوارية',
};

const categories = ['الكل', 'زفاف', 'خطوبة', 'كتب كتاب', 'سوارية'];

let allImages = [];
let filteredImages = [];
let currentViewerIndex = 0;
let isZoomed = false;

// Load manifest and initialize
async function init() {
    try {
        // Try to use embedded manifest first (for file:// protocol)
        let manifest = window.GALLERY_MANIFEST;
        
        // If not embedded, try to fetch (for http:// protocol)
        if (!manifest) {
            const response = await fetch('gallery-manifest.json');
            manifest = await response.json();
        }
        
        // Generate images array
        allImages = [];
        let idCounter = 0;
        
        for (const [folderName, files] of Object.entries(manifest)) {
            const category = categoryMap[folderName];
            if (!category) continue;
            
            files.forEach((filePath, index) => {
                const fileName = filePath.split('/').pop() || '';
                const alt = `${category} - ${fileName.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '')}`;
                
                allImages.push({
                    id: `${folderName}-${idCounter++}`,
                    src: filePath,
                    alt,
                    category,
                    featured: index === 0,
                });
            });
        }
        
        filteredImages = allImages;
        renderFilters();
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery:', error);
        document.getElementById('gallery').innerHTML = '<p>خطأ في تحميل الصور</p>';
    }
}

// Render category filters
function renderFilters() {
    const filtersContainer = document.getElementById('filters');
    filtersContainer.innerHTML = categories.map(cat => 
        `<button class="filter-btn ${cat === 'الكل' ? 'active' : ''}" 
                onclick="filterCategory('${cat}')">${cat}</button>`
    ).join('');
}

// Filter images by category
function filterCategory(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter images
    if (category === 'الكل') {
        filteredImages = allImages;
    } else {
        filteredImages = allImages.filter(img => img.category === category);
    }
    
    renderGallery();
}

// Render gallery grid
function renderGallery() {
    const galleryContainer = document.getElementById('gallery');
    
    if (filteredImages.length === 0) {
        galleryContainer.innerHTML = '<p>لا توجد صور في هذه الفئة</p>';
        return;
    }
    
    galleryContainer.innerHTML = filteredImages.map((img, index) => `
        <div class="gallery-item loading" onclick="openViewer(${index})">
            <img src="${img.src}" 
                 alt="${img.alt}" 
                 loading="lazy"
                 onload="this.parentElement.classList.remove('loading')"
                 onerror="this.src='data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'1000\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'32\' fill=\'%236b7280\'%3EPlaceholder%3C/text%3E%3C/svg%3E'">
        </div>
    `).join('');
}

// Open full screen viewer
function openViewer(index) {
    currentViewerIndex = index;
    isZoomed = false;
    const viewer = document.getElementById('viewer');
    const img = document.getElementById('viewer-img');
    
    img.src = filteredImages[index].src;
    img.alt = filteredImages[index].alt;
    img.style.transform = 'scale(1)';
    document.getElementById('zoomBtn').textContent = 'تكبير';
    
    viewer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close viewer
function closeViewer() {
    document.getElementById('viewer').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate to previous image
function prevImage() {
    currentViewerIndex = currentViewerIndex > 0 ? currentViewerIndex - 1 : filteredImages.length - 1;
    const img = document.getElementById('viewer-img');
    img.src = filteredImages[currentViewerIndex].src;
    img.alt = filteredImages[currentViewerIndex].alt;
    isZoomed = false;
    img.style.transform = 'scale(1)';
    document.getElementById('zoomBtn').textContent = 'تكبير';
}

// Navigate to next image
function nextImage() {
    currentViewerIndex = currentViewerIndex < filteredImages.length - 1 ? currentViewerIndex + 1 : 0;
    const img = document.getElementById('viewer-img');
    img.src = filteredImages[currentViewerIndex].src;
    img.alt = filteredImages[currentViewerIndex].alt;
    isZoomed = false;
    img.style.transform = 'scale(1)';
    document.getElementById('zoomBtn').textContent = 'تكبير';
}

// Toggle zoom
function toggleZoom() {
    isZoomed = !isZoomed;
    const img = document.getElementById('viewer-img');
    const btn = document.getElementById('zoomBtn');
    
    if (isZoomed) {
        img.style.transform = 'scale(2)';
        btn.textContent = 'تصغير';
    } else {
        img.style.transform = 'scale(1)';
        btn.textContent = 'تكبير';
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const viewer = document.getElementById('viewer');
    if (viewer.style.display === 'none') return;
    
    if (e.key === 'Escape') {
        closeViewer();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Initialize on load
init();

