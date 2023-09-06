import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    const [pageNumber, setPageNumber] = useState(1);
    const [page, setPage] = useState<MoviePage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=${pageNumber}&sort=title`).then(r => {
            const alo = r.data as MoviePage;
            setPage(alo);
        });

    }, [pageNumber]);

    const handlePageChange = (newPageNum: number) => {
        setPageNumber(newPageNum)
    };

    return (
        <>

            <Pagination page={page} onChange={handlePageChange}/>

            <div className="container">
                <div className="row">
                    {
                        page.content.map(m => {
                            return (
                                <div key={m.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                    <MovieCard movie={m} />
                                </div>);
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Listing;
