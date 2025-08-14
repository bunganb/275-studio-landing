// Game and content data
let gameData = null; // Use null to indicate data hasn't been loaded yet

async function loadData() {
    if (gameData) {
        return gameData;
    }
    try {
        const response = await fetch("data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        gameData = await response.json();
        return gameData;
    } catch (error) {
        // Jika GAGAL, tampilkan pesan error di halaman dan hentikan proses.
        console.error("FATAL: Could not load data from data.json.", error);
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: sans-serif;">
                <h1>Oops! Something went wrong.</h1>
                <p>We couldn't load the necessary data to run the website.</p>
                <p>Please check the console for more details.</p>
            </div>`;
        return null; // Kembalikan null untuk menandakan kegagalan
    }
}

// Default data fallback
function getDefaultData() {
    
}

// Load games into the grid (for index.html)
function loadGames(games) {
    const gamesGrid = document.getElementById("games-grid");
    if (!gamesGrid) return;
    gamesGrid.innerHTML = games
        .filter((game) => !game.featured)
        .map( (game) => `
            <div class="bg-white rounded-lg font-candaraBold overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-4 border-[#FBB715]">
                <div class="bg-${game.color} h-32 flex items-center justify-center">
                    <h3 class="text-white font-bold text-lg">${game.title}</h3>
                </div>
                <div class="p-6 bg-studio-cream">
                    <div class="bg-${game.color} w-fit py-1 px-2 rounded">
                        <h3 class="text-${game.text || 'white'} font-bold text-sm">${game.category}</h3>
                    </div>
                    <h4 class="font-bold text-studio-blue mb-2">${game.title}</h4>
                    <p class="text-gray-600 text-sm mb-4">${game.description}</p>
                    <div>
                        <button class="text-studio-orange flex items-center gap-1 text-sm transition-colors flex-1" onclick="openGameDetail('${game.id}')">
                            Play Game 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M18.5 12.214a1 1 0 0 0-1-1H5a1 1 0 1 0 0 2h12.5a1 1 0 0 0 1-1" clip-rule="evenodd" /><path fill="currentColor" fill-rule="evenodd" d="M20 12.214a1 1 0 0 0-.293-.707l-4.5-4.5a1 1 0 1 0-1.414 1.414l3.793 3.793l-3.793 3.793a1 1 0 0 0 1.414 1.415l4.5-4.5a1 1 0 0 0 .293-.708" clip-rule="evenodd" /></svg>
                        </button>
                    </div>
                </div>
            </div>`
        ).join("");
}

// Load team members into the grid (for index.html)
function loadTeam(team) {
    const teamGrid = document.getElementById("team-grid");
    if (!teamGrid) return;
    teamGrid.innerHTML = team
        .map((member) => `
            <div class="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-16 h-16 bg-${member.color} rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span class="text-white font-bold text-lg">${member.initials}</span>
                </div>
                <h4 class="font-bold text-studio-blue mb-1">${member.name}</h4>
                <p class="text-studio-orange text-sm font-semibold mb-3">${member.role}</p>
                <p class="text-gray-600 text-sm">${member.bio}</p>
            </div>`
        ).join("");
}

// Open game detail page
function openGameDetail(gameId) {
    window.location.href = `game-detail.html?game=${gameId}`;
}

async function loadGameDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    if (!gameId) {
        // If no game ID in URL, maybe redirect or show an error
        console.error("No game ID provided in the URL.");
        return;
    }
    
    const data = await loadData();
    const game = data.games.find((g) => g.id === gameId);

    if (!game) {
        console.error("Game not found:", gameId);
        window.location.href = "index.html"; // Redirect if game not found
        return;
    }

    // --- NEW LOGIC: Find the developer using creatorId ---
    const developer = data.team.find((member) => member.id === game.creatorId);

    // Update page title
    document.title = `${game.title} - 275 Studio`;
    
    // Update simple text content
    const elementsToUpdate = {
        '#page-title': `${game.title} - 275 Studio`,
        '#game-title': game.title,
        '#game-description': game.longDescription || game.description,
        '#game-category': game.category,
        // --- UPDATED: Use the found developer object ---
        '#developer-name': developer?.name,
        '#developer-title': developer?.role, // Assuming role is the title
        '#developer-bio': developer?.bio,
    };

    for (const selector in elementsToUpdate) {
        const element = document.querySelector(selector);
        if (element && elementsToUpdate[selector]) {
            element.textContent = elementsToUpdate[selector];
        }
    }
    const screenshotContainer = document.getElementById("game-screenshots");

    if (screenshotContainer && game.screenshots) {
        let screenshots = Array.isArray(game.screenshots) ? game.screenshots : [game.screenshots];
        screenshotContainer.innerHTML = screenshots.map(src => `
          <div class="relative w-full h-full rounded-lg overflow-hidden">
              <img src="${src}" alt="${game.title} Screenshot"
                  class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-studio-blue/40 flex items-center justify-center">
                  <span class="text-white font-semibold text-lg">${game.title} Preview</span>
              </div>
          </div>
      `).join("");
    } else if (screenshotContainer) {
        screenshotContainer.innerHTML = '<p class="text-white/80">No screenshots available.</p>';
    }
    // Update play buttons
    const playItchioBtn = document.getElementById("play-itchio");
    if (playItchioBtn && game.links?.itchio) {
        playItchioBtn.style.display = 'block';
        playItchioBtn.onclick = () => window.open(game.links.itchio, "_blank");
    } else if (playItchioBtn) {
        playItchioBtn.style.display = 'none';
    }

    const playNewgroundsBtn = document.getElementById("play-newgrounds");
    if (playNewgroundsBtn && game.links?.newgrounds) {
        playNewgroundsBtn.style.display = 'block';
        playNewgroundsBtn.onclick = () => window.open(game.links.newgrounds, "_blank");
    } else if (playNewgroundsBtn) {
        playNewgroundsBtn.style.display = 'none';
    }

    // Load game features
    const featuresContainer = document.getElementById("game-features");
    if (featuresContainer && game.features?.length > 0) {
        featuresContainer.innerHTML = game.features.map(feature => `
            <div class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-studio-orange rounded-full mt-2 flex-shrink-0"></div>
                <div>
                    <h4 class="text-white font-semibold mb-1">${feature.title}</h4>
                    <p class="text-white/80 text-sm">${feature.description}</p>
                </div>
            </div>`).join("");
    } else if (featuresContainer) {
        featuresContainer.innerHTML = '<p class="text-white/80">No specific features listed for this game.</p>';
    }

    // Load game info table
    const gameInfoContainer = document.getElementById("game-info");
    const gameInfo = {
        "Release Date": game.releaseDate, "Platform": game.platform,
        "Age Rating": game.ageRating, "Players": game.players,
    };
    if (gameInfoContainer) {
        gameInfoContainer.innerHTML = Object.entries(gameInfo)
            .filter(([_, value]) => value) // Only show rows where a value exists
            .map(([key, value]) => `
                <div class="flex justify-between">
                    <span class="text-studio-blue font-semibold">${key}</span>
                    <span class="text-studio-blue/80">${value}</span>
                </div>`).join("");
    }
    
    // Load developer links
    const linksContainer = document.getElementById("developer-links");
    // --- UPDATED: Use the new developer object and its links ---
    const devLinks = {
      Email: { value: developer?.email, icon: "@" },
      GitHub: { value: developer?.github, icon: "G" },
      Instagram: { value: developer?.instagram, icon: "T" },
      Portfolio: { value: developer?.portfolio, icon: "P" },
    };
    if (linksContainer && developer) {
        linksContainer.innerHTML = Object.entries(devLinks)
            .filter(([_, link]) => link.value) // Only show links that exist
            .map(([label, link]) => `
            <div class="flex items-center space-x-3 bg-studio-blue/50 rounded p-3">
                <div class="w-8 h-8 bg-studio-orange rounded flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-xs">${link.icon}</span>
                </div>
                <div class="text-left">
                    <div class="text-white text-sm font-semibold">${label}</div>
                    <div class="text-white/80 text-xs">${link.value}</div>
                </div>
            </div>`).join("");
    } else if (linksContainer) {
        linksContainer.innerHTML = ''; // Clear if no developer info
    }
}
// Setup mobile menu (using the more complete version)
function setupMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    if (btn.dataset.initialized === "true") return;
    btn.dataset.initialized = "true";

    let isOpen = false;
    const setOpen = (open) => {
        isOpen = open;
        btn.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open.toString());
        menu.classList.toggle("show", open);
    };

    btn.addEventListener("click", () => setOpen(!isOpen));
    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

// Main initializer function that runs after the DOM is loaded
async function main() {
    // Panggil loadData di awal
    const data = await loadData();

    // JIKA data gagal dimuat (null), hentikan semua eksekusi.
    if (!data) return; 

    setupMobileMenu();
    setupSmoothScrolling();

    // Logic for index.html
    if (document.getElementById("games-grid")) {
        loadGames(data.games);
    }
    if (document.getElementById("team-grid")) {
        loadTeam(data.team);
    }

    // Logic for game-detail.html
    if (document.getElementById("game-title")) {
        loadGameDetail(); // fungsi ini akan memanggil loadData lagi, tapi akan langsung dapat dari cache
    }
}

// Run the main initializer
document.addEventListener("DOMContentLoaded", main);