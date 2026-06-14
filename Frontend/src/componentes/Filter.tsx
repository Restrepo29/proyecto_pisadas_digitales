import { MdFilterListAlt } from "react-icons/md";
import { useParams } from "react-router";
import { FilterPrice, FilterSize, FilterColor, ButtonClear } from "../componentes/index";


export const FilterSidebar = () => {

  const { gender } = useParams()
  return (
    <div className="filter-sidebar">
      <div>

        <h3 className="filter-header"><MdFilterListAlt /> Filtros  </h3>
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