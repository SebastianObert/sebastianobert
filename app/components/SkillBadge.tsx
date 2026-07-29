"use client";

interface SkillBadgeProps {
  icon: string;
  name: string;
  category: string;
  clickedSkill: string | null;
  setClickedSkill: (skill: string | null) => void;
}

export default function SkillBadge({ icon, name, category, clickedSkill, setClickedSkill }: SkillBadgeProps) {
  const isClicked = clickedSkill === name;
  
  return (
    <div 
      data-skill-badge
      className="skill-pill relative group cursor-pointer"
      onClick={() => {
        if (window.innerWidth < 768) {
          setClickedSkill(isClicked ? null : name);
        }
      }}
    >
      <img src={icon} alt={name} className="w-6 h-6" />
      <span>{name}</span>
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-opacity duration-200 pointer-events-none ${
        isClicked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {category}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></div>
      </div>
    </div>
  );
}
