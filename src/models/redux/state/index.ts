import Data from './Data';
import Training from './Training';

export default class State {
  constructor(public data: Data, public currentTraining: Training) {}
}
