import { use, useState } from "react"
import { UserContext } from "../context/UseCartContext"
import { TiShoppingCart } from "react-icons/ti";

const moneyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
})

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''


export const TableNave = () => {
    const { cart, isEmpty, cartTotal, decreaseQuantity, increaseQuantity, removeFromCart, clearCart } = use(UserContext)
    const [cartOpen, setCartOpen] = useState(false)
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [customerCity, setCustomerCity] = useState('')
    const [customerNote, setCustomerNote] = useState('')

    // Calcular total de productos 
    //  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0)

    const buildMessage = () => {
        const itemLines = cart.map((item) => {
            return `- ${item.mane_prod} x${item.quantity} (${moneyFormatter.format(item.precio_prod * item.quantity)})`
        }).join('\n')

        return [
            `Hola, quiero realizar una orden de compra en Calzado Gloria.`,
            ``,
            `Nombre: ${customerName}`,
            `Teléfono: ${customerPhone}`,
            `Ciudad: ${customerCity}`,
            customerNote ? `Observaciones: ${customerNote}` : '',
            ``,
            `Productos:`,
            itemLines,
            ``,
            `Total: ${moneyFormatter.format(cartTotal)}`,
        ].filter(Boolean).join('\n')
    }

    const handleWhatsAppOrder = () => {
        if (!whatsappNumber) return
        const message = encodeURIComponent(buildMessage())
        const url = `https://wa.me/${whatsappNumber}?text=${message}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <>
            <div className="carrito" >
                <button
                    type="button"
                    className="cart-trigger"
                    onClick={() => setCartOpen((value) => !value)}
                    aria-expanded={cartOpen}
                    aria-label="Abrir carrito"
                >
                    <TiShoppingCart className="img-carrro-nav" />
                </button>
                {!isEmpty && (
                    <span className="cart-badge">
                        { }

                    </span>
                )}


                <div id="carrito" className={`bg-white p-3 ${cartOpen ? 'is-open' : ''}`}>
                    <button
                        type="button"
                        className="cart-close-btn"
                        onClick={() => setCartOpen(false)}
                        aria-label="Cerrar carrito"
                    >
                        ×
                    </button>
                    {isEmpty ? (
                        <p className="text-center">El carrito esta vacio</p>
                    ) : (

                        <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(prod => (
                                        <tr key={prod.id_prod}>
                                            <td>
                                                <img
                                                    className="img-fluid"
                                                    src={prod.imageUrl_prod}
                                                    alt={prod.mane_prod}
                                                />
                                            </td>
                                            <td>{prod.mane_prod}</td>
                                            <td className="fw-bold">
                                                {moneyFormatter.format(prod.precio_prod)}
                                            </td>
                                            <td className="flex align-items-start gap-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => decreaseQuantity(prod.id_prod)}
                                                >
                                                    -
                                                </button>
                                                {prod.quantity}
                                                <button
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => increaseQuantity(prod.id_prod)}
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={() => removeFromCart(prod.id_prod)}
                                                >
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="text-end">Total pagar: <span className="fw-bold">{moneyFormatter.format(cartTotal)}</span></p>

                            <div className="checkout-form">
                                <h4 className="checkout-title">Datos para la orden</h4>
                                <label className="checkout-field">
                                    <span>Nombre</span>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Tu nombre"
                                    />
                                </label>
                                <label className="checkout-field">
                                    <span>Teléfono</span>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="3001234567"
                                    />
                                </label>
                                <label className="checkout-field">
                                    <span>Ciudad</span>
                                    <input
                                        type="text"
                                        value={customerCity}
                                        onChange={(e) => setCustomerCity(e.target.value)}
                                        placeholder="Bogotá"
                                    />
                                </label>
                                <label className="checkout-field">
                                    <span>Observaciones</span>
                                    <textarea
                                        value={customerNote}
                                        onChange={(e) => setCustomerNote(e.target.value)}
                                        placeholder="Talla, color, dirección, referencia..."
                                        rows={3}
                                    />
                                </label>
                            </div>
                        </>
                    )}

                    <div className="cart-actions">
                        <button
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={clearCart}
                        >
                            Vaciar Carrito
                        </button>

                        <button
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={handleWhatsAppOrder}
                            disabled={isEmpty || !customerName || !customerPhone || !customerCity || !whatsappNumber}
                        >
                            Enviar pedido por WhatsApp
                        </button>
                        {!whatsappNumber && (
                            <p className="checkout-hint">Define `VITE_WHATSAPP_NUMBER` para activar el envío a WhatsApp.</p>
                        )}
                    </div>


                </div>
            </div>







        </>
    )
}
