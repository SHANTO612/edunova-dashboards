import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = () => {
      setLoading(true);

      const mockTeachers: Teacher[] = [
        { id: 't1', name: 'Alice Johnson', email: 'alice@academy.edu', specialization: 'Web Development' },
        { id: 't2', name: 'Brian Lee', email: 'brian@tech.edu', specialization: 'Data Science' },
        { id: 't3', name: 'Cynthia Park', email: 'cynthia@design.edu', specialization: 'UI/UX Design' },
        { id: 't4', name: 'Daniel Kim', email: 'daniel@mobile.edu', specialization: 'Mobile Development' },
        { id: 't5', name: 'Eva Martinez', email: 'eva@cloud.edu', specialization: 'DevOps' },
      ];

      setTimeout(() => {
        setTeachers(mockTeachers);
        setLoading(false);
      }, 400);
    };

    fetchTeachers();
  }, []);

  const handleInvite = (teacher: Teacher) => {
    alert(`Invitation sent to ${teacher.name} (${teacher.email})`);
    // 🔹 Later: replace alert with actual invite logic (API call, modal, etc.)
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading teachers...</p>
            </div>
          ) : (
            <div className="overflow-auto max-h-[600px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Specialization</th>
                    <th className="text-left p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((t) => (
                      <tr key={t.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{t.name}</td>
                        <td className="p-3">{t.email}</td>
                        <td className="p-3">{t.specialization}</td>
                        <td className="p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleInvite(t)}
                          >
                            Invite
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-6">
                        No teachers found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersPage;
