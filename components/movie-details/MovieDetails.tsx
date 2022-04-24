import { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import LoadingIndicator from '../common/LoadingIndicator';
import { LoadingStatus } from '../../models/types';

import { getmoviesByTitle } from '../../services/movies';
import { RouteComponentProps } from 'react-router-dom';
import IMovies from '../../models/IMovies';

const MovieDetails = ({ match } : RouteComponentProps<{ title: string }>) => {

    const [ status, setStatus ] = useState<LoadingStatus>( 'LOADING' )
    const [movie, setMovie] = useState<IMovies>()
    const [ error, setError ] = useState<string>( '' )

    let category =''
    category = category+sessionStorage.getItem('movieCategory')

    useEffect( 
        () => {
            const fetchMovie = async () => {
                try {
                    const data = await getmoviesByTitle(match.params.title, category)
                    setMovie(data[0])
                    setStatus( 'LOADED' );
                } catch( error ) {
                    setError('Something went wrong')
                    setStatus( 'ERROR_LOADING' );
                }
            };

            fetchMovie();
        },
        [ ]
    );

    let el;

    switch( status ) {
        case 'LOADING':
            el = (
                <div style={{marginTop:'60px'}}>
                <LoadingIndicator
                    size="medium"
                    message="We are fetching the details of the movie. Please wait..."
                />
                </div>
            );
            break;
        case 'LOADED':
            const {
                actors,
                averageRating,
                contentRating,
                duration,
                genres,
                imdbRating,
                originalTitle,
                poster,
                posterurl,
                ratings,
                releaseDate,
                storyline,
                year,
                title
            } = movie as IMovies
            

            el = (
                <div style={{marginTop:'60px'}} className='mx-4'>
                    <Row className='my-4'>
                        <Col xs={12} lg={2} className="my-2">
                            <img
                                src={`${posterurl}`}
                                className="w-100"
                                alt={`${title}`}
                            />
                        </Col>
                        <Col xs={12} lg={10} className="my-2 fs-7" style={{fontFamily:"'Roboto', sans-serif"}}>
                            <h3>{title}</h3>
                            <hr />
                            <Row>
                                <Col xs={6} md={2}>Imdb Rating</Col>
                                <Col xs={6} md={8}>{imdbRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Content Rating</Col>
                                <Col xs={6} md={8}>{contentRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Average Rating</Col>
                                <Col xs={6} md={8}>{averageRating}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Duration</Col>
                                <Col xs={6} md={8}>{duration}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Genres</Col>
                                <Col xs={6} md={8}>{genres}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Actors</Col>
                                <Col xs={6} md={8} lg={10}>{actors}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Release Date</Col>
                                <Col xs={6} md={8}>{releaseDate}</Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={2}>Story Line</Col>
                                <Col xs={6} md={8} lg={10}>{storyline}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            );
            break;
        case 'ERROR_LOADING':
            el = (
                <div style={{marginTop:'60px'}}>
                    <Alert variant="danger my-3">
                        {error}
                    </Alert>
                </div>
            );
            break;
    }

    return el;
}

export default MovieDetails;
