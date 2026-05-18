import { motion } from 'framer-motion';
import { Briefcase, Building } from 'lucide-react';

const experiences = [
  {
    role: 'Chief Financial Officer',
    company: 'Nexforz Ressync Pvt Ltd',
    duration: '2023 – 2025',
    desc: 'Led financial strategies and supported technical infrastructure scaling for an innovative tech startup.',
    achievements: ['Secured seed funding', 'Optimized cloud costs by 40%', 'Managed financial forecasting'],
    icon: Building
  },
  {
    role: 'Secretary',
    company: 'Cyber Aegis',
    duration: '2022 - Present',
    desc: 'Organizing tech events, hackathons, and fostering a community of developers and security enthusiasts.',
    achievements: ['Organized 10+ hackathons', 'Grew community to 500+ members', 'Conducted workshops on Flutter & AI'],
    icon: Briefcase
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title text-text-primary mb-2">Experience & Leadership</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-0 pl-8 space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-4 top-6 w-8 h-8 rounded-full glass-card border border-primary-accent/50 flex items-center justify-center bg-surface group-hover:scale-110 group-hover:border-primary-accent transition-transform z-10">
                <exp.icon size={14} className="text-primary-accent" />
              </div>

              <div className="glass-card p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-text-primary">{exp.role}</h3>
                    <p className="text-primary-accent font-medium text-lg">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-text-secondary whitespace-nowrap self-start">
                    {exp.duration}
                  </span>
                </div>
                
                <p className="text-text-secondary font-body mb-6">
                  {exp.desc}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary/70">Key Achievements</h4>
                  <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                    {exp.achievements.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
