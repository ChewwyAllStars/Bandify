import usersData from 'src/data/users';

export const initialState = {
  // users = ARRAY
  users: usersData,
  // user = OBJECT
  user: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    user_description: '',
    email: '',
    user_password: '',
    city: {
      city_name: '',
      department_code: '',
    },
    code: '',
    departement: {
      code: '',
      nom: '',
    },
    region: {
      code: '',
      nom: '',
    },
    instruments: [{}],
    styles: [{}],
    profil_image: '',
  },
  friends: [],
  pendingInvitations: [],
  acceptedInvitations: [],
  editPhoto: false,
  editName: false,
  editCity: false,
  editBirthdate: false,
  editInstruments: false,
  editStyles: false,
  editEmail: false,
  editPassword: false,
  editDescription: false,
  searchedUsers: [],
  error: '',
  city: '',
  code: '',
  instruments: [{}],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        users: action.users,
        searchedUsers: [],
      };
    case 'GET_ONE_MEMBER_SUCCESS':
      return {
        ...state,
        user: action.user,
      };
    case 'ON_SEARCH_SUBMIT_SUCCESS':
      return {
        ...state,
        // pas le choix, faut passer par le reducer Users
        // les users deviennent filtrés en fonction de la query de searchBar
        searchedUsers: action.searchedUsers,
      };
    case 'ON_DELETE_PROFILE_SUCCESS':
    {
      // On clear le localStorage lors d'une suppression d'un profil
      localStorage.clear();
      return {
        ...state,
        users: usersData,
        user: {
          ...initialState.user,
        },
      };
    }
    case 'EDIT_FORM_TOGGLE':
      return {
        ...state,
        [action.key]: !state[action.key],
        user: {
          ...state.user,
          user_password: '',
        },
      };
    case 'CHANGE_INPUT_MODIFY_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value,
        },
      };
    case 'PHOTO_MODIFIED_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          profil_image: action.user.profil_image,
        },
        editPhoto: false,
      };
    case 'NAME_MODIFIED_SUCCESS':
      return {
        ...state,
        editName: false,
        user: {
          ...state.user,
          firstname: action.data.firstname,
          lastname: action.data.lastname,
        },
      };
    case 'EMAIL_MODIFIED_SUCCESS':
      return {
        ...state,
        editEmail: false,
        user: {
          ...state.user,
          email: action.data.email,
        },
      };
    case 'BIRTHDATE_MODIFIED_SUCCESS':
      return {
        ...state,
        editBirthdate: false,
        user: {
          // isMenuOpen: !state.isMenuOpen,
          ...state.user,
          birthdate: action.data.birthdate,
        },
      };
    case 'DESCRIPTION_MODIFIED_SUCCESS':
      return {
        ...state,
        editDescription: false,
        user: {
          ...state.user,
          user_description: action.data.user_description,
        },
      };
    case 'PASSWORD_MODIFIED_SUCCESS':
      return {
        ...state,
        editPassword: false,
        user: {
          ...state.user,
          user_password: '',
        },
      };
    case 'SUBMIT_MODIFIED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CHANGE_CITY_INPUT':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'CITY_MODIFIED_SUCCESS':
      return {
        ...state,
        editCity: false,
        user: {
          ...state.user,
          city: {
            ...state.city,
            city_name: action.data.city.city_name,
            department_code: action.data.city.department_code,
          },
        },
        code: action.data.city_code,
      };

    case 'ON_LOGOUT':
      return {
        ...state,
        users: usersData,
      };

    case 'CHANGE_INSTRUMENT_LEVEL_ON_PROFILE': {
      const copyInstruments = [...state.instruments];
      const instrumentAlreadyChoose = copyInstruments.find(
        ({ instrument }) => instrument === action.value,
      );
      if (!instrumentAlreadyChoose || action.key === 'level') {
        copyInstruments[action.index] = {
          ...copyInstruments[action.index],
          [action.key]: action.value,
        };
      }
      return {
        ...state,
        instruments: copyInstruments,
      };
    }

    case 'ADD_NEW_INSTRUMENT_INPUT_PROFILE':
      return {
        ...state,
        instruments: [...state.instruments, {}],
      };

    case 'REMOVE_INSTRUMENT_INPUT_PROFILE': {
      const copyInstruments = state.instruments.filter((_, i) => i !== action.index);
      return {
        ...state,
        instruments: copyInstruments,
      };
    }

    case 'GET_FRIENDS_SUCCESS':
      return {
        ...state,
        friends: action.friends,
      };

    case 'SEND_INVITATION_SUCCESS': {
      return {
        ...state,
        pendingInvitations: [
          ...state.pendingInvitations,
          action.invitation,
        ],
      };
    }
    case 'GET_NEW_INVITATION': {
      return {
        ...state,
        pendingInvitations: [
          ...state.pendingInvitations,
          action.invitation,
        ],
      };
    }

    case 'GET_PENDING_INVITATIONS_SUCCESS':
      return {
        ...state,
        pendingInvitations: action.pendingInvitations,
      };

    case 'GET_ACCEPTED_INVITATIONS_SUCCESS':
      return {
        ...state,
        acceptedInvitations: action.acceptedInvitations,
      };

    case 'DELETE_FROM_FRIENDLIST_SUCCESS':
      return {
        ...state,
        acceptedInvitations: [
          ...state.acceptedInvitations.slice(0, action.indexAccepted),
          ...state.acceptedInvitations.slice(action.indexAccepted + 1),
        ],
        friends: [
          ...state.friends.slice(0, action.indexFriends),
          ...state.friends.slice(action.indexFriends + 1),
        ],
      };
    case 'ON_ACCEPT_INVITATION_SUCCESS':
      return {
        ...state,
        friends: [
          ...state.friends,
          // on ajoute le membre à notre tableau de friends
          action.futureFriend,
        ],
        acceptedInvitations: [
          ...state.acceptedInvitations,
          // on ajoute l'invitation à notre tableau d'invitations accepétées
          action.invitation,
        ],
      };
    case 'ON_DENY_INVITATION_SUCCESS':
      return {
        ...state,
        pendingInvitations: [
          // on retire la pending invitation du tableau
          ...state.pendingInvitations.slice(0, action.pendingInvIndex),
          ...state.pendingInvitations.slice(action.pendingInvIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default reducer;
