import { X, Check, Zap, Shield, Users } from 'lucide-react'

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const tiers = [
    {
      name: 'Free Plan',
      price: 'Rp 0',
      period: 'selamanya',
      description: 'Cocok untuk pelajar dan pencoba awal',
      features: ['5 Eksekusi Sandbox / hari', 'Katalog 40+ Library', 'Dataset Max 50MB', 'Komunitas Script Publik'],
      isCurrent: true,
      buttonText: 'Paket Saat Ini',
      popular: false,
    },
    {
      name: 'Pro Developer',
      price: 'Rp 99.000',
      period: 'per bulan',
      description: 'Untuk praktisi GIS & Data Scientist profesional',
      features: ['Unlimited Eksekusi Sandbox', 'AI Code Assistant Penuh', 'Dataset Max 2GB (Spatial Cloud)', 'Mode Visual 3D Elevation', 'Ekspor Map High-Res'],
      isCurrent: false,
      buttonText: 'Upgrade ke Pro',
      popular: true,
    },
    {
      name: 'Team Workspace',
      price: 'Rp 299.000',
      period: 'per bulan',
      description: 'Untuk tim konsultan & instansi geospasial',
      features: ['Semua Fitur Pro', '5 Seat Anggota Tim', 'Private Collaborative Workspace', 'Dedicated Docker Runner Container', 'Dukungan Prioritas 24/7'],
      isCurrent: false,
      buttonText: 'Mulai Team Trial',
      popular: false,
    },
  ]

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-dark-surface rounded-2xl border border-earth-200 dark:border-dark-border shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-earth-400 hover:text-earth-700 dark:hover:text-dark-text hover:bg-earth-100 dark:hover:bg-dark-border transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-dark-accent/20 dark:text-dark-accent text-xs font-semibold mb-2">
            <Zap size={14} /> Upgrade Langganan PyGeospatial
          </div>
          <h2 className="text-2xl font-bold text-earth-900 dark:text-dark-text">
            Tingkatkan Produktivitas Analisis Geospasial Kamu
          </h2>
          <p className="text-xs text-earth-500 dark:text-dark-accent/60 mt-1">
            Buka batas eksekusi sandbox, akses AI Assistant penuh, dan nikmati penyimpanan data spasial cloud tanpa batas.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                tier.popular
                  ? 'border-primary-500 dark:border-dark-accent bg-gradient-to-b from-primary-50/50 to-transparent dark:from-dark-accent/10 shadow-lg scale-105'
                  : 'border-earth-200 dark:border-dark-border bg-white dark:bg-dark-bg/40'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary-600 text-white dark:bg-dark-accent dark:text-dark-bg text-[10px] font-bold shadow-md">
                  Paling Populer
                </span>
              )}

              <div>
                <h3 className="text-base font-bold text-earth-900 dark:text-dark-text">{tier.name}</h3>
                <p className="text-[11px] text-earth-500 dark:text-dark-accent/60 mt-0.5">{tier.description}</p>

                <div className="my-4">
                  <span className="text-2xl font-extrabold text-earth-900 dark:text-dark-text">{tier.price}</span>
                  <span className="text-xs text-earth-400 dark:text-dark-accent/50"> /{tier.period}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-earth-700 dark:text-dark-accent/80">
                      <Check size={14} className="text-primary-600 dark:text-dark-accent flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={tier.isCurrent}
                onClick={onClose}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                  tier.isCurrent
                    ? 'bg-earth-100 text-earth-400 dark:bg-dark-border dark:text-dark-accent/40 cursor-not-allowed'
                    : tier.popular
                    ? 'btn-primary shadow-md hover:scale-102'
                    : 'btn-secondary'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
