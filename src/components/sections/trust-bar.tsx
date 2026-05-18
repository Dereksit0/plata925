import { useTranslations } from 'next-intl';
import { Award, Shield, Gem, MapPin } from 'lucide-react';

const ICONS = [Award, Shield, Gem, MapPin];
const ITEM_KEYS = [
  { title: 'item1Title', sub: 'item1Sub' },
  { title: 'item2Title', sub: 'item2Sub' },
  { title: 'item3Title', sub: 'item3Sub' },
  { title: 'item4Title', sub: 'item4Sub' },
] as const;

export default function TrustBar() {
  const t = useTranslations('trustBar');

  return (
    <section
      className="border-y border-[#E8E8E8] bg-white"
      aria-label="Certificaciones y sellos de calidad"
    >
      {/* Hologram shimmer line */}
      <div className="hologram-line h-0.5 w-full" aria-hidden="true" />

      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-6 md:px-8">
        <ul className="flex min-w-max items-center gap-8 md:min-w-0 md:justify-around">
          {ITEM_KEYS.map(({ title, sub }, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={title}
                className="flex items-center gap-3 text-center md:flex-col"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5F8] text-[#C0C0C0]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="text-left md:text-center">
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {t(title)}
                  </p>
                  <p className="text-xs text-[#6B6B6B]">{t(sub)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
