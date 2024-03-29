const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  backendUrl: isDevelopment
    ? 'http://localhost:5000'
    : 'https://money-manager-api-72vr.onrender.com',
};

export default config;
