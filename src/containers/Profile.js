import { connect } from 'react-redux';
import Profile from 'src/components/Profile';

const mapStateToProps = (state) => ({
  users: state.users.users,
  user: state.users.user,
  connectedUserId: state.login.id,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps, null)(Profile);
