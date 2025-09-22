import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Code, Database, Brain, Zap } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    'React', 'TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'MongoDB',
    'Machine Learning', 'TensorFlow', 'Docker', 'AWS', 'Git', 'Tailwind CSS'
  ];

  const highlights = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Full-Stack Development",
      description: "Building modern web applications with React, Node.js, and cloud technologies."
    },
    {
      icon: <Database className="h-8 w-8 text-secondary" />,
      title: "Data Engineering",
      description: "Designing scalable data pipelines and analytics solutions for business insights."
    },
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "Machine Learning",
      description: "Developing intelligent systems using TensorFlow and advanced ML algorithms."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and exceptional user experience."
    }
  ];

  return (
    <section id="about" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate software developer and data scientist with expertise in building 
            intelligent, scalable systems. I love turning complex problems into elegant solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image Placeholder */}
          <div className="animate-scale-in">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-card border border-border/50 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-primary rounded-xl opacity-20"></div>
              </div>
              <div className="absolute inset-0 rounded-2xl glow-primary"></div>
            </div>
          </div>

          {/* About Content */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold mb-6 gradient-text">My Journey</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              As Mark Maati, I bring together software development and data science expertise to create 
              intelligent solutions. I've worked on diverse projects from AI-powered applications 
              to large-scale data processing systems that drive business value.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I thrive on continuous learning and staying ahead of technology trends. When I'm not 
              coding, you'll find me exploring new frameworks, contributing to open source projects, 
              or mentoring fellow developers in the community.
            </p>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card 
              key={highlight.title} 
              className="card-futuristic text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                {highlight.icon}
              </div>
              <h4 className="font-semibold mb-2">{highlight.title}</h4>
              <p className="text-sm text-muted-foreground">{highlight.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;