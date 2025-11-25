"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { href: "/", label: "Discover", icon: "home" },
    { href: "/trending", label: "Trending", icon: "headphone" },
    { href: "/streaming", label: "Streaming", icon: "broadcast" },
];

const playlists = [
    { name: "Christmas Vibes", icon: "star" },
    { name: "Bob Marley Spe", icon: "music" },
    { name: "ACDC Live 2008", icon: "music" },
];

const bookmarks = [
    { title: "Oops!...I Did It Again", artist: "Britney Spears", image: "/placeholder.jpg" },
    { title: "Sorry seems to be the hardest word", artist: "Blue & Elton John", image: "/placeholder.jpg" },
    { title: "Birds", artist: "Imagine Dragons", image: "/placeholder.jpg" },
    { title: "Shape of my heart", artist: "Sting", image: "/placeholder.jpg" },
];

export default function Sidebar({ isOpen = true }: { isOpen?: boolean; onClose?: () => void }) {
    const pathname = usePathname();

    return (
        <div
            className={`w-64 bg-gray-900 h-screen flex flex-col fixed left-0 top-0 z-40 border-r border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* Top Menu */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-xs font-semibold ml-2">MENU</span>
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                {item.icon === "home" && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                )}
                                {item.icon === "headphone" && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.618 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.618l3.765-3.793a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {item.icon === "broadcast" && (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.05 4.05a7 7 0 119.9 9.9L10 18.9l-2.95-2.95a7 7 0 01-4.05-11.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Playlists */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                    <h3 className="text-gray-400 text-xs font-semibold mb-3">PLAYLISTS</h3>
                    <div className="space-y-1">
                        {playlists.map((playlist, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                </svg>
                                {playlist.icon === "star" && (
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )}
                                <span className="text-sm truncate flex-1">{playlist.name}</span>
                            </div>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 mt-3 text-green-400 hover:text-green-300 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        ADD PLAYLIST
                    </button>
                </div>

                {/* Bookmarks */}
                <div>
                    <h3 className="text-gray-400 text-xs font-semibold mb-3">BOOKMARKS</h3>
                    <div className="space-y-2">
                        {bookmarks.map((bookmark, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                            >
                                <div className="w-10 h-10 rounded bg-linear-to-br from-purple-500/30 to-pink-500/30 shrink-0 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{bookmark.title}</p>
                                    <p className="text-gray-400 text-xs truncate">{bookmark.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-2 py-2 mt-3 text-gray-400 hover:text-white transition-colors text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        LOAD MORE
                    </button>
                </div>
            </div>
        </div>
    );
}

