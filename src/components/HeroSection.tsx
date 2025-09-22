import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterEffect from './TypewriterEffect';

const HeroSection = () => {
  const roles = [
    "Software Developer",
    "Data Scientist", 
    "Full-Stack Engineer",
    "ML Engineer",
    "Problem Solver"
  ];

  return (
    <section id="hero" className="section-container bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-glow-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Mark</span>
            <br />
            <span className="text-foreground">Maati</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground mb-4 h-8">
            <TypewriterEffect words={roles} className="gradient-text font-semibold" />
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Passionate about building intelligent, scalable systems that solve real-world problems through innovative technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="btn-hero group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>View My Work</span>
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" className="btn-outline-hero" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            <a 
              href="https://github.com/kichwee" 
              className="text-muted-foreground hover:text-primary transition-colors p-3 hover:bg-primary/10 rounded-full"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/markmaati" 
              className="text-muted-foreground hover:text-secondary transition-colors p-3 hover:bg-secondary/10 rounded-full"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:maatimark4@gmail.com" 
              className="text-muted-foreground hover:text-accent transition-colors p-3 hover:bg-accent/10 rounded-full"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted-foreground h-6 w-6" />
      </div>
    </section>
  );
};

export default HeroSection;