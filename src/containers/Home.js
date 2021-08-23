import { connect } from 'react-redux';
import Home from 'src/components/Home';

const mapStateToProps = (state) => ({
  users: state.users.users,
  isLogged: state.login.isLogged,
  searchValue: state.users.searchValue,
  user: state.users.user,
  searchedUsers: state.settings.searchedUsers,
  searchSuccessMessage: state.settings.searchSuccessMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getMembers: () => {
    dispatch({ type: 'GET_MEMBERS' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
