'use client';

import { useTranslations } from 'next-intl';
import { buildWaUrl } from '@/constants';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const url = buildWaUrl(t('defaultMessage'));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('floatingAriaLabel')}
      className="pulse-whatsapp fixed bottom-6 right-6 z-[9999] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#ED5082]"
    >
      <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
      <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">
        {t('floatingLabel')}
      </span>
    </a>
  );
}
