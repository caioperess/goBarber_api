const AuthConfig = {
  secret: process.env.APP_SECRET || 'default',
  expiresIn: '1d',
};

export default AuthConfig;
