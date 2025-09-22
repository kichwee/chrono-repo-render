import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold gradient-text mb-2">Mark Maati</h3>
            <p className="text-muted-foreground">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/kichwee" 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/markmaati" 
              className="text-muted-foreground hover:text-secondary transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:maatimark4@gmail.com" 
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center">
            © {currentYear} Mark Maati. Made with 
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;