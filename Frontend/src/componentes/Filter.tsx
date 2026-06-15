import { MdFilterListAlt } from "react-icons/md";
import { useParams } from "react-router";
import { FilterPrice, FilterSize, FilterColor, ButtonClear } from "../componentes/index";


export const FilterSidebar = () => {

  const { gender } = useParams()
  return (
    <div className="filter-sidebar">
      <div className="filter-hero">
        <span className="filter-icon"><MdFilterListAlt /></span>
        <div>
          <h3 className="filter-header">Filtros</h3>
          <p className="filter-subtitle">Refina tu selección</p>
        </div>
      </div>

      {gender === 'calzado' ? (
        <>
          <FilterSize />
          <FilterPrice />
          <FilterColor />
          <ButtonClear />
        </>
      ) : (
        <>
          <FilterPrice />
          <FilterColor />
          <ButtonClear />

        </>
      )}

    </div>

  );
};
