import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Video, Upload, Wand2, FileText, Plus, Trash2, User, Book, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Module {
  id: string;
  title: string;
  description: string;
  videoUploaded: boolean;
  video: File | null;
  videoPreview: string | null;
  duration: string;
}

import { Course } from '@/types/course';
import { useCourses } from '@/hooks/useCourses';

interface CourseContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editCourse?: Course; // Course to edit, if in edit mode
}

const CourseContentModal = ({ open, onOpenChange, editCourse }: CourseContentModalProps) => {
  const { createCourse, updateCourse } = useCourses();
  
  // Course metadata
  const [courseTitle, setCourseTitle] = useState(editCourse?.title || "");
  const [courseDescription, setCourseDescription] = useState(editCourse?.description || "");
  const [courseCategory, setCourseCategory] = useState(editCourse?.category || "");
  const [coursePrice, setCoursePrice] = useState(editCourse?.price?.toString() || "");
  const [courseDuration, setCourseDuration] = useState(editCourse?.duration || "");
  const [instructorName, setInstructorName] = useState(editCourse?.instructor || "");
  const [instructorBio, setInstructorBio] = useState(editCourse?.instructorBio || "");
  const [currentTab, setCurrentTab] = useState("overview");
  
  // Course modules
  const [modules, setModules] = useState<Module[]>(() => {
    const initialModules = editCourse?.modules ? [...editCourse.modules] : [];
    console.log('Initializing modules:', initialModules);
    return initialModules;
  });

  useEffect(() => {
    if (editCourse?.modules) {
      console.log('Setting initial modules from editCourse:', editCourse.modules);
      setModules(editCourse.modules);
    }
  }, [editCourse]);

  useEffect(() => {
    console.log('Modules state updated:', modules);
  }, [modules]);

  // Video editing states
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  
  // Video editing parameters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [noiseReduction, setNoiseReduction] = useState(0);
  const [focusEnhancement, setFocusEnhancement] = useState(false);
  
  // Video metadata
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  
  // AI notes
  const [aiNotes, setAiNotes] = useState("");
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  
  // Refs
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: "",
      videoUploaded: false,
      video: null,
      videoPreview: null,
      duration: ""
    };
    console.log('Adding new module:', newModule);
    setModules(prevModules => {
      console.log('Previous modules:', prevModules);
      const updated = [...prevModules, newModule];
      console.log('Updated modules:', updated);
      return updated;
    });
  };

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, ...updates } : m
    ));
  };
  
  // Handle video upload for a specific module
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>, moduleId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateModule(moduleId, {
        video: file,
        videoPreview: url,
        videoUploaded: true
      });
      setSelectedModuleId(moduleId);
      setCurrentTab("video-edit");
    }
  };
  
  // Handle AI editing for the selected video
  const handleAIEditing = () => {
    if (!selectedModuleId) return;
    
    setIsAIProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setBrightness(110);
      setContrast(115);
      setNoiseReduction(65);
      setFocusEnhancement(true);
      
      setAiNotes("This video covers key concepts of the module including main topics, examples, and practical applications. The content is well-structured and provides clear explanations of complex ideas.");
      
      setIsAIProcessing(false);
    }, 2000);
  };
  
  // Handle course publishing
  const handlePublish = async () => {
    try {
      // Process modules to handle file objects and preserve existing module data
      const processedModules = modules.map(module => {
        return {
          id: module.id,
          title: module.title,
          description: module.description,
          videoUploaded: module.videoUploaded,
          video: null, // Required by ModuleData type
          videoPreview: module.videoPreview || null,
          duration: module.duration
        };
      });

      const courseData = {
        title: courseTitle,
        description: courseDescription,
        category: courseCategory,
        price: parseFloat(coursePrice),
        duration: courseDuration,
        instructor: instructorName,
        instructorBio: instructorBio,
        modules: processedModules
      };

      if (editCourse) {
        console.log('Updating course with data:', courseData);
        await updateCourse(editCourse.id, courseData);
        alert(`Course "${courseTitle}" has been updated successfully!`);
      } else {
        await createCourse(courseData);
        alert(`Course "${courseTitle}" has been published successfully!`);
      }
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error publishing course:', error);
      alert('Error publishing course. Please try again.');
    }
  };
  
  // Handle AI notes generation
  const handleGenerateNotes = () => {
    setIsGeneratingNotes(true);
    
    // Simulate AI notes generation
    setTimeout(() => {
      setAiNotes("This video covers key concepts of the module including main topics, examples, and practical applications. The content is well-structured and provides clear explanations of complex ideas.");
      setIsGeneratingNotes(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editCourse ? 'Edit Course Content' : 'Create Course Content'}</DialogTitle>
          <DialogDescription>
            Upload and edit videos for your course modules
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="video-edit" disabled={!selectedModuleId}>
              Video Editor
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input 
                  id="course-title" 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="e.g., Advanced React Development"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea 
                  id="course-description" 
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="What will students learn in this course?"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={courseCategory} onValueChange={setCourseCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    placeholder="e.g., 8 weeks"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                    placeholder="99.99"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Course Modules</h3>
              <Button onClick={addModule}>
                <Plus className="h-4 w-4 mr-2" /> Add Module
              </Button>
            </div>
            
            <div className="space-y-4">
              {modules.map((module, index) => (
                <Card key={module.id} className="relative">
                  <CardContent className="pt-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => removeModule(module.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Module Title</Label>
                          <Input
                            value={module.title}
                            onChange={(e) => updateModule(module.id, { title: e.target.value })}
                            placeholder="Module title"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={module.duration}
                            onChange={(e) => updateModule(module.id, { duration: e.target.value })}
                            placeholder="e.g., 45 minutes"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={module.description}
                          onChange={(e) => updateModule(module.id, { description: e.target.value })}
                          placeholder="What will be covered in this module?"
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          {module.videoUploaded ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Video className="h-4 w-4" />
                              <span>Video uploaded</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedModuleId(module.id)}
                              >
                                Edit Video
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                id={`video-${module.id}`}
                                onChange={(e) => handleVideoUpload(e, module.id)}
                              />
                              <Button
                                variant="outline"
                                onClick={() => document.getElementById(`video-${module.id}`)?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" /> Upload Video
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {modules.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No modules added yet. Click "Add Module" to start building your course.
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Instructor Tab */}
          <TabsContent value="instructor" className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor-name">Instructor Name</Label>
                <Input 
                  id="instructor-name" 
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor-bio">About the Instructor</Label>
                <Textarea 
                  id="instructor-bio" 
                  value={instructorBio}
                  onChange={(e) => setInstructorBio(e.target.value)}
                  placeholder="Share your expertise and teaching experience"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Video Editor Tab */}
          <TabsContent value="video-edit" className="space-y-6 py-4">
            {selectedModuleId && (
              <>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video 
                    src={modules.find(m => m.id === selectedModuleId)?.videoPreview || ''}
                    controls 
                    className="w-full h-full"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%)`
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Brightness</Label>
                        <span className="text-sm text-muted-foreground">{brightness}%</span>
                      </div>
                      <Slider 
                        value={[brightness]} 
                        min={50} 
                        max={150} 
                        step={1}
                        onValueChange={(value) => setBrightness(value[0])} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Contrast</Label>
                        <span className="text-sm text-muted-foreground">{contrast}%</span>
                      </div>
                      <Slider 
                        value={[contrast]} 
                        min={50} 
                        max={150} 
                        step={1}
                        onValueChange={(value) => setContrast(value[0])} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Noise Reduction</Label>
                        <span className="text-sm text-muted-foreground">{noiseReduction}%</span>
                      </div>
                      <Slider 
                        value={[noiseReduction]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => setNoiseReduction(value[0])} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="focus-enhancement">Focus Enhancement</Label>
                      <Switch 
                        id="focus-enhancement" 
                        checked={focusEnhancement}
                        onCheckedChange={setFocusEnhancement}
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleAIEditing}
                      disabled={isAIProcessing}
                    >
                      {isAIProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" /> AI Enhance Video
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* AI Notes Section */}
                <div className="space-y-2 border rounded-md p-4 bg-slate-50">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="ai-notes">AI Generated Notes</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateNotes}
                      disabled={isGeneratingNotes}
                    >
                      {isGeneratingNotes ? "Generating..." : "Generate Notes"}
                    </Button>
                  </div>
                  <Textarea 
                    id="ai-notes" 
                    value={aiNotes}
                    onChange={(e) => setAiNotes(e.target.value)}
                    placeholder="AI will generate notes based on your video content"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setCurrentTab("curriculum")}>
                    Back to Curriculum
                  </Button>
                  <Button onClick={() => setSelectedModuleId(null)}>
                    Save Video Changes
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePublish}
            disabled={!courseTitle || !courseDescription || !instructorName || modules.length === 0}
          >
            <FileText className="h-4 w-4 mr-2" /> {editCourse ? 'Save Changes' : 'Publish Course'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseContentModal;