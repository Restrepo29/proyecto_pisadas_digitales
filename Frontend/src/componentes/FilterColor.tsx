import { useSearchParams } from 'react-router';


export const FilterColor = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentColors = searchParams.get('colors')?.split(',') || [];//por color
  //filtro por color
  const handleColorChanged = (color: string) => {
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color];

    searchParams.set('page', '1');
    searchParams.set('colors', newColors.join(','));
    setSearchParams(searchParams);
  };

  const colors = [
    { id: 'rojo', label: 'Rojo', code: '#ff0000' },
    { id: 'azul', label: 'Azul', code: '#0000ff' },
    { id: 'negro', label: 'Negro', code: '#000000' },
    { id: 'blanco', label: 'Blanco', code: '#ffffff' },
    { id: 'gris', label: 'Gris', code: '#808080' },
    { id: 'marron', label: 'Marrón', code: '#8b4513' },
  ];

  return (
    <>
      {/* Colors */}
      <details className="filter-accordion" open={currentColors.length > 0}>
        <summary className="filter-accordion-summary">
          <h4 className="filter-title">Color</h4>
        </summary>
        <div className="filter-accordion-content">
          <div className="checkbox-group">
            {colors.map((color) => (
              <div key={color.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`color-${color.id}`}
                  value={color.id}
                  checked={currentColors.includes(color.id)}
                  onChange={() => handleColorChanged(color.id)}
                  className="checkbox-input"
                />
                <label
                  htmlFor={`color-${color.id}`}
                  className="checkbox-label"
                >
                  <span
                    className="color-dot"
                    style={{ backgroundColor: color.code }}
                  ></span>
                  {color.label}
                </label>

              </div>
            ))}
          </div>
        </div>
      </details>
      {/*hasta*/}

    </>

  )
}
