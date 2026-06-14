import { useSearchParams } from 'react-router';


export const FilterPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPrice = searchParams.get('price') || 'any';

  //filtro por price
  const handlePriceChange = (price: string) => {
    searchParams.set('page', '1');
    searchParams.set('price', price);
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Price Range */}
      <div className="filter-section">
        <h4 className="filter-title"><b>Precio</b></h4>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              name="price"
              value="any"
              id="priceAny"
              checked={currentPrice === 'any'}
              onChange={() => handlePriceChange('any')}
              className="radio-input"
            />
            <label htmlFor="priceAny" className="radio-label">
              Cualquier precio
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="price"
              value="0-50"
              id="price1"
              checked={currentPrice === '0-50'}
              onChange={() => handlePriceChange('0-50')}
              className="radio-input"
            />
            <label htmlFor="price1" className="radio-label">
              $0 - $50
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="price"
              value="50-100"
              id="price2"
              checked={currentPrice === '50-100'}
              onChange={() => handlePriceChange('50-100')}
              className="radio-input"
            />
            <label htmlFor="price2" className="radio-label">
              $50 - $100
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="price"
              value="100-200"
              id="price3"
              checked={currentPrice === '100-200'}
              onChange={() => handlePriceChange('100-200')}
              className="radio-input"
            />
            <label htmlFor="price3" className="radio-label">
              $100 - $200
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="price"
              value="200+"
              id="price4"
              checked={currentPrice === '200+'}
              onChange={() => handlePriceChange('200+')}
              className="radio-input"
            />
            <label htmlFor="price4" className="radio-label">
              $200+
            </label>
          </div>
        </div>
      </div>
      <div className="separator"></div>

    </>
  )
}
