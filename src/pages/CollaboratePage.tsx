import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Handshake, Video, Check, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

type Marketer = {
  id: string;
  name: string;
  specialization: string;
  videosProduced: number;
  rating: number;
};

type Invitation = {
  id: string;
  marketerId: string;
  marketerName: string;
  status: 'pending' | 'accepted';
};

const dummyMarketers: Marketer[] = [
  { id: 'm1', name: 'Media Maven Co.', specialization: 'YouTube Growth', videosProduced: 320, rating: 4.8 },
  { id: 'm2', name: 'EduBoost Studio', specialization: 'Shorts & Reels', videosProduced: 180, rating: 4.6 },
  { id: 'm3', name: 'CourseCraft Media', specialization: 'Course Trailers', videosProduced: 95, rating: 4.7 },
  { id: 'm4', name: 'ViralLearn Agency', specialization: 'Performance Marketing', videosProduced: 240, rating: 4.5 },
];

const initials = (name: string) => name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();

const CollaboratePage = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    // Simulate fetching pending invitations sent by marketers to this educator
    const t = setTimeout(() => {
      setInvitations([
        { id: 'inv-m2', marketerId: 'm2', marketerName: 'EduBoost Studio', status: 'pending' },
        { id: 'inv-m4', marketerId: 'm4', marketerName: 'ViralLearn Agency', status: 'pending' },
      ]);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const marketers = useMemo(() => {
    if (!search.trim()) return dummyMarketers;
    const q = search.toLowerCase();
    return dummyMarketers.filter(m =>
      m.name.toLowerCase().includes(q) || m.specialization.toLowerCase().includes(q)
    );
  }, [search]);

  const accept = (invId: string) => {
    setInvitations(prev => prev.map(i => i.id === invId ? { ...i, status: 'accepted' } : i));
  };

  const connections = invitations.filter(i => i.status === 'accepted');
  const pending = invitations.filter(i => i.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Handshake className="h-6 w-6" /> Collaborate</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Find Marketers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search marketers..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-40 flex items-center justify-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {marketers.map(m => (
                  <Card key={m.id} className="border-muted/60">
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{initials(m.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold truncate">{m.name}</p>
                          <Badge variant="secondary">{m.rating.toFixed(1)}★</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{m.specialization}</p>
                        <p className="text-xs text-muted-foreground">{m.videosProduced} videos</p>
                      </div>
                      {/* Educator cannot invite; invites are initiated by marketers */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              {pending.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending invitations.</p>
              ) : (
                <div className="space-y-3">
                  {pending.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{inv.marketerName}</p>
                        <p className="text-xs text-muted-foreground">Invitation from marketer</p>
                      </div>
                      <Button size="sm" onClick={() => accept(inv.id)}>
                        <Check className="h-4 w-4 mr-1" /> Accept
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connections</CardTitle>
            </CardHeader>
            <CardContent>
              {connections.length === 0 ? (
                <p className="text-sm text-muted-foreground">No accepted connections yet.</p>
              ) : (
                <div className="space-y-3">
                  {connections.map(c => (
                    <Card key={c.id} className="border-muted/60">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{c.marketerName}</p>
                          <p className="text-xs text-muted-foreground">Connected • Access marketer dashboard</p>
                        </div>
                        <Button asChild size="sm" variant="secondary">
                          <Link to={`/collaborator/${c.marketerId}?name=${encodeURIComponent(c.marketerName)}`}><Video className="h-4 w-4 mr-1" /> Go to dashboard</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollaboratePage;


