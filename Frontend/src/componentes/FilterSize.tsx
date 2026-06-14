import { useSearchParams } from "react-router";


export const FilterSize = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSizes = searchParams.get('sizes')?.split(',') || []; // xs,l,xl

  //filtro por sizes

  const handleSizeChanged = (size: string) => {
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    searchParams.set('page', '1');
    searchParams.set('sizes', newSizes.join(','));
    setSearchParams(searchParams);
  };


  const sizes = [
    { id: '36', label: '36' },
    { id: '37', label: '37' },
    { id: '38', label: '38' },
    { id: '39', label: '39' },
    { id: '40', label: '40' },
    { id: '41', label: '41' },
  ];

  return (
    <>
      <div className="filter-section">
        <h4 className="filter-title"><strong>Tallas</strong></h4>
        <div className="sizes-grid">
          {sizes.map((size) => (
            <button
              key={size.id}
              className={`size-button ${currentSizes.includes(size.id) ? 'active' : 'inactive'}`}
              onClick={() => handleSizeChanged(size.id)}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
      <div className="separator"></div>
    </>
  )
}
