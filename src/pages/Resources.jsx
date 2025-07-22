import { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const mockResources = [
  {
    id: "1",
    title: "Pomodoro Technique Cheat Sheet",
    description: "A quick reference guide to implementing the Pomodoro technique effectively.",
    fileType: "pdf",
    fileSize: "1.2 MB",
    url: "https://file-examples.com/storage/fe51b16b3a6848b0fa755ec/2017/10/file-example_PDF_500_kB.pdf"
  },
  {
    id: "2",
    title: "Weekly Planning Template",
    description: "Structured template for planning your week with Pomodoro sessions.",
    fileType: "pdf",
    fileSize: "842 KB",
    url: "https://file-examples.com/storage/fe51b16b3a6848b0fa755ec/2017/10/file-example_PDF_500_kB.pdf"
  },
  {
    id: "3",
    title: "Focus Habit Tracker",
    description: "Track your daily focus habits and productivity metrics.",
    fileType: "pdf",
    fileSize: "1.5 MB",
    url: "https://file-examples.com/storage/fe51b16b3a6848b0fa755ec/2017/10/file-example_PDF_500_kB.pdf"
  },
  {
    id: "4",
    title: "Distraction Management Guide",
    description: "Strategies for identifying and managing common distractions.",
    fileType: "pdf",
    fileSize: "2.1 MB",
    url: "https://file-examples.com/storage/fe51b16b3a6848b0fa755ec/2017/10/file-example_PDF_500_kB.pdf"
  },
  {
    id: "5",
    title: "Deep Work Session Planner",
    description: "Plan and schedule your deep work sessions for maximum effectiveness.",
    fileType: "pdf",
    fileSize: "1.8 MB",
    url: "https://file-examples.com/storage/fe51b16b3a6848b0fa755ec/2017/10/file-example_PDF_500_kB.pdf"
  }
];

const Resources = ({ toggleTheme, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredResources = mockResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="flex-1 py-8 container space-y-6">
        <div className="mb-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">Resources</h1>
          <p className="text-muted-foreground text-xl">Read or download our productivity guides and cheat sheets.</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search resources by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-4">
          {filteredResources.length === 0 ? (
            <p className="text-muted-foreground">No resources found matching your search.</p>
          ) : (
            filteredResources.map(resource => (
              <Card key={resource.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center p-4 gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{resource.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>{resource.fileType.toUpperCase()}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.fileSize}</span>
                      </div>
                    </div>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer"><Button>Open</Button></a>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Resources;