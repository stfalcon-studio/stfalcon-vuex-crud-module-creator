const globalConfig = {
  get transport() {
    return globalConfig.transportAdapter;
  }
};

export default globalConfig;
