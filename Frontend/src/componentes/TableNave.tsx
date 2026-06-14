import { use } from "react"
import { UserContext } from "../context/UseCartContext"
import { TiShoppingCart } from "react-icons/ti";


export const TableNave = () => {
    const { cart, isEmpty, cartTotal, decreaseQuantity, increaseQuantity, removeFromCart, clearCart } = use(UserContext)

    // Calcular total de productos 
    //  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0)
    return (
        <>
            <div className="carrito" >
                <TiShoppingCart className="img-carrro-nav" />
                {!isEmpty && (
                    <span className="cart-badge">
                        { }

                    </span>
                )}


                <div id="carrito" className="bg-white p-3">
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
                                                    alt="imagen guitarra"
                                                />
                                            </td>
                                            <td>{prod.mane_prod}</td>
                                            <td className="fw-bold">
                                                ${prod.precio_prod}
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

                            <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                        </>
                    )}

                    <button
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={clearCart}
                    >Vaciar Carrito


                    </button>


                </div>
            </div>







        </>
    )
}
