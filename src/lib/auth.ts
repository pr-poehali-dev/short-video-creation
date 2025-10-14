export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

const AUTH_STORAGE_KEY = 'peeky_auth_user';

export const authService = {
  register: (email: string, password: string, username: string): User => {
    const users = authService.getAllUsers();
    
    if (users.some(u => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    if (users.some(u => u.username === username)) {
      throw new Error('Пользователь с таким именем уже существует');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      username,
      createdAt: new Date().toISOString(),
    };

    const userWithPassword = { ...newUser, password };
    users.push(userWithPassword);
    localStorage.setItem('peeky_users', JSON.stringify(users));
    
    authService.setCurrentUser(newUser);
    return newUser;
  },

  login: (email: string, password: string): User => {
    const users = authService.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const { password: _, ...userWithoutPassword } = user;
    authService.setCurrentUser(userWithoutPassword);
    return userWithoutPassword;
  },

  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  getAllUsers: (): any[] => {
    const usersJson = localStorage.getItem('peeky_users');
    if (!usersJson) return [];
    
    try {
      return JSON.parse(usersJson);
    } catch {
      return [];
    }
  },

  isAuthenticated: (): boolean => {
    return authService.getCurrentUser() !== null;
  },
};
