import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [props, setProps] = useState([])
  const [loading, setLoading] = useState(true)

  // LIVE Backend URL - Render + Env var
  const API_URL = import.meta.env.VITE_API_URL || "https://kiran-esate-backend.onrender.com"

  useEffect(() => {
    axios.get(`${API_URL}/api/properties/`)
      .then(res => {
        setProps(res.data.results || res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log("API Error:", err)
        setLoading(false)
      })
  }, [])

  const buy = async (id) => {
    try {
      // Backend lo /api/buy/ endpoint lekapote, just success chupistam - demo ki idi chalu!
      // Real backend ki post cheyali ante kinda line use chey:
      // await axios.post(`${API_URL}/api/buy/`, { property_id: id, tokens: 1 })

      alert(`🎉 Token Purchased Successfully!\n\nProperty ID: ${id}\nAmount: ₹10,000\n\nNee wallet lo 1 token add ayindi! (Demo)`)
    } catch (e) {
      // Error vachina kuda success chupinchu - demo kosam
      alert(`🎉 Token Purchased Successfully!\n\nProperty ID: ${id}\nAmount: ₹10,000\n\nNee wallet lo 1 token add ayindi! (Demo)`)
      console.log(e)
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'black', color: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>KIRAN <span style={{ color: '#facc15' }}>ESTATE</span></h1>
        <div style={{ background: '#1e293b', padding: '8px 16px', borderRadius: 20, fontSize: 12 }}>TOKENIZED REAL ESTATE</div>
      </div>

      <div style={{ padding: '40px', background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: 'white' }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, maxWidth: 600, lineHeight: 1 }}>Invest in Prime Real Estate, One Token at a Time</h2>
        <p style={{ marginTop: 16, opacity: 0.7, maxWidth: 500 }}>Buy fractional ownership of luxury villas in Hyderabad. Starting from ₹10,000 per token.</p>
      </div>

      <div style={{ padding: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))', gap: 24 }}>
        {loading ? "Loading..." : props.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <img src={p.image_url} alt={p.title} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 12, background: '#fef3c7', color: '#92400e', display: 'inline-block', padding: '4px 8px', borderRadius: 6, fontWeight: 600, marginBottom: 12 }}>{(p.location || "KOKAPET • HYDERABAD").toUpperCase()}</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, textTransform: 'capitalize' }}>{p.title}</h2>
              <p style={{ marginTop: 8, color: '#64748b', fontSize: 14 }}>Total Supply: {p.total_tokens || 100} Tokens • Available: {p.available_tokens || 90}</p>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>TOKEN PRICE</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>₹{p.token_price}</div>
                </div>
                <button onClick={() => buy(p.id)} style={{ background: 'black', color: 'white', padding: '12px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', border: 'none' }}>Buy Token</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App
