import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Helmet } from 'react-helmet-async'
import ScrollReveal from '../components/ScrollReveal'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    imageUrls: [],
    pdfUrl: '',
    isPublished: true
  })
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    // Load mock products from localStorage or use default
    const stored = localStorage.getItem('mockProducts')
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      const defaultProducts = [
        {
          id: '1',
          name: 'Hamilton Medical HAMILTON-T1',
          brand: 'Hamilton Medical',
          category: 'Critical Care',
          description: 'World\'s first transport ventilator with both active humidification and turbine-driven technology.',
          imageUrls: [],
          pdfUrl: '',
          isPublished: true
        }
      ]
      setProducts(defaultProducts)
      localStorage.setItem('mockProducts', JSON.stringify(defaultProducts))
    }
    setLoading(false)
  }, [])

  const saveProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('mockProducts', JSON.stringify(newProducts))
  }

  const fetchProducts = async () => {
    // No-op: products are loaded from localStorage on mount
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? Array.from(e.target.files) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    try {
      let newProducts
      if (editId) {
        newProducts = products.map(p => p.id === editId ? { ...form, id: editId } : p)
      } else {
        const newProduct = { ...form, id: Date.now().toString() }
        newProducts = [...products, newProduct]
      }
      saveProducts(newProducts)
      setForm({
        name: '',
        brand: '',
        category: '',
        description: '',
        imageUrls: [],
        pdfUrl: '',
        isPublished: true
      })
      setEditId(null)
      setShowAddForm(false)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setSaveLoading(false)
    }
  }

  const togglePublish = async (id, isPublished) => {
    const newProducts = products.map(p => p.id === id ? { ...p, isPublished: !isPublished } : p)
    saveProducts(newProducts)
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to archive this product?')) return
    const newProducts = products.filter(p => p.id !== id)
    saveProducts(newProducts)
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Medelec Healthcare Solutions</title>
      </Helmet>

      <div className="min-h-screen bg-bg-platinum">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-primary-blue">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-text-muted">
                  Welcome back, {user?.name || 'Admin'}!
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Alerts */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                {error}
              </div>
            )}

            {/* Add Product Button */}
            <div className="mb-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-teal"
              >
                {editId ? 'Edit Product' : 'Add New Product'}
              </button>
            </div>

            {/* Product Form */}
            {showAddForm && (
              <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-blue mb-4">
                  {editId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="Product name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-1">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        className="input-field w-full"
                      >
                        <option value="">Select brand</option>
                        <option value="Hamilton Medical">Hamilton Medical</option>
                        <option value="Samsung Healthcare">Samsung Healthcare</option>
                        <option value="Linet">Linet</option>
                        <option value="Spacelabs Healthcare">Spacelabs Healthcare</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="input-field w-full"
                        placeholder="e.g., Critical Care, Radiology"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-blue mb-1">
                        Published
                      </label>
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={form.isPublished}
                        onChange={handleChange}
                        className="form-checkbox h-4 w-4 text-surgical-teal"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="4"
                      className="input-field w-full"
                      placeholder="Product description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-1">
                      Image URLs (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="imageUrls"
                      value={form.imageUrls.join(',')}
                      onChange={(e) => setForm({ ...form, imageUrls: e.target.value.split(',').map(u => u.trim()).filter(u => u) })}
                      className="input-field w-full"
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-1">
                      PDF URL
                    </label>
                    <input
                      type="text"
                      name="pdfUrl"
                      value={form.pdfUrl}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="https://example.com/brochure.pdf"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditId(null)
                        setForm({
                          name: '',
                          brand: '',
                          category: '',
                          description: '',
                          imageUrls: [],
                          pdfUrl: '',
                          isPublished: true
                        })
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="btn-teal"
                    >
                      {saveLoading ? 'Saving...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {loading ? (
                <div className="text-center py-8">
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-8 text-text-muted">
                  No products found. Add your first product above!
                </div>
              ) : (
                <table className="min-w-full divide-y divide-border-light">
                  <thead className="bg-bg-platinum">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-blue uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-blue uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-blue uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-blue uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-primary-blue uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-bg-platinum/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-blue">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {product.brand}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isPublished ? 'bg-surgical-teal/10 text-surgical-teal' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {product.isPublished ? 'Published' : 'Archived'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => {
                              setEditId(product.id)
                              setForm({
                                name: product.name,
                                brand: product.brand,
                                category: product.category,
                                description: product.description,
                                imageUrls: product.imageUrls || [],
                                pdfUrl: product.pdfUrl || '',
                                isPublished: product.isPublished
                              })
                              setShowAddForm(true)
                            }}
                            className="text-surgical-teal hover:text-surgical-teal/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Archive
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}