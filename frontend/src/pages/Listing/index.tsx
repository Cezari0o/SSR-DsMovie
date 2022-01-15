import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";

function Listing() {

    const [pageNumber, setPageNumber] = useState(0);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/movies?size=12&page=2`).then(r => {
            const alo = r.data as MoviePage;        
            setPageNumber(alo.number);
        });
    
    }, []);

    return (
        <>

            <p>{pageNumber}</p>
            <Pagination />

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <MovieCard />
                    </div>

                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <MovieCard />
                    </div>

                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <MovieCard />
                    </div>

                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <MovieCard />
                    </div>

                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                        <MovieCard />
                    </div>

                </div>

            </div>
        </>
    );
}

export default Listing;