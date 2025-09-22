import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ContactSection = () => {
  const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(3, 'Subject must be at least 3 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    // Honeypot: should remain empty
    website: z.string().max(0).optional().or(z.literal('')),
  });

  type ContactForm = z.infer<typeof contactSchema>;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values: ContactForm) => {
    setIsSubmitting(true);

    try {
      // Honeypot triggered
      if (values.website && values.website.length > 0) {
        // Pretend success to bots
        reset();
        toast({ title: "Message Sent!", description: "Thank you for your message. I'll get back to you soon!" });
        return;
      }

      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      }

      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      reset();
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err?.message ?? 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      content: "maatimark4@gmail.com",
      link: "mailto:maatimark4@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-secondary" />,
      title: "Phone",
      content: "0112909210",
      link: "tel:0112909210"
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      title: "Location",
      content: "Nairobi, Kenya",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      url: "https://github.com/kichwee",
      color: "hover:text-foreground"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn", 
      url: "https://linkedin.com/in/markmaati",
      color: "hover:text-blue-400"
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      name: "Twitter",
      url: "https://twitter.com/markmaati",
      color: "hover:text-sky-400"
    }
  ];

  return (
    <section id="contact" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold mb-8 gradient-text">Let's Connect</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-card rounded-lg flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${social.color} transition-colors p-3 hover:bg-primary/10 rounded-full`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info Card */}
            <Card className="card-futuristic mt-8">
            <h4 className="font-semibold mb-3 gradient-text">Available for Work</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I'm currently available for freelance projects and full-time opportunities. 
              Whether you need a full-stack developer, data scientist, or technical consultant, 
              I'd love to hear about your project.
            </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-scale-in">
            <Card className="card-futuristic">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden from users) */}
                <div className="hidden">
                  <label htmlFor="website">Website</label>
                  <Input id="website" type="text" autoComplete="off" tabIndex={-1} {...register('website')} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      {...register('name')}
                      required
                      className="bg-muted/50 border-border focus:border-primary"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      required
                      className="bg-muted/50 border-border focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    required
                    className="bg-muted/50 border-border focus:border-primary"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    required
                    className="bg-muted/50 border-border focus:border-primary resize-none"
                    placeholder="Tell me about your project or how we can work together..."
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-hero"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;