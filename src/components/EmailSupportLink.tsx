"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { Mail } from 'lucide-react';

interface Props {
  className?: string;
  showIcon?: boolean;
}

export default function EmailSupportLink({ className, showIcon = false }: Props) {
  const { t, language } = useLanguage();

  const defaultClassName = "text-emerald-500 hover:text-emerald-400 underline font-medium inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0";
  
  // URL untuk membuka Gmail web composer
  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=amatama.inc@gmail.com";

  return (
    <a 
      href={gmailUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className || defaultClassName}
      title="amatama.inc@gmail.com"
    >
      {showIcon && <Mail size={16} className="text-emerald-500" />}
      {showIcon ? t('emailSupport') : 'Email Support'}
    </a>
  );
}
