import { useSearchParams } from "react-router";

export const ButtonClear = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <button
        className="clear-filter-btn"
        onClick={() => {
          searchParams.delete('colors');
          searchParams.delete('sizes');
          searchParams.delete('price');
          setSearchParams(searchParams);
        }}
      >
        Limpiar filtros
      </button>
    </>
  )
}
