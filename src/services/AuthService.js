import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'waterMeterUser';

const loginUser = async ({username, password}) => {
  const users = [
    {username: 'admin', password: 'password'},
    {username: 'user', password: '123456'},
    {username: 'demo', password: 'demo'},
  ];
  const found = users.find(u => u.username === username && u.password === password);
  if (!found) {
    throw new Error('Invalid credentials');
  }
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({username: found.username}));
};

const logoutUser = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

const isAuthenticated = async () => {
  const val = await AsyncStorage.getItem(STORAGE_KEY);
  return !!val;
};

const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export {loginUser, logoutUser, isAuthenticated, getCurrentUser};
