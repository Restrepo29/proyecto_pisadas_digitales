import { useRef } from "react"
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

export const InputSearch = () => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = inputRef.current?.value?.trim()

      if (value) {
        navigate(`/search?name=${encodeURIComponent(value)}`)
        // Limpiar el input después de la búsqueda
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    }
  }

  const handleSearchClick = () => {
    const value = inputRef.current?.value?.trim()
    if (value) {
      navigate(`/search?name=${encodeURIComponent(value)}`)
    }
  }


  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="¿Qué estás buscando?'"
          className="search-input"
          ref={inputRef}
          onKeyDown={handleKeyDown}

        />
        <button className="search-btn" onClick={handleSearchClick} >
          <IoSearch size={90} />
        </button>
      </div>
    </>

  )
}
