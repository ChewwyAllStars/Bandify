import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.scss';

const Home = ({
  users, user, onSearchChange, onSearchSubmit, searchValue, getMembers,
}) => {
  useEffect(() => {
    if (user.isLogged) {
      getMembers();
    }
  }, []);

  return (
    <div className="main">
      {/* si on est connecté, on affiche la page d'accueil avec la recherche
      et les cartes des membres sont cliquablent */}
      {user.isLogged ? (
        <>
          <div className="home__search">
            <form onSubmit={onSearchSubmit}>
              <input
                type="search"
                name="searchBar"
                id="searchBar"
                placeholder="Rechercher un membre..."
                value={searchValue}
                onChange={(evt) => onSearchChange(evt.target.value)}
              />
            </form>
            <button type="button" onClick={() => console.log('clicked')}>Filtres</button>
          </div>

          <div className="home__cards">
            {users.map(({ id, firstname }) => (
              <Link to={`/member/${id}`} key={id}>
                <li className="home__cards-users">{firstname}</li>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* sinon, on affiche la page d'accueil avec uniquement un aperçu du site :
          la description de Bandify, un boutton redirigeant vers l'inscription
           et des cartes de membres statiques */}
          <p className="home__desc">
            Bienvenue sur Bandify ! <br /> Le réseau social permettant de rencontrer des musiciens
            dans un périmètre géographique donné.
            Pour cela, inscrivez-vous, renseignez vôtre/vosinstrument(s) de prédilection,
            vôtre niveau (optionnel), le(s) style(s) de musique appréciés, les musiciens recherchés
            (bassiste, batteur...) et le périmètre de recherche.
          </p>

          <Link to="/signup" className="home__signup-btn">Rejoindre la communauté</Link>

          <p className="home__desc-teasing">Ils ont déjà rejoint</p>
          <div className="home__cards">
            {users.map(({ id, firstname }) => (
              <li className="home__cards-users" key={id}>{firstname}</li>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object,
  ),
  user: PropTypes.shape({
    isLogged: PropTypes.bool.isRequired,
  }).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  getMembers: PropTypes.func.isRequired,
};
Home.defaultProps = {
  users: [{
    id: null,
    firstname: '',
  }],
};
export default Home;
