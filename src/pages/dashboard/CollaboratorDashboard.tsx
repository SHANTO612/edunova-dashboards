import { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Video, Upload } from 'lucide-react';

const CollaboratorDashboard = () => {
  const { marketerId } = useParams();
  const [searchParams] = useSearchParams();
  const marketerName = searchParams.get('name') || 'Collaborator';

  // Course metadata
  const [courseTitle, setCourseTitle] = useState('New Collaboration Course');
  const [courseDescription, setCourseDescription] = useState('Describe the course outcomes, audience, and structure.');

  // Simple module structure adapted from CourseContentModal
  type Module = {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUploaded: boolean;
  };

  const [modules, setModules] = useState<Module[]>([]);

  const addModule = () => {
    const id = Date.now().toString();
    setModules(prev => ([
      ...prev,
      { id, title: `Module ${prev.length + 1}`, description: '', duration: '', videoUploaded: false }
    ]));
  };

  const removeModule = (id: string) => setModules(prev => prev.filter(m => m.id !== id));
  const updateModule = (id: string, updates: Partial<Module>) => setModules(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  const handleVideoUpload = (id: string) => setModules(prev => prev.map(m => m.id === id ? { ...m, videoUploaded: true } : m));

  // Simple video list to act as "video card"
  const [videos, setVideos] = useState<Array<{ id: string; title: string; status: 'rendering' | 'ready' }>>([]);

  const header = useMemo(() => (
    `${marketerName} • Collaboration`
  ), [marketerName]);

  const createPreviewVideo = () => {
    const id = `v-${Date.now()}`;
    const title = modules[0]?.title ? `${modules[0].title} - Teaser` : 'Course Teaser';
    setVideos(prev => [...prev, { id, title, status: 'rendering' }]);
    setTimeout(() => {
      setVideos(prev => prev.map(v => v.id === id ? { ...v, status: 'ready' } : v));
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Video className="h-6 w-6" /> {header}</h1>
        <Badge variant="secondary">ID: {marketerId}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create Course Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input id="course-title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder="e.g., Advanced React Development" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea id="course-description" rows={4} value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} placeholder="What will students learn in this course?" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Modules</h3>
              <Button onClick={addModule}>
                <Upload className="h-4 w-4 mr-2" /> Add Module
              </Button>
            </div>

            <div className="space-y-4">
              {modules.map((m) => (
                <Card key={m.id} className="border-muted/60">
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Module Title</Label>
                        <Input value={m.title} onChange={(e) => updateModule(m.id, { title: e.target.value })} placeholder="Module title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input value={m.duration} onChange={(e) => updateModule(m.id, { duration: e.target.value })} placeholder="e.g., 45 minutes" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={m.description} onChange={(e) => updateModule(m.id, { description: e.target.value })} rows={2} placeholder="What will be covered in this module?" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {m.videoUploaded ? 'Video uploaded' : 'No video uploaded'}
                      </div>
                      <div className="flex items-center gap-2">
                        {!m.videoUploaded && (
                          <Button variant="outline" onClick={() => handleVideoUpload(m.id)}>
                            <Upload className="h-4 w-4 mr-2" /> Upload Video
                          </Button>
                        )}
                        <Button variant="ghost" onClick={() => removeModule(m.id)}>Remove</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {modules.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No modules yet. Click "Add Module" to start.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">Generate a short teaser from your first module to share with your collaborator.</div>
            <Button onClick={createPreviewVideo}>
              <Upload className="h-4 w-4 mr-2" /> Create Teaser
            </Button>
            <div className="space-y-3">
              {videos.length === 0 ? (
                <p className="text-sm text-muted-foreground">No teasers yet.</p>
              ) : (
                videos.map(v => (
                  <div key={v.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{v.title}</p>
                      <p className="text-xs text-muted-foreground">Status: {v.status}</p>
                    </div>
                    <Badge variant={v.status === 'ready' ? 'default' : 'secondary'}>{v.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;


