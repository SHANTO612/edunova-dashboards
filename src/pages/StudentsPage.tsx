import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  institution: string;
}

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching students data
    const fetchStudents = () => {
      setLoading(true);
      
      // Mock data - in a real app, this would come from an API
      const mockStudents: Student[] = [
        { id: '1', name: 'John Doe', email: 'john.doe@university.edu', institution: 'University of Technology' },
        { id: '2', name: 'Jane Smith', email: 'jane.smith@college.edu', institution: 'College of Arts' },
        { id: '3', name: 'Robert Johnson', email: 'robert.j@institute.edu', institution: 'Institute of Science' },
        { id: '4', name: 'Emily Davis', email: 'emily.davis@academy.edu', institution: 'Academy of Design' },
        { id: '5', name: 'Michael Brown', email: 'michael.b@university.edu', institution: 'University of Technology' },
        { id: '6', name: 'Sarah Wilson', email: 'sarah.w@college.edu', institution: 'College of Arts' },
        { id: '7', name: 'David Miller', email: 'david.m@institute.edu', institution: 'Institute of Science' },
        { id: '8', name: 'Lisa Taylor', email: 'lisa.t@academy.edu', institution: 'Academy of Design' },
        { id: '9', name: 'James Anderson', email: 'james.a@university.edu', institution: 'University of Technology' },
        { id: '10', name: 'Jennifer Thomas', email: 'jennifer.t@college.edu', institution: 'College of Arts' },
        { id: '11', name: 'Daniel White', email: 'daniel.w@institute.edu', institution: 'Institute of Science' },
        { id: '12', name: 'Karen Martin', email: 'karen.m@academy.edu', institution: 'Academy of Design' },
      ];
      
      setTimeout(() => {
        setStudents(mockStudents);
        setLoading(false);
      }, 500);
    };
    
    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading students...</p>
            </div>
          ) : (
            <div className="overflow-auto max-h-[600px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Institution</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.email}</td>
                        <td className="p-3">{student.institution}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center p-6">
                        No students found matching your search.
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

export default StudentsPage;