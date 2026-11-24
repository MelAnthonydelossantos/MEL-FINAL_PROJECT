import { useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
  category: 'room' | 'audio' | 'meal'
  icon: string
}

const products: Product[] = [
  { id: 'auditorium', name: 'Auditorium Hall', price: 550, category: 'room', icon: '🏛️' },
  { id: 'conference', name: 'Conference Room', price: 350, category: 'room', icon: '🏢' },
  { id: 'presentation', name: 'Presentation Room', price: 200, category: 'room', icon: '📽️' },
  { id: 'projector', name: 'Projector', price: 150, category: 'audio', icon: '📽️' },
  { id: 'speaker', name: 'Speaker', price: 35, category: 'audio', icon: '🔊' },
  { id: 'microphone', name: 'Microphone', price: 45, category: 'audio', icon: '🎤' },
  { id: 'lunch', name: 'Lunch', price: 25, category: 'meal', icon: '🍽️' },
  { id: 'dinner', name: 'Dinner', price: 40, category: 'meal', icon: '🥘' },
  { id: 'coffee', name: 'Coffee Break', price: 15, category: 'meal', icon: '☕' },
]

const categoryNames = {
  room: 'Venue Room Selection',
  audio: 'Audio & Visual Equipment',
  meal: 'Meals Selection',
}

type ProductSectionProps = {
  onBack: () => void
}

export function ProductSection({ onBack }: ProductSectionProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const changeQuantity = (product: Product, amount: number) => {
    setQuantities((currentQuantities) => {
      const nextQuantity = Math.max(0, (currentQuantities[product.id] ?? 0) + amount)

      if (nextQuantity === 0) {
        const updatedQuantities = { ...currentQuantities }
        delete updatedQuantities[product.id]
        return updatedQuantities
      }

      return {
        ...currentQuantities,
        [product.id]: nextQuantity,
      }
    })
  }

  return (
    <section className="planner" id="products">
      <nav className="planner-nav" aria-label="Planner navigation">
        <button className="brand brand-button" type="button" onClick={onBack}>
        </button>
        <div className="nav-links">
          <a href="#venue">Venue</a>
          <a href="#addons">Add-ons</a>
          <a href="#meals">Meals</a>
        </div>
        <a className="show-details" href="#cart">
          Show Details
        </a>
      </nav>

      <div className="planner-body">
        <div className="catalog">
          {(['room', 'audio', 'meal'] as const).map((category) => (
            <div className="category" id={category === 'room' ? 'venue' : category === 'audio' ? 'addons' : 'meals'} key={category}>
              <h2>{categoryNames[category]}</h2>
              <div className="product-grid">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => {
                    const quantity = quantities[product.id] ?? 0
                    return (
                      <article className="product-card" key={product.id}>
                        <div className="product-icon" aria-hidden="true">{product.icon}</div>
                        <h3>{product.name}</h3>
                        <p className="product-price">{product.price}</p>
                        <div className="quantity-controls">
                          <button type="button" onClick={() => changeQuantity(product, -1)} disabled={quantity === 0}>−</button>
                          <span>{quantity}</span>
                          <button type="button" onClick={() => changeQuantity(product, 1)}>+</button>
                        </div>
                        {quantity > 0 && (
                          <p className="line-total">{product.price * quantity}</p>
                        )}
                      </article>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
