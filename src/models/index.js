import Home from '../pages/Home/models'

class RootStore {
  constructor() {
    this.home = new Home(this)
  }
}

export default new RootStore();
