import { useState, type JSX } from 'react'

interface SetImageHook {
    imagenSeleccionada: string | null
    abrirImagen: (imagen: string) => void
    cerrarImagen: () => void
    ModalImagen: JSX.Element | null
}

export const useSetImage = (): SetImageHook => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null)

    const abrirImagen = (imagen: string) => {
        setImagenSeleccionada(imagen)
    }

    const cerrarImagen = () => {
        setImagenSeleccionada(null)
    }

    const ModalImagen = imagenSeleccionada ? (
        <div
            className="modal-imagen"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                cursor: 'pointer'
            }}
            onClick={cerrarImagen}
        >
            <img
                src={imagenSeleccionada}
                alt="Imagen en pantalla completa"
                style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain'
                }}
            />
        </div>
    ) : null

    return {
        imagenSeleccionada,
        abrirImagen,
        cerrarImagen,
        ModalImagen
    }
}