
// Portfolio data for category descriptions
const categoryIntros = {
    all: {
        title: "All Creative Work",
        description: "Explore a comprehensive collection of design projects spanning various mediums and industries. Each piece represents a unique challenge solved through creative thinking and strategic design."
    },
    print: {
        title: "Print Design",
        description: "From brochures to packaging, these print designs combine aesthetic appeal with functional communication. Each project showcases attention to detail and understanding of print production requirements."
    },
    logo: {
        title: "Logo & Branding",
        description: "Building memorable brand identities that resonate with target audiences. These projects demonstrate the power of strategic thinking combined with creative execution in brand development."
    },
    flyers: {
        title: "Flyers & Marketing",
        description: "Impactful marketing materials designed to capture attention and drive action. These projects balance creative flair with clear messaging to achieve marketing objectives."
    }
};

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const categoryIntro = document.getElementById('category-intro');

function updateCategoryIntro(category) {
    const intro = categoryIntros[category];
    categoryIntro.innerHTML = `
        <h2>${intro.title}</h2>
        <p>${intro.description}</p>
    `;
}

function filterPortfolio(category) {
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.classList.add('show');
            } else {
                item.style.display = 'none';
                item.classList.remove('show');
            }
        }, index * 50); // Staggered animation
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        updateCategoryIntro(filter);
        filterPortfolio(filter);
    });
});
