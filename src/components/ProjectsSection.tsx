import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const ProjectsSection = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Mock data for demonstration - Replace with actual GitHub API call
  const mockRepos: Repository[] = [
    {
      id: 1,
      name: "ai-powered-dashboard",
      description: "A comprehensive dashboard with AI-driven analytics and real-time data visualization",
      html_url: "https://github.com/user/ai-powered-dashboard",
      homepage: "https://dashboard-demo.com",
      stargazers_count: 124,
      forks_count: 23,
      language: "TypeScript",
      topics: ["react", "typescript", "ai", "dashboard", "analytics"],
      updated_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "ml-data-pipeline",
      description: "Scalable machine learning pipeline for processing large datasets with automated model training",
      html_url: "https://github.com/user/ml-data-pipeline",
      homepage: "",
      stargazers_count: 89,
      forks_count: 15,
      language: "Python",
      topics: ["python", "machine-learning", "data-science", "pipeline", "tensorflow"],
      updated_at: "2024-01-10T14:20:00Z"
    },
    {
      id: 3,
      name: "modern-ecommerce-app",
      description: "Full-stack e-commerce application with payment integration and admin dashboard",
      html_url: "https://github.com/user/modern-ecommerce-app",
      homepage: "https://ecommerce-demo.com",
      stargazers_count: 67,
      forks_count: 12,
      language: "JavaScript",
      topics: ["react", "nodejs", "ecommerce", "stripe", "mongodb"],
      updated_at: "2024-01-08T09:15:00Z"
    },
    {
      id: 4,
      name: "blockchain-voting-system",
      description: "Decentralized voting system built on blockchain with smart contracts",
      html_url: "https://github.com/user/blockchain-voting-system",
      homepage: "",
      stargazers_count: 156,
      forks_count: 34,
      language: "Solidity",
      topics: ["blockchain", "solidity", "voting", "ethereum", "web3"],
      updated_at: "2024-01-05T16:45:00Z"
    },
    {
      id: 5,
      name: "react-component-library",
      description: "Modern React component library with TypeScript and Storybook documentation",
      html_url: "https://github.com/user/react-component-library",
      homepage: "https://components-demo.com",
      stargazers_count: 203,
      forks_count: 41,
      language: "TypeScript",
      topics: ["react", "typescript", "components", "storybook", "ui-library"],
      updated_at: "2024-01-03T11:30:00Z"
    },
    {
      id: 6,
      name: "api-microservices",
      description: "Microservices architecture with Docker, Kubernetes, and message queuing",
      html_url: "https://github.com/user/api-microservices",
      homepage: "",
      stargazers_count: 78,
      forks_count: 19,
      language: "Go",
      topics: ["golang", "microservices", "docker", "kubernetes", "api"],
      updated_at: "2024-01-01T08:20:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRepos = async () => {
      setLoading(true);
      // Replace this with actual GitHub API call:
      // const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=20');
      // const data = await response.json();
      
      setTimeout(() => {
        setRepos(mockRepos);
        setLoading(false);
      }, 1000);
    };

    fetchRepos();
  }, []);

  const displayedRepos = showAll ? repos : repos.slice(0, 6);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'text-blue-400',
      'JavaScript': 'text-yellow-400',
      'Python': 'text-green-400',
      'Solidity': 'text-purple-400',
      'Go': 'text-cyan-400',
    };
    return colors[language] || 'text-gray-400';
  };

  if (loading) {
    return (
      <section id="projects" className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-futuristic animate-pulse">
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded"></div>
                  <div className="h-6 w-16 bg-muted rounded"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects showcasing my expertise in full-stack development, 
            machine learning, and innovative technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedRepos.map((repo, index) => (
            <Card 
              key={repo.id} 
              className="card-futuristic group animate-slide-up hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-32 bg-gradient-secondary rounded-lg mb-4 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <Github className="h-12 w-12 text-foreground" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs px-2 py-1">
                    {topic}
                  </Badge>
                ))}
                {repo.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{repo.topics.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1 ${getLanguageColor(repo.language)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <Github size={14} className="mr-1" />
                  Code
                </Button>
                {repo.homepage && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(repo.homepage, '_blank')}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Live Demo
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {repos.length > 6 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="btn-outline-hero"
            >
              {showAll ? 'Show Less' : `View All Projects (${repos.length})`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;