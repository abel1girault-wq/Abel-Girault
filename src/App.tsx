/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Menu, X, Filter, Sparkles, User, Globe, LayoutGrid, Layers } from 'lucide-react';

// --- Constants & Types ---

const CATEGORIES = ['All', 'Architecture', 'Nature', 'Experimental', 'Editorial', 'Portrait'];

interface DiscoveryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  author: string;
}

const ITEMS: DiscoveryItem[] = [
  { id: '1', title: 'Monolithic Dreams', category: 'Architecture', author: 'Elena Vance', imageUrl: 'https://picsum.photos/seed/arch1/800/1200' },
  { id: '2', title: 'Abstract Horizon', category: 'Experimental', author: 'Julian Koss', imageUrl: 'https://picsum.photos/seed/exp1/800/800' },
  { id: '3', title: 'The Gaze', category: 'Portrait', author: 'Sarah Drasner', imageUrl: 'https://picsum.photos/seed/port1/800/1000' },
  { id: '4', title: 'Mossy Cascades', category: 'Nature', author: 'Markus Spiske', imageUrl: 'https://picsum.photos/seed/nat1/800/1200' },
  { id: '5', title: 'Brutalist Echo', category: 'Architecture', author: 'Elena Vance', imageUrl: 'https://picsum.photos/seed/arch2/800/900' },
  { id: '6', title: 'Chromesthesia', category: 'Editorial', author: 'Julian Koss', imageUrl: 'https://picsum.photos/seed/ed1/800/1100' },
  { id: '7', title: 'Verdant Silence', category: 'Nature', author: 'Markus Spiske', imageUrl: 'https://picsum.photos/seed/nat2/800/800' },
  { id: '8', title: 'Shadow Play', category: 'Experimental', author: 'Sarah Drasner', imageUrl: 'https://picsum.photos/seed/exp2/1200/800' },
  { id: '9', title: 'Alpine Peak', category: 'Nature', author: 'Markus Spiske', imageUrl: 'https://picsum.photos/seed/nat3/800/1200' },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 mix-blend-difference overflow-hidden">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2"
    >
      <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      <span className="font-display text-xl font-semibold tracking-tighter uppercase">Lumina</span>
    </motion.div>
    
    <div className="hidden md:flex items-center gap-12 font-display text-[10px] uppercase tracking-widest text-white/70">
      <a href="#" className="hover:text-white transition-colors">Discover</a>
      <a href="#" className="hover:text-white transition-colors">Editorial</a>
      <a href="#" className="hover:text-white transition-colors">Archive</a>
      <a href="#" className="hover:text-white transition-colors">About</a>
    </div>

    <div className="flex items-center gap-6">
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <Search size={18} />
      </button>
      <button className="hidden md:block px-5 py-2 glass rounded-full text-[10px] uppercase font-semibold tracking-widest hover:bg-white hover:text-black transition-all">
        Sign In
      </button>
      <button className="md:hidden">
        <Menu size={24} />
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen flex flex-col justify-end px-8 pb-24 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/hero/1920/1080?blur=4" 
        className="w-full h-full object-cover opacity-40 scale-105"
        referrerPolicy="no-referrer"
        alt="Hero Background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-4xl">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="px-3 py-1 glass rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold">
          Featured Editorial
        </span>
        <span className="text-[10px] text-white/40 uppercase tracking-widest">
          Spring Issue 2026
        </span>
      </motion.div>

      <motion.h1 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', damping: 20 }}
        className="font-display text-7xl md:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase mb-12"
      >
        Visionaryists <br />
        <span className="opacity-40 italic font-thin">Unseen</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-8"
      >
        <p className="max-w-xs text-sm text-white/60 leading-relaxed font-light">
          Architecture is a language. Each texture, each shadow tells the story of human ambition carved into the void.
        </p>
        <button className="flex items-center justify-center w-20 h-20 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all group overflow-hidden relative">
          <ArrowRight className="group-hover:translate-x-12 absolute transition-transform" />
          <ArrowRight className="-translate-x-12 group-hover:translate-x-0 absolute transition-transform" />
        </button>
      </motion.div>
    </div>

    <div className="absolute right-8 bottom-24 hidden lg:flex flex-col gap-12 items-end">
      <div className="flex flex-col gap-1 items-end">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Coordinates</span>
        <span className="font-mono text-xs">48.8566° N, 2.3522° E</span>
      </div>
      <div className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  </section>
);

const GalleryCard: FC<{ item: DiscoveryItem; onClick: () => void; index: number }> = ({ item, onClick, index }) => {
  const spans = useMemo(() => {
    const s = [
      'md:col-span-2 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-2',
      'md:col-span-2 md:row-span-2',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-2 md:row-span-1',
      'md:col-span-1 md:row-span-1',
      'md:col-span-1 md:row-span-1',
    ];
    return s[index % s.length];
  }, [index]);

  return (
    <motion.div
      layoutId={item.id}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bento-card group cursor-pointer relative overflow-hidden ${spans}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-end">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-accent mb-2">{item.category}</span>
        <h3 className="font-display font-bold text-2xl tracking-tight text-white mb-4 group-hover:text-glow transition-all">{item.title}</h3>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] text-brand-text-dim uppercase tracking-widest font-semibold">{item.author}</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ active, onChange }: { active: string; onChange: (s: string) => void }) => (
  <div className="sticky top-20 z-40 px-8 py-8 flex items-center justify-between glass mb-12 rounded-2xl mx-8 backdrop-blur-3xl shadow-2xl">
    <div className="flex items-center gap-8">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative text-[10px] uppercase font-bold tracking-[0.2em] transition-colors ${active === cat ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
        >
          {cat}
          {active === cat && (
            <motion.div 
              layoutId="activeFilter"
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full"
            />
          )}
        </button>
      ))}
    </div>
    
    <div className="flex items-center gap-4 text-white/30">
      <LayoutGrid size={16} className={active === 'All' ? 'text-white' : ''} />
      <div className="h-4 w-px bg-white/10" />
      <Layers size={16} />
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<DiscoveryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return ITEMS;
    return ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-brand-bg select-none">
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="max-w-[1600px] mx-auto pb-32">
          <FilterBar active={selectedCategory} onChange={setSelectedCategory} />
          
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4 px-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="border-t border-brand-border py-24 px-8 mt-24">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-brand-text">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-brand-accent flex items-center justify-center">
                <div className="w-1 h-1 bg-brand-accent rounded-full animate-pulse" />
              </div>
              <span className="font-display font-bold text-lg hover:text-brand-accent transition-all cursor-crosshair tracking-widest uppercase">Lumina</span>
            </div>
            <p className="max-w-xs text-xs text-brand-text-dim leading-loose uppercase tracking-wider">
              A curated space for the visual curious. Explore the unseen contours of our world through the lens of dedicated masters.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div className="flex flex-col gap-4 uppercase text-[10px] tracking-widest font-bold">
              <span className="text-brand-text-dim/40">Social</span>
              <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Behance</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Twitter</a>
            </div>
            <div className="flex flex-col gap-4 uppercase text-[10px] tracking-widest font-bold">
              <span className="text-brand-text-dim/40">Legal</span>
              <a href="#" className="hover:text-brand-accent transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-accent transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto mt-24 flex items-center justify-between text-[8px] uppercase tracking-[0.4em] text-brand-text-dim/30 font-bold">
          <span>© 2026 LUMINA ARCHIVE</span>
          <span className="hidden md:block">BENTO GRID EDITION</span>
          <span>EST. MCMLXXXVI</span>
          <span>CURATED IN PARIS</span>
        </div>
      </footer>

      {/* --- Detail Overlay --- */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-brand-bg/90 backdrop-blur-3xl z-[60] cursor-zoom-out"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-8">
              <motion.div
                layoutId={selectedItem.id}
                className="bg-brand-card border border-brand-border w-full max-w-5xl h-full max-h-[80vh] rounded-[32px] overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row"
              >
                <div className="md:w-3/5 h-1/2 md:h-full bg-black overflow-hidden relative">
                  <img 
                    src={selectedItem.imageUrl} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    alt={selectedItem.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-card/20 to-transparent" />
                </div>
                <div className="flex-1 p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-12">
                      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-accent">{selectedItem.category}</span>
                      <button 
                        onClick={() => setSelectedItem(null)}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <h2 className="font-display text-5xl font-bold tracking-tighter uppercase mb-6">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <User size={14} className="text-brand-text-dim" />
                      </div>
                      <span className="text-xs font-semibold tracking-widest uppercase">{selectedItem.author}</span>
                    </div>
                    <p className="text-sm text-brand-text-dim leading-relaxed max-w-md">
                      This piece explores the intersection of brutalist architecture and organic light. Part of the 2026 Spring Collection, it marks a significant evolution in the artist's exploration of void and volume.
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex-1 py-4 bg-brand-accent text-white text-[10px] uppercase font-bold tracking-[0.2em] rounded-full hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2">
                       Collect Artwork <Sparkles size={14} />
                    </button>
                    <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                      <Globe size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
