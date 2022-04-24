import { Switch, Route} from 'react-router-dom';
import NavigationMenu from './NavigationMenu';

import MovieDetails from './movie-details/MovieDetails';
import ShowFilteredItem from './ShowFilteredItem';

const App = () => {
    return (
        <>
            <NavigationMenu />            
                <Switch>
                    <Route path="/details/:title" component={MovieDetails} />
                    <Route path="/movies-in-theaters" children={<ShowFilteredItem category='movies-in-theaters'/>} />
                    <Route path="/movies-coming" children={<ShowFilteredItem category='movies-coming'/>} />
                    <Route path="/top-rated-india" children={<ShowFilteredItem category='top-rated-india'/>} />
                    <Route path="/top-rated-movies" children={<ShowFilteredItem category='top-rated-movies'/>} />
                    <Route path="/favourit" children={<ShowFilteredItem category='favourit'/>} />
                    <Route path="/" children={<ShowFilteredItem category='movies-in-theaters'/>}/>
                </Switch>
        </>
    );
};

export default App;