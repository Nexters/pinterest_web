import { useReducer } from 'react';

export type Action = {
  type:
    | 'OPEN_DRAWER'
    | 'CLOSE_DRAWER'
    | 'OPEN_FILM_TITLE_MODAL'
    | 'CLOSE_FILM_TITLE_MODAL'
    | 'OPEN_FILM_ADD_MODAL'
    | 'CLOSE_FILM_ADD_MODAL'
    | 'OPEN_FILM_SELECT_MODAL'
    | 'CLOSE_FILM_SELECT_MODAL'
    | 'OPEN_PROFILE_MODAL'
    | 'CLOSE_PROFILE_MODAL'
    | 'OPEN_ADD_MENU'
    | 'CLOSE_ADD_MENU';
};

export type State = {
  isDrawerOpen: boolean;
  isFilmTitleModalOpen: boolean;
  isFilmAddModalOpen: boolean;
  isFilmSelectModalOpen: boolean;
  isProfileModalOpen: boolean;
  isAddMenuOpen: boolean;
};

const initialState: State = {
  isDrawerOpen: false,
  isFilmTitleModalOpen: false,
  isFilmAddModalOpen: false,
  isFilmSelectModalOpen: false,
  isProfileModalOpen: false,
  isAddMenuOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'OPEN_FILM_TITLE_MODAL':
      return { ...state, isFilmTitleModalOpen: true };
    case 'CLOSE_FILM_TITLE_MODAL':
      return { ...state, isFilmTitleModalOpen: false };
    case 'OPEN_FILM_ADD_MODAL':
      return { ...state, isFilmAddModalOpen: true, isAddMenuOpen: false };
    case 'CLOSE_FILM_ADD_MODAL':
      return { ...state, isFilmAddModalOpen: false };
    case 'OPEN_FILM_SELECT_MODAL':
      return { ...state, isFilmSelectModalOpen: true, isAddMenuOpen: false };
    case 'CLOSE_FILM_SELECT_MODAL':
      return { ...state, isFilmSelectModalOpen: false };
    case 'OPEN_PROFILE_MODAL':
      return { ...state, isProfileModalOpen: true };
    case 'CLOSE_PROFILE_MODAL':
      return { ...state, isProfileModalOpen: false };
    case 'OPEN_ADD_MENU':
      return { ...state, isAddMenuOpen: true };
    case 'CLOSE_ADD_MENU':
      return { ...state, isAddMenuOpen: false };
    default:
      throw new Error('Invalid action type');
  }
};

export function useModals() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { status: state, dispatch } as const;
}

// 맵 자료구조로 key,value로 모달들을 관리하고 key에 따라 특정한 모달만 활성화하는 훅을 짜볼려했으나 ... 실패
// 시간있을떄 다시도전..

// export type Key = string;

// export type ModalMap = Map<Key, React.FC<any>>;

// interface Props {
//   modalMap: ModalMap;
// }

// export function useModalManager({ modalMap }: Props) {
//   const [activatedModal, setActivatedModal] = useState<React.FC<any> | null>(null);

//   const enableModal = useCallback(
//     (key: Key) => {
//       const modal = modalMap.get(key);
//       if (modal === undefined) {
//         throw new Error(`Modal with key ${key} does not exist`);
//       }

//       setActivatedModal(modal);
//     },
//     [modalMap],
//   );

//   const disableModal = useCallback(() => {
//     setActivatedModal(null);
//   }, []);

//   return { ActivatedModal: activatedModal, enableModal, disableModal } as const;
// }
