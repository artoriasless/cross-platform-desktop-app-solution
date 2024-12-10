interface IAppConfig {
  icon?: string;
  name?: string;
  description?: string;
  author?: string;
  email?: string;
  size: {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
  };
}

export default IAppConfig;
