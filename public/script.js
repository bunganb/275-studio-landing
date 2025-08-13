// Game and content data
let gameData = {}

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json")
    gameData = await response.json()
    return gameData
  } catch (error) {
    console.error("Error loading data:", error)
    // Fallback data if JSON fails to load
    return getDefaultData()
  }
}

// Default data fallback
function getDefaultData() {
  return {
    games: [
      {
        id: "pixel-quest",
        title: "Pixel Quest Adventures",
        category: "RPG",
        description: "An immersive RPG experience built with cutting-edge web technologies",
        longDescription:
          "Embark on an epic journey through mystical realms filled with ancient magic, dangerous creatures, and legendary treasures.",
        color: "bg-studio-orange",
        featured: true,
        releaseDate: "March 15, 2024",
        platform: "Web Browser (HTML5)",
        languages: "English, Spanish, French, German",
        ageRating: "Teen (13+)",
        fileSize: "~150 MB",
        players: "Single Player",
        links: {
          itchio: "https://example.com/pixel-quest",
          newgrounds: "https://example.com/pixel-quest-ng",
        },
        features: [
          {
            title: "Epic Story Campaign",
            description:
              "Experience a rich narrative spanning 40+ hours of gameplay with multiple branching storylines and meaningful character choices.",
          },
          {
            title: "Dynamic Combat System",
            description:
              "Master a tactical turn-based combat system with elemental magic, combo attacks, and strategic positioning.",
          },
          {
            title: "Character Progression",
            description:
              "Customize your party with 6 unique character classes, skill trees, and hundreds of equipment combinations.",
          },
          {
            title: "Exploration & Secrets",
            description:
              "Discover hidden dungeons, solve ancient puzzles, and uncover legendary artifacts in a vast open world.",
          },
        ],
        developer: {
          name: "Alex Chen",
          title: "Lead Game Developer",
          bio: "Passionate indie developer with 8+ years of experience creating immersive web-based gaming experiences.",
          email: "hello@gamedev.com",
          github: "github.com/alexchen-gamedev",
          twitter: "@alexchen_dev",
          portfolio: "alexchen-gamedev.dev",
        },
      },
      {
        id: "racing-thunder",
        title: "Racing Thunder",
        category: "Racing",
        description: "High-speed racing with realistic physics and stunning visual effects.",
        color: "bg-studio-orange",
      },
      {
        id: "battle-arena",
        title: "Battle Arena",
        category: "Strategy",
        description: "Strategic multiplayer battles with real-time combat mechanics.",
        color: "bg-studio-blue",
      },
      {
        id: "mystic-realms",
        title: "Mystic Realms",
        category: "Adventure",
        description: "Explore magical worlds filled with ancient mysteries and hidden treasures.",
        color: "bg-studio-orange",
      },
    ],
    team: [
      {
        name: "Sarah Chen",
        role: "Creative Director",
        initials: "SC",
        bio: "Visionary leader with over 10 years of experience in game design and creative direction.",
        color: "bg-studio-orange",
      },
      {
        name: "Marcus Rodriguez",
        role: "Lead Developer",
        initials: "MR",
        bio: "Full-stack engineer specializing in web technologies and game engine development.",
        color: "bg-studio-blue",
      },
      {
        name: "Emily Watson",
        role: "UI/UX Designer",
        initials: "EW",
        bio: "Award-winning designer with expertise in user experience and interface design.",
        color: "bg-studio-orange",
      },
      {
        name: "David Kim",
        role: "Technical Artist",
        initials: "DK",
        bio: "Innovative gameplay designer with focus on player engagement and game mechanics.",
        color: "bg-studio-blue",
      },
    ],
  }
}

// Initialize the website
document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData()

  if (document.getElementById("games-grid")) {
    loadGames(data.games)
  }

  if (document.getElementById("team-grid")) {
    loadTeam(data.team)
  }

  setupMobileMenu()
  setupSmoothScrolling()
})

// Load games into the grid
function loadGames(games) {
  const gamesGrid = document.getElementById("games-grid")
  if (!gamesGrid) return

  const gameCards = games
    .filter((game) => !game.featured)
    .map(
      (game) => `
        <div class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div class="${game.color} h-32 flex items-center justify-center">
                <h3 class="text-white font-bold text-lg">${game.title}</h3>
            </div>
            <div class="p-6">
                <div class="text-studio-orange text-sm font-semibold mb-2">${game.category}</div>
                <h4 class="font-bold text-studio-blue mb-2">${game.title}</h4>
                <p class="text-gray-600 text-sm mb-4">${game.description}</p>
                <!-- Added Play Game button to each game card -->
                <div class="flex gap-2">
                    <button class="bg-studio-blue text-white px-4 py-2 rounded text-sm hover:bg-studio-blue/90 transition-colors flex-1" onclick="openGameDetail('${game.id}')">
                        Play Game
                    </button>
                    <button class="bg-studio-orange text-white px-4 py-2 rounded text-sm hover:bg-studio-orange/90 transition-colors" onclick="openGameDetail('${game.id}')">
                        Details
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  gamesGrid.innerHTML = gameCards
}

// Load team members
function loadTeam(team) {
  const teamGrid = document.getElementById("team-grid")
  if (!teamGrid) return

  const teamCards = team
    .map(
      (member) => `
        <div class="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 ${member.color} rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-white font-bold text-lg">${member.initials}</span>
            </div>
            <h4 class="font-bold text-studio-blue mb-1">${member.name}</h4>
            <p class="text-studio-orange text-sm font-semibold mb-3">${member.role}</p>
            <p class="text-gray-600 text-sm">${member.bio}</p>
        </div>
    `,
    )
    .join("")

  teamGrid.innerHTML = teamCards
}

// Open game detail page
function openGameDetail(gameId) {
  window.location.href = `game-detail.html?game=${gameId}`
}

// Load game detail page content
async function loadGameDetail(gameId) {
  const data = await loadData()
  const game = data.games.find((g) => g.id === gameId)

  if (!game) {
    // Redirect to main page if game not found
    window.location.href = "index.html"
    return
  }

  // Update page title
  document.title = `${game.title} - 275 Studio`
  const pageTitle = document.getElementById("page-title")
  if (pageTitle) pageTitle.textContent = `${game.title} - 275 Studio`

  // Update game title and description
  const titleElement = document.getElementById("game-title")
  const descriptionElement = document.getElementById("game-description")
  const categoryElement = document.getElementById("game-category")

  if (titleElement) titleElement.textContent = game.title
  if (descriptionElement) descriptionElement.textContent = game.longDescription || game.description
  if (categoryElement) categoryElement.textContent = game.category

  // Update play buttons
  const playItchioBtn = document.getElementById("play-itchio")
  const playNewgroundsBtn = document.getElementById("play-newgrounds")

  if (playItchioBtn && game.links?.itchio) {
    playItchioBtn.onclick = () => window.open(game.links.itchio, "_blank")
  }
  if (playNewgroundsBtn && game.links?.newgrounds) {
    playNewgroundsBtn.onclick = () => window.open(game.links.newgrounds, "_blank")
  }

  // Load game features
  if (game.features) {
    const featuresContainer = document.getElementById("game-features")
    if (featuresContainer) {
      featuresContainer.innerHTML = game.features
        .map(
          (feature) => `
                <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-studio-orange rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                        <h4 class="text-white font-semibold mb-1">${feature.title}</h4>
                        <p class="text-white/80 text-sm">${feature.description}</p>
                    </div>
                </div>
            `,
        )
        .join("")
    }
  }

  // Load game information
  const gameInfoContainer = document.getElementById("game-info")
  if (gameInfoContainer && game.releaseDate) {
    gameInfoContainer.innerHTML = `
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">Release Date</span>
                <span class="text-studio-blue/80">${game.releaseDate}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">Platform</span>
                <span class="text-studio-blue/80">${game.platform}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">Languages</span>
                <span class="text-studio-blue/80">${game.languages}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">File Size</span>
                <span class="text-studio-blue/80">${game.fileSize}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">Age Rating</span>
                <span class="text-studio-blue/80">${game.ageRating}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-studio-blue font-semibold">Players</span>
                <span class="text-studio-blue/80">${game.players}</span>
            </div>
        `
  }

  // Load developer information
  if (game.developer) {
    const dev = game.developer
    const nameElement = document.getElementById("developer-name")
    const titleElement = document.getElementById("developer-title")
    const bioElement = document.getElementById("developer-bio")
    const linksContainer = document.getElementById("developer-links")

    if (nameElement) nameElement.textContent = dev.name
    if (titleElement) titleElement.textContent = dev.title
    if (bioElement) bioElement.textContent = dev.bio

    if (linksContainer) {
      linksContainer.innerHTML = `
                <div class="flex items-center space-x-3 bg-studio-blue/50 rounded p-3">
                    <div class="w-8 h-8 bg-studio-orange rounded flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">@</span>
                    </div>
                    <div class="text-left">
                        <div class="text-white text-sm font-semibold">Email</div>
                        <div class="text-white/80 text-xs">${dev.email}</div>
                    </div>
                </div>
                <div class="flex items-center space-x-3 bg-studio-blue/50 rounded p-3">
                    <div class="w-8 h-8 bg-studio-orange rounded flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">G</span>
                    </div>
                    <div class="text-left">
                        <div class="text-white text-sm font-semibold">GitHub</div>
                        <div class="text-white/80 text-xs">${dev.github}</div>
                    </div>
                </div>
                <div class="flex items-center space-x-3 bg-studio-blue/50 rounded p-3">
                    <div class="w-8 h-8 bg-studio-orange rounded flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">T</span>
                    </div>
                    <div class="text-left">
                        <div class="text-white text-sm font-semibold">Twitter</div>
                        <div class="text-white/80 text-xs">${dev.twitter}</div>
                    </div>
                </div>
                <div class="flex items-center space-x-3 bg-studio-blue/50 rounded p-3">
                    <div class="w-8 h-8 bg-studio-orange rounded flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">P</span>
                    </div>
                    <div class="text-left">
                        <div class="text-white text-sm font-semibold">Portfolio</div>
                        <div class="text-white/80 text-xs">${dev.portfolio}</div>
                    </div>
                </div>
            `
    }
  }
}

// Setup mobile menu
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      // Mobile menu functionality can be added here
      console.log("Mobile menu clicked")
    })
  }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Search functionality (can be extended)
function searchGames(query) {
  // Implementation for game search
  console.log("Searching for:", query)
}

// Filter games by category
function filterGamesByCategory(category) {
  // Implementation for category filtering
  console.log("Filtering by category:", category)
}

