import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import PlayerActionCreators from 'store/player/playerActions';


export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({...PlayerActionCreators}, dispatch);
}