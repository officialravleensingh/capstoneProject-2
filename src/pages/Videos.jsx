import { useState} from "react";
import { NavBar } from "./NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const mockVideos = [
  {
    id: 1,
    title: "Learn React in 10 Minutes",
    videoUrl: "https://www.youtube.com/embed/4YU6Im91vtA",
    thumbnail: "https://img.youtube.com/vi/4YU6Im91vtA/hqdefault.jpg",
    duration: "10:32",
  },
  {
    id: 2,
    title: "JavaScript Crash Course",
    videoUrl: "https://www.youtube.com/embed/RD6coqkLU80",
    thumbnail: "https://img.youtube.com/vi/RD6coqkLU80/hqdefault.jpg",
    duration: "15:45",
  },
  {
    id: 3,
    title: "React Basics Tutorial",
    videoUrl: "https://www.youtube.com/embed/zW9RLTPtuTo",
    thumbnail: "https://img.youtube.com/vi/zW9RLTPtuTo/hqdefault.jpg",
    duration: "12:20",
  },
  {
    id: 4,
    title: "Next.js Full Course",
    videoUrl: "https://www.youtube.com/embed/6830yxIJUEk",
    thumbnail: "https://img.youtube.com/vi/6830yxIJUEk/hqdefault.jpg",
    duration: "45:30",
  },
  {
    id: 5,
    title: "HTML + CSS for Beginners",
    videoUrl: "https://www.youtube.com/embed/_bCKiNb9XTg",
    thumbnail: "https://img.youtube.com/vi/_bCKiNb9XTg/hqdefault.jpg",
    duration: "25:15",
  },
  {
    id: 6,
    title: "Node.js Crash Course",
    videoUrl: "https://www.youtube.com/embed/hVue6E2Zf8A",
    thumbnail: "https://img.youtube.com/vi/hVue6E2Zf8A/hqdefault.jpg",
    duration: "30:45",
  }
];

export default function Videos({ toggleTheme, isDarkMode }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredVideos = mockVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="flex-1 py-8 container">
        {selectedVideo ? (
          <div className="space-y-6">
            <button onClick={() => setSelectedVideo(null)} className="text-sm font-medium hover:underline">← Back to videos</button>
            <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
            <div className="aspect-video w-full max-w-4xl">
              <iframe
                className="w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-muted-foreground text-sm">Duration: {selectedVideo.duration}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-2">Course Library</h1>
            <p className="text-muted-foreground text-xl mb-6">Select a video to start learning.</p>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-4">All Videos</h2>
              {filteredVideos.length === 0 ? (
                <p className="text-muted-foreground">No videos found matching your search.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="cursor-pointer overflow-hidden" onClick={() => setSelectedVideo(video)}>
                      <div className="relative aspect-video">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="rounded bg-white/90 px-4 py-2 text-primary font-semibold text-sm">Play</div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{video.duration}</div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{video.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}