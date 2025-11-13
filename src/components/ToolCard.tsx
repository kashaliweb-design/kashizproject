import React from 'react';
import { Link } from 'react-router-dom';
import { Divide as LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  gradient: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon: Icon, link, gradient }) => {
  return (
    <Link to={link}>
      <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-black/30 transition-all duration-300 group hover:scale-105">
        <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-gradient-to-r ${gradient} mb-3 sm:mb-4`}>
          <Icon className="text-white" size={20} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ToolCard;