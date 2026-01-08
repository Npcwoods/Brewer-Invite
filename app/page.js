'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Gift, Copy, Share2, Check, ExternalLink } from 'lucide-react';
import { Inter, Playfair_Display, Great_Vibes } from 'next/font/google';

// --- FONTS ---
const sans = Inter({ subsets: ['latin'] });
const serif = Playfair_Display({ subsets: ['latin'] });
const script = Great_Vibes({ weight: '400', subsets: ['latin'] });

// --- ✏️ EDIT YOUR EVENT DETAILS HERE ---
const DATA = {
  hostName: "Megan Woods",
  guestOfHonor: "Megan Woods",
  eventTitle: "Baby Shower",
  date: "Saturday, February 28, 2026",
  time: "11:00 AM ET",
  locationName: "Union County Community Center",
  address: "129 Union Co Rec Rd, Blairsville, GA 30512",
  // Properly encoded Google Maps Link
  mapLink: "https://www.google.com/maps/search/?api=1&query=Union+County+Community+Center+129+Union+Co+Rec+Rd+Blairsville+GA+30512",
  registryLink: "https://my.babylist.com/babybrewwoods",
  inviteMessage: "Please join us as we celebrate the upcoming arrival of our little one. We are beyond excited to share this special day with you and can’t wait to see you there! Mailed invitations to follow! 🥰",
  rsvpEmail: "meganwoods@example.com", // Fallback for RSVP
  shareText: "You’re invited to Megan Woods’ Baby Shower! 💙 Tap to open the invite: "
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle Envelope Open
  const handleOpen = () => {
    setIsOpen(true);
    // Trigger Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#bfdbfe', '#93c5fd', '#ffffff'] // Baby blue & white
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#bfdbfe', '#93c5fd', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Delay showing scrollable details to allow animation to finish
    setTimeout(() => setShowDetails(true), 1500);
  };

  return (
    <main className={`min-h-screen bg-denim flex flex-col items-center overflow-x-hidden ${!showDetails ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* --- HERO / ENVELOPE SECTION --- */}
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-4">
        
        <div className="relative w-full max-w-md perspective-1000">
          {/* Instructions Wrapper - Fades out on open */}
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-16 left-0 right-0 text-center z-50 pointer-events-none"
          >
            <p className={`${sans.className} text-slate-600 font-medium tracking-widest uppercase text-sm`}>
              You received an invite
            </p>
          </motion.div>

          {/* THE ENVELOPE ASSEMBLY */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            
            {/* 1. The Card (Slides Up) */}
            <motion.div
              className="absolute w-[90%] bg-white shadow-xl rounded-sm overflow-hidden flex flex-col items-center text-center p-6 border border-slate-100"
              initial={{ y: 0, scale: 0.95, rotate: 0 }}
              animate={isOpen ? { y: -150, scale: 1, rotate: 0, zIndex: 30 } : {}}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
            >
              {/* Card Ribbon Visual */}
              <div className="absolute top-0 right-8 w-8 h-full bg-blue-100/50 border-x border-blue-200/50"></div>
              
              <div className="relative z-10 w-full h-full flex flex-col justify-between min-h-[350px]">
                <div className="space-y-1 mt-4">
                   <p className={`${sans.className} text-xs tracking-[0.2em] text-slate-400 uppercase`}>Join Us For A</p>
                   <h1 className={`${script.className} text-6xl text-blue-400 leading-tight py-2`}>{DATA.eventTitle}</h1>
                   <p className={`${sans.className} text-xs tracking-[0.2em] text-slate-400 uppercase`}>Celebrating</p>
                </div>
                
                <div className="py-4 border-y border-dashed border-blue-200 my-2">
                  <h2 className={`${serif.className} text-3xl text-slate-700 tracking-wide`}>{DATA.guestOfHonor}</h2>
                </div>

                <div className="space-y-1 mb-4">
                  <p className={`${serif.className} text-slate-500`}>{DATA.date}</p>
                  <p className={`${serif.className} text-slate-500`}>At {DATA.time}</p>
                </div>
              </div>
            </motion.div>

            {/* 2. Envelope Back (Static) */}
            <div className="absolute inset-0 bg-blue-200 rounded-b-lg shadow-2xl z-0" style={{ transform: 'translateY(10%)' }}></div>
            
            {/* 3. Envelope Front (Pocket) */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-blue-100 z-20 rounded-b-lg shadow-inner border-t border-blue-200"
                 style={{ clipPath: "polygon(0 0, 50% 20%, 100% 0, 100% 100%, 0 100%)", transform: 'translateY(10%)' }}>
            </div>
            
            {/* 4. Envelope Flap (Animates Open) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[50%] bg-blue-200 z-20 origin-top rounded-t-lg shadow-md flex items-end justify-center"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transform: 'translateY(10%)' }}
              initial={{ rotateX: 0 }}
              animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
               {/* Seal */}
               <div className="mb-8 w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center opacity-80">
                  <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white text-xs font-bold">MW</div>
               </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div 
            className="absolute -bottom-24 left-0 right-0 flex justify-center z-50"
            initial={{ opacity: 1, y: 0 }}
            animate={isOpen ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          >
            <button 
              onClick={handleOpen}
              className={`${sans.className} bg-slate-900 text-white px-8 py-4 rounded-full shadow-lg text-sm tracking-wide hover:scale-105 transition-transform uppercase font-semibold`}
            >
              Tap to Open
            </button>
          </motion.div>

          {/* Scroll Hint (Appears after open) */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={showDetails ? { opacity: 1 } : { opacity: 0 }}
             transition={{ delay: 1 }}
             className="absolute -bottom-32 left-0 right-0 flex justify-center animate-bounce text-slate-500"
          >
            <span className={`${sans.className} text-xs uppercase tracking-widest`}>Scroll for Details ↓</span>
          </motion.div>

        </div>
      </section>

      {/* --- EVENT DETAILS SECTION --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={showDetails ? { opacity: 1 } : { opacity: 0 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-sm min-h-screen rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-8 pb-20 -mt-10 z-40"
      >
        
        {/* Intro Message */}
        <div className="text-center space-y-4 mb-10 mt-4">
           <h3 className={`${serif.className} text-2xl text-slate-800`}>You're Invited!</h3>
           <p className={`${sans.className} text-slate-600 leading-relaxed font-light`}>
            {DATA.inviteMessage}
           </p>
        </div>

        {/* Details List */}
        <div className="space-y-6">
          
          <DetailRow icon={<Calendar className="w-5 h-5 text-blue-400" />} title="Date">
            {DATA.date}
          </DetailRow>

          <DetailRow icon={<Clock className="w-5 h-5 text-blue-400" />} title="Time">
            {DATA.time}
          </DetailRow>

          <DetailRow icon={<MapPin className="w-5 h-5 text-blue-400" />} title="Location">
            <span className="font-semibold block text-slate-800">{DATA.locationName}</span>
            <span className="text-slate-500 text-sm block mt-1">{DATA.address}</span>
            <a 
              href={DATA.mapLink}
              target="_blank"
              rel="noreferrer" 
              className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-blue-500 uppercase tracking-wide border border-blue-100 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Open in Maps <ExternalLink size={12} />
            </a>
          </DetailRow>

        </div>

        <Divider />

        {/* Registry Section */}
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-50 p-3 rounded-full">
              <Gift className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className={`${serif.className} text-xl text-slate-800`}>Gift Registry</h4>
            <p className="text-sm text-slate-500">Your presence is the greatest gift, but if you'd like to help us get ready...</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a 
              href={DATA.registryLink}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              View Baby Registry <ExternalLink size={16} />
            </a>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(DATA.registryLink)
                  .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  })
                  .catch((err) => {
                    console.error('Failed to copy to clipboard:', err);
                    alert('Failed to copy link. Please copy manually: ' + DATA.registryLink);
                  });
              }}
              className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
              {copied ? "Link Copied!" : "Copy Registry Link"}
            </button>
          </div>
        </div>

        <Divider />

        {/* RSVP & Share */}
        <div className="space-y-4">
          <h4 className={`${serif.className} text-center text-xl text-slate-800 mb-4`}>RSVP & Share</h4>
          
          <div className="grid grid-cols-2 gap-3">
             <a 
               href={`mailto:${DATA.rsvpEmail}?subject=RSVP for ${DATA.hostName}'s Baby Shower`}
               className="bg-blue-50 text-blue-600 py-3 rounded-xl text-sm font-bold text-center hover:bg-blue-100 transition-colors"
             >
               Email RSVP
             </a>
             <ShareButton text={DATA.shareText} />
          </div>
        </div>
        
        <footer className="mt-12 text-center text-slate-300 text-xs pb-4">
           Can't wait to see you there!
        </footer>

      </motion.div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function DetailRow({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {  return (
    <div className="flex gap-4 items-start">
      <div className="mt-1 p-2 bg-white shadow-sm border border-slate-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className={`${sans.className} text-xs font-bold uppercase tracking-wider text-slate-400 mb-1`}>{title}</h4>
        <div className={`${sans.className} text-slate-700`}>{children}</div>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-slate-100 my-8"></div>;
}

function ShareButton({ text }: { text: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Baby Shower Invite',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        alert('Failed to copy link. Please copy manually: ' + window.location.href);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-slate-100 text-slate-700 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
    >
      <Share2 size={16} /> Share Invite
    </button>
  );
}
