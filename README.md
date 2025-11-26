# Music Hub - Next.js Music Streaming Application

A modern, responsive music streaming application built with Next.js 16, React 19, and Tailwind CSS v4. Discover trending songs, explore top charts, search for your favorite tracks, and enjoy seamless music playback with a beautiful, mobile-first UI.

## 🚀 Features

### Core Features

-   **Discover Page**: Browse recently played songs and top charts
-   **Trending Music**: Explore the hottest trending songs
-   **New Music Streaming**: Discover the latest music releases
-   **Search**: Search for songs, artists, and music with real-time results
-   **Music Player**: Global music player with play/pause, progress control, and volume adjustment
-   **Song Details**: View detailed information about each song including:
    -   Song statistics (views, favorites, comments, duration)
    -   Related songs by the same artist
    -   Comments section
    -   YouTube MV integration
-   **Responsive Design**: Fully responsive UI optimized for mobile, tablet, and desktop

### Technical Features

-   **Server Components**: Optimized rendering with Next.js Server Components
-   **Suspense Boundaries**: Loading states with skeleton components
-   **Cache Components**: Next.js 16 Cache Components for optimal performance
-   **SEO Optimized**:
    -   Dynamic metadata, Open Graph, and Twitter Cards
    -   Automatic `robots.txt` generation
    -   Dynamic `sitemap.xml` with all song pages
-   **TypeScript**: Full type safety throughout the application
-   **Modern UI**: Glassmorphism effects, smooth animations, and gradient backgrounds

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16.0.4](https://nextjs.org/) (App Router)
-   **React**: 19.2.0
-   **TypeScript**: 5.x
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Package Manager**: pnpm
-   **React Compiler**: Enabled for automatic optimizations

## 📦 Installation

### Prerequisites

-   Node.js 18+
-   pnpm (or npm/yarn/bun)

### Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd nextjs
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

3. **Run the development server**

    ```bash
    pnpm dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
nextjs/
├── app/
│   ├── [slug]/              # Dynamic song detail pages
│   │   ├── components/      # Song detail components
│   │   └── lib/            # Song detail utilities
│   ├── components/          # Shared components
│   │   ├── MainLayout.tsx   # Main layout with sidebar
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── MusicPlayer.tsx  # Global music player
│   │   ├── SearchBar.tsx    # Search bar with dropdown
│   │   ├── RecentlyPlayed.tsx
│   │   └── TopCharts.tsx
│   ├── music/               # Music library page
│   ├── trending/            # Trending music page
│   ├── streaming/           # New music streaming page
│   ├── search/              # Search results page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Discover page (home)
├── lib/
│   ├── api.ts               # API utility functions
│   ├── search-api.ts        # Search API with cache
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── public/                  # Static assets
```

## 🌐 API Integration

The application integrates with the Kaito Music API:

**Base URL**: `https://v2-api-kaito-music.vercel.app/api`

### Available Endpoints

-   `GET /music/trending` - Get trending songs
-   `GET /music/favorite` - Get favorite songs
-   `GET /music/new-music` - Get new music releases
-   `GET /music/top-views` - Get top viewed songs
-   `GET /music/top-favorite` - Get top favorite songs
-   `GET /search` - Search songs, artists, categories
-   `GET /music/get-music-name` - Get music by name
-   `GET /music/get-singer-name` - Get songs by singer name

### API Parameters

-   `_limit`: Number of results (default: 20)
-   `_page`: Page number (default: 1)
-   `_type`: "million" or "billion" (for top views/favorite)
-   `query`: Search query string
-   `_name`: Music name filter
-   `_singer`: Singer name filter

## 🎨 UI Components

### Pages

-   **Discover** (`/`): Main landing page with recently played and top charts
-   **Trending** (`/trending`): Trending music grid
-   **Streaming** (`/streaming`): New music releases
-   **Search** (`/search`): Search results page
-   **Music Library** (`/music`): Full music library
-   **Song Detail** (`/[slug]`): Individual song detail page

### Key Components

-   **MainLayout**: Responsive layout with collapsible sidebar
-   **MusicPlayer**: Global bottom player bar
-   **SearchBar**: Real-time search with dropdown results
-   **SongCard**: Reusable song card component
-   **PlayButton**: Play/pause button with player integration

## 📱 Responsive Design

The application is fully responsive with breakpoints:

-   **Mobile**: < 640px
-   **Tablet**: 640px - 1024px
-   **Desktop**: > 1024px

### Mobile Features

-   Hamburger menu for navigation
-   Slide-in sidebar
-   Compact music player
-   Touch-optimized controls
-   Horizontal scrolling for song lists

## 🚀 Build & Deploy

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🔧 Configuration

### Next.js Config (`next.config.ts`)

-   Cache Components enabled
-   React Compiler enabled
-   Image optimization with remote patterns

### Environment Variables

Optional environment variables:

-   `NEXT_PUBLIC_BASE_URL`: Base URL for your site (used in sitemap and robots.txt)
    -   Default: `https://nextjs-music.vercel.app/`
    -   Example: `https://music-hub.vercel.app`

Set this in production for proper SEO:

```bash
NEXT_PUBLIC_BASE_URL=https://nextjs-music.vercel.app/
```

API endpoints are configured in `lib/api.ts`.

## 📝 Features in Detail

### Music Player

-   Play/pause functionality
-   Progress bar with seek control
-   Volume control with mute
-   Next/previous song navigation
-   Shuffle and repeat modes
-   Song information display
-   Responsive mobile layout

### Search

-   Real-time search with debouncing
-   Dropdown results preview
-   Full search results page
-   Search by song name, artist, or category

### Song Details

-   Complete song information
-   Statistics (views, favorites, comments)
-   Related songs by artist
-   Comments section
-   YouTube MV integration
-   SEO optimized metadata

## 🎯 Performance Optimizations

-   **Server Components**: Reduced client-side JavaScript
-   **Suspense Boundaries**: Progressive loading with skeletons
-   **Cache Components**: Optimized data fetching
-   **Image Optimization**: Next.js Image component with proper sizing
-   **Code Splitting**: Automatic code splitting by Next.js
-   **Static Generation**: Pre-rendered pages where possible
-   **Sitemap Generation**: Dynamic sitemap with automatic song page inclusion
-   **Robots.txt**: Automatic robots.txt generation for search engine optimization

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and React
