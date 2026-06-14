import { useSearchParams } from "react-router";


interface Props {

    totalPages: number;
    // limit?:number;
}


export const Pagination = ({ totalPages }: Props) => {

    const [searchParams, setSearchParams] = useSearchParams();


    const queryPage = searchParams.get('page') ?? '1';
    const page = isNaN(+queryPage) ? 1 : Number(queryPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    }

    return (

        <>
            <div className="pagination-container">
                <button
                    className={`pagination-btn ${page === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-btn ${page === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className={`pagination-btn ${page === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Siguiente
                </button>
            </div>

        </>
    );
};

