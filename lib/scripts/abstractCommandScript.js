class AbstractCommandScript {
  beforeExecute() {
    return null;
  }

  execute() {
    this.beforeExecute();
  }

  afterExecute() {
    return null;
  }
}

module.exports = AbstractCommandScript;
