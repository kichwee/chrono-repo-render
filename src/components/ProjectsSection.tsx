import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

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
  const [showAll, setShowAll] = useState(false);

  const { data: repos = [], isLoading, isError } = useQuery<Repository[]>({
    queryKey: ['github-repos', 'kichwee'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/users/kichwee/repos?per_page=100&sort=updated',
        {
          headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const raw = await response.json();
      return (raw as any[]).map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? '',
        html_url: r.html_url,
        homepage: r.homepage ?? '',
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        language: r.language ?? 'Other',
        topics: Array.isArray(r.topics) ? r.topics : [],
        updated_at: r.updated_at,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });

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

  if (isLoading) {
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

  if (isError) {
    return (
      <section id="projects" className="section-container">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-6">Unable to load repositories from GitHub right now.</p>
          <Button variant="outline" onClick={() => window.location.reload()} className="btn-outline-hero">
            Retry
          </Button>
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