
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SocialLink {
  name: string;
  icon: JSX.Element;
  url: string;
}

const Contact: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // For a real app, this should be stored securely
  const correctPassword = "portfolio123";
  
  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      url: 'mailto:contact@johndeveloper.com'
    },
    {
      name: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      ),
      url: 'https://github.com/johndeveloper'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      url: 'https://linkedin.com/in/johndeveloper'
    },
    {
      name: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      url: 'https://instagram.com/johndeveloper'
    },
    {
      name: 'Facebook',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      url: 'https://facebook.com/johndeveloper'
    }
  ];
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };
  
  return (
    <section id="contact" className="section-container">
      <h2 className="section-title">Get in Touch</h2>
      
      <div className="glass-card p-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Connect With Me</h3>
            <p className="text-white/70 mb-6">
              Feel free to reach out for collaborations, opportunities, or just to say hello!
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-dark-300 hover:bg-dark-200 px-4 py-2 rounded-lg transition-all hover:scale-105"
                >
                  <span className="text-primary">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
            
            {/* Portfolio admin authentication */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-blue-purple hover:opacity-90 text-white">
                  Portfolio Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-300 border-white/10 text-white">
                {!isAuthenticated ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <h3 className="text-xl font-bold">Admin Access</h3>
                    <p className="text-white/70">Enter password to make changes to your portfolio</p>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark-400 border border-white/10 rounded-md px-4 py-2"
                        placeholder="Enter admin password"
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-blue-purple hover:opacity-90 text-white">
                      Log In
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Admin Panel</h3>
                    <p className="text-white/70">You're now logged in as admin. You can now:</p>
                    <ul className="list-disc list-inside space-y-2 text-white/70">
                      <li>Add new achievements</li>
                      <li>Update skills</li>
                      <li>Edit portfolio information</li>
                    </ul>
                    <Button 
                      onClick={() => setIsAuthenticated(false)}
                      className="w-full bg-dark-400 hover:bg-dark-200 text-white border border-white/10"
                    >
                      Log Out
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-blue-purple rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-blue-purple rounded-full opacity-20 blur-xl"></div>
            <div className="relative z-10 p-6 bg-dark-400/50 backdrop-blur-sm rounded-xl border border-white/5">
              <h3 className="text-xl font-bold mb-4">Quick Message</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-dark-300 border border-white/10 rounded-md px-4 py-2"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-dark-300 border border-white/10 rounded-md px-4 py-2"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full bg-dark-300 border border-white/10 rounded-md px-4 py-2 resize-none"
                ></textarea>
                <Button className="w-full bg-gradient-blue-purple hover:opacity-90 text-white">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
