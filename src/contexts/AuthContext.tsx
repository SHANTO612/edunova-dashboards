import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'educator' | 'marketer' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Seed demo data
  useEffect(() => {
    console.log('AuthContext: Initializing demo data...');

    if (!localStorage.getItem('courses')) {
      const demoCourses = [
        { id: '1', title: 'Advanced React Patterns', description: 'Master advanced React patterns including render props, HOCs, and custom hooks', instructor: 'Sarah Johnson', duration: '8 weeks', students: 245, price: 99, category: 'Web Development' },
        { id: '2', title: 'TypeScript Fundamentals', description: 'Learn TypeScript from basics to advanced type systems', instructor: 'Mike Chen', duration: '6 weeks', students: 389, price: 79, category: 'Programming' },
        { id: '3', title: 'Node.js Backend Development', description: 'Build scalable backend applications with Node.js and Express', instructor: 'Alex Rodriguez', duration: '10 weeks', students: 167, price: 119, category: 'Backend' },
        { id: '4', title: 'UI/UX Design Principles', description: 'Design beautiful and intuitive user interfaces', instructor: 'Emma Watson', duration: '5 weeks', students: 512, price: 89, category: 'Design' },
        { id: '5', title: 'Python for Data Science', description: 'Analyze data and build ML models with Python', instructor: 'David Lee', duration: '12 weeks', students: 678, price: 149, category: 'Data Science' },
      ];
      localStorage.setItem('courses', JSON.stringify(demoCourses));
    }

    if (!localStorage.getItem('bundles')) {
      const demoBundles = [
        { id: '1', title: 'Full Stack Developer Bundle', description: 'Complete path from frontend to backend development', courses: 5, originalPrice: 500, discountedPrice: 300, discount: 40 },
        { id: '2', title: 'Data Science Master Bundle', description: 'Everything you need to become a data scientist', courses: 6, originalPrice: 600, discountedPrice: 360, discount: 40 },
        { id: '3', title: 'Mobile Development Bundle', description: 'Build iOS and Android apps from scratch', courses: 4, originalPrice: 400, discountedPrice: 260, discount: 35 },
        { id: '4', title: 'UI/UX Design Complete Bundle', description: 'Master design thinking and user experience', courses: 7, originalPrice: 550, discountedPrice: 330, discount: 40 },
        { id: '5', title: 'DevOps Engineer Bundle', description: 'Learn CI/CD, Docker, Kubernetes and cloud platforms', courses: 5, originalPrice: 480, discountedPrice: 312, discount: 35 },
      ];
      localStorage.setItem('bundles', JSON.stringify(demoBundles));
    }
  }, []);

  // Dummy auth helpers
  const fakeDelay = (ms = 300) => new Promise(res => setTimeout(res, ms));

  type StoredUser = { id: string; email: string; password: string; name: string; role: UserRole };

  const getStoredUsers = (): StoredUser[] => {
    try { return JSON.parse(localStorage.getItem('users') || '[]'); } 
    catch { return []; }
  };

  const saveStoredUsers = (users: StoredUser[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    await fakeDelay();
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Invalid credentials');

    const token = `dummy-token-${found.id}`;
    const publicUser: User = { id: found.id, email: found.email, name: found.name, role: found.role };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(publicUser));
    setUser(publicUser);
    navigate(`/dashboard/${publicUser.role}`);
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    await fakeDelay();
    const users = getStoredUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('User already exists');

    const id = Date.now().toString();
    const newUser: StoredUser = { id, email, password, name, role };
    users.push(newUser);
    saveStoredUsers(users);

    const token = `dummy-token-${id}`;
    const publicUser: User = { id, email, name, role };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(publicUser));
    setUser(publicUser);
    navigate(`/dashboard/${publicUser.role}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
