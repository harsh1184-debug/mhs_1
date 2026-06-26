import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ScrollReveal from '../components/ScrollReveal'
import ProductCard from '../components/ProductCard'
import { useRFQ } from '../components/RFQContext'
import { clinicalSpecialties, manufacturerBrands } from '../data/products'

const staticProducts = [
  // Critical Care & ICU
  {
    id: 'hamilton-c1',
    name: 'Hamilton C1 Ventilator',
    specialty: 'critical-care',
    brand: 'hamilton',
    description:
      'Compact, fully featured ICU ventilator with intelligent weaning protocols and high-flow oxygen therapy.',
    image: null,
    pdfUrl: '/docs/hamilton-c1.pdf',
  },
  {
    id: 'hamilton-c6',
    name: 'Hamilton C6 Ventilator',
    specialty: 'critical-care',
    brand: 'hamilton',
    description:
      'High-performance ventilator for adult to neonatal critical care with adaptive ventilation modes.',
    image: null,
    pdfUrl: '/docs/hamilton-c6.pdf',
  },
  {
    id: 'spacelabs-icgm',
    name: 'Spacelabs Xhibit Central Station',
    specialty: 'critical-care',
    brand: 'spacelabs',
    description:
      'Central monitoring system with multi-parameter telemetry for ICU environments.',
    image: null,
    pdfUrl: '/docs/spacelabs-xhibit.pdf',
  },

  // Radiology & Diagnostics
  {
    id: 'samsung-rs85',
    name: 'Samsung RS85 Prestige',
    specialty: 'radiology',
    brand: 'samsung',
    description:
      'Premium ultrasound system with S-Vue and Crystal Architecture for exceptional image clarity.',
    image: null,
    pdfUrl: '/docs/samsung-rs85.pdf',
  },
  {
    id: 'samsung-hs80',
    name: 'Samsung HS80',
    specialty: 'radiology',
    brand: 'samsung',
    description:
      'High-end ultrasound system with advanced 3D/4D imaging capabilities for comprehensive diagnostics.',
    image: null,
    pdfUrl: '/docs/samsung-hs80.pdf',
  },
  {
    id: 'samsung-gc85',
    name: 'Samsung GC85 Digital X-Ray',
    specialty: 'radiology',
    brand: 'samsung',
    description:
      'Digital radiography system with fast workflow, low dose, and high image quality.',
    image: null,
    pdfUrl: '/docs/samsung-gc85.pdf',
  },

  // Ward Infrastructure
  {
    id: 'linet-eleganza',
    name: 'Linet Eleganza 3 ICU Bed',
    specialty: 'ward-infrastructure',
    brand: 'linet',
    description:
      'Intelligent ICU bed with advanced pressure redistribution, weighing system, and Trendelenburg positioning.',
    image: null,
    pdfUrl: '/docs/linet-eleganza3.pdf',
  },
  {
    id: 'linet-axioma',
    name: 'Linet Axioma Ward Bed',
    specialty: 'ward-infrastructure',
    brand: 'linet',
    description:
      'Ergonomic general ward bed with smart monitoring and fall prevention features.',
    image: null,
    pdfUrl: '/docs/linet-axioma.pdf',
  },
  {
    id: 'linet-multicare',
    name: 'Linet Multicare ICU Bed',
    specialty: 'ward-infrastructure',
    brand: 'linet',
    description:
      'Versatile ICU bed with integrated patient monitoring and smart alarm systems.',
    image: null,
    pdfUrl: '/docs/linet-multicare.pdf',
  },

  // Patient Monitoring
  {
    id: 'spacelabs-icgm2',
    name: 'Spacelabs Xhibit Patient Monitor',
    specialty: 'patient-monitoring',
    brand: 'spacelabs',
    description:
      'Multi-parameter bedside monitor with intuitive touch interface and wireless connectivity.',
    image: null,
    pdfUrl: '/docs/spacelabs-monitor.pdf',
  },
  {
    id: 'spacelabs-telemetry',
    name: 'Spacelabs Telemetry System',
    specialty: 'patient-monitoring',
    brand: 'spacelabs',
    description:
      'Wireless telemetry system for continuous patient surveillance with alarm management.',
    image: null,
    pdfUrl: '/docs/spacelabs-telemetry.pdf',
  },
  {
    id: 'hamilton-m1',
    name: 'Hamilton M1 Patient Monitor',
    specialty: 'patient-monitoring',
    brand: 'hamilton',
    description:
      'Integrated patient monitoring system with ventilator synchronization and clinical decision support.',
    image: null,
    pdfUrl: '/docs/hamilton-m1.pdf',
  },
]

const brandIdMap = {
  'Hamilton Medical': 'hamilton',
  'Samsung Healthcare': 'samsung',
  'Linet': 'linet',
  'Spacelabs Healthcare': 'spacelabs',
}

const specialtyIdMap = {
  'Critical Care': 'critical-care',
  'Radiology': 'radiology',
  'Ward Infrastructure': 'ward-infrastructure',
  'Patient Monitoring': 'patient-monitoring',
}

const useProducts = () => {
  const stored = localStorage.getItem('mockProducts')
  const mockProducts = stored ? JSON.parse(stored) : []
  const merged = [
    ...staticProducts,
    ...mockProducts.map((p) => ({
      id: p.id,
      name: p.name,
      specialty: specialtyIdMap[p.category] || p.category,
      brand: brandIdMap[p.brand] || p.brand,
      description: p.description,
      image: p.imageUrls && p.imageUrls.length > 0 ? p.imageUrls[0] : null,
      pdfUrl: p.pdfUrl || '',
    })),
  ]
  return merged
}

export default function MedicalSolutions() {
  const [viewMode, setViewMode] = useState('specialty') // 'specialty' | 'brand'
  const [activeFilter, setActiveFilter] = useState('critical-care')
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems } = useRFQ()

  const filters = viewMode === 'specialty' ? clinicalSpecialties : manufacturerBrands
  const products = useProducts()

  const filteredProducts = useMemo(() => {
    const key = viewMode === 'specialty' ? 'specialty' : 'brand'
    return products.filter((p) => p[key] === activeFilter)
  }, [viewMode, activeFilter, products])

  const activeFilterObj = filters.find((f) => f.id === activeFilter)

  const getBrandName = (brandId) =>
    manufacturerBrands.find((b) => b.id === brandId)?.name || ''
  const getSpecialtyName = (specialtyId) =>
    clinicalSpecialties.find((s) => s.id === specialtyId)?.name || ''

  return (
    <>
      <Helmet>
        <title>Medical Solutions | Medelec Healthcare Solutions</title>
      </Helmet>

      {/* Page Header */}
      <section className="pt-32 pb-12 bg-bg-platinum border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-surgical-teal">
              Dynamic Product Catalog
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-blue mt-4 mb-4">
              Medical Solutions
            </h1>
            <p className="text-text-muted max-w-2xl text-lg">
              Browse our premium equipment portfolio by clinical specialty or manufacturer brand.
              Request technical specifications for any product — no e-commerce, just expert consultation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Dual-Filter Tabs */}
      <section className="sticky top-16 lg:top-20 z-30 bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Mode Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
            <div className="flex border border-border-light rounded-sm overflow-hidden">
              <button
                onClick={() => {
                  setViewMode('specialty')
                  setActiveFilter('critical-care')
                }}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  viewMode === 'specialty'
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-primary-blue hover:bg-bg-platinum'
                }`}
              >
                Browse by Clinical Specialty
              </button>
              <button
                onClick={() => {
                  setViewMode('brand')
                  setActiveFilter('hamilton')
                }}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  viewMode === 'brand'
                    ? 'bg-primary-blue text-white'
                    : 'bg-white text-primary-blue hover:bg-bg-platinum'
                }`}
              >
                Browse by Manufacturer Brand
              </button>
            </div>

            {totalItems > 0 && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-surgical-teal/10 text-surgical-teal text-sm font-medium rounded-sm hover:bg-surgical-teal/20 transition-all"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surgical-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-surgical-teal" />
                </span>
                RFQ List ({totalItems})
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-surgical-teal text-white'
                    : 'bg-bg-platinum text-primary-blue hover:bg-border-light'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Info */}
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-3">
              <h2 className="text-xl font-bold text-primary-blue">{activeFilterObj?.name}</h2>
              <span className="text-text-muted">·</span>
              <p className="text-sm text-text-muted">{activeFilterObj?.description}</p>
            </div>
          </ScrollReveal>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredProducts.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 80} className="h-full">
                  <ProductCard
                    product={product}
                    brandName={getBrandName(product.brand)}
                    specialtyName={getSpecialtyName(product.specialty)}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating RFQ Panel */}
      {isOpen && totalItems > 0 && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-40 w-auto sm:w-96 bg-white rounded-sm shadow-2xl border border-border-light animate-fade-up max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-border-light">
            <div>
              <h3 className="font-bold text-primary-blue">Your RFQ List</h3>
              <p className="text-xs text-text-muted">{totalItems} item(s) selected</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-primary-blue text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-5 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-bg-platinum rounded-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-blue truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border-light rounded-sm text-primary-blue hover:border-surgical-teal text-sm"
                    >
                      &minus;
                    </button>
                    <span className="text-sm text-primary-blue w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-border-light rounded-sm text-primary-blue hover:border-surgical-teal text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-text-muted hover:text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-border-light">
            <Link
              to="/contact"
              className="btn-teal w-full"
            >
              Submit RFQ Inquiry →
            </Link>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <section className="bg-bg-platinum py-12 border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 bg-surgical-teal/10 rounded-sm flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-surgical-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-blue mb-1">
                No Online Pricing — Direct Consultation Only
              </h3>
              <p className="text-sm text-text-muted">
                All medical equipment procurements are handled through personalized RFQ submissions.
                Our team provides detailed quotations including installation, training, and warranty terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}