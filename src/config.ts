const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  backendUrl: isDevelopment
    ? 'https://localhost:5000'
    : 'https://moneymanager.digital',
};

export default config;
