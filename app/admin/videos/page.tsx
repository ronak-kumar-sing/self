'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ExternalLink, Video } from 'lucide-react';

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    platform: 'YouTube' as 'YouTube' | 'Instagram' | 'LinkedIn' | 'Other',
    description: '',
    link: '',
  });

  // Fetch videos from API
  useEffect(() => {
    const syncAndFetch = async () => {
      setIsLoading(true);
      try {
        // Auto-sync YouTube videos
        await fetch('/api/videos?sync=true');
        // Then fetch the videos
        const response = await fetch('/api/videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        console.error('Error syncing/fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    syncAndFetch();
  }, []);

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      title: '',
      platform: 'YouTube',
      description: '',
      link: '',
    });
    setEditingVideo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingVideo ? 'PUT' : 'POST';
      const body = editingVideo
        ? { id: editingVideo._id, ...formData }
        : formData;

      const response = await fetch('/api/videos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await syncAndFetch();
        setIsDialogOpen(false);
        resetForm();
      }
    } catch (error) {
      alert('Error saving video');
      console.error(error);
    }
  };

  const handleEdit = (video: any) => {
    setEditingVideo(video);
    setFormData({
      date: video.date,
      title: video.title,
      platform: video.platform,
      description: video.description,
      link: video.link || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await fetch(`/api/videos?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await syncAndFetch();
        }
      } catch (error) {
        alert('Error deleting video');
        console.error(error);
      }
    }
  };

  const handleSyncYouTube = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/videos?sync=true');
      if (response.ok) {
        alert('✅ YouTube videos synced successfully!');
        const data = await response.json();
        setVideos(data);
      } else {
        alert('❌ Failed to sync YouTube videos');
      }
    } catch (error) {
      alert('❌ Error syncing YouTube videos');
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  const syncAndFetch = async () => {
    try {
      await fetch('/api/videos?sync=true');
      const response = await fetch('/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error syncing/fetching videos:', error);
    }
  };

  const sortedVideos = [...videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
          <p className="text-muted-foreground">
            Manage your video content. {videos.length} videos total
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(val: any) => setFormData({ ...formData, platform: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Video description..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">{editingVideo ? 'Save Changes' : 'Add Video'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-md border p-8 text-center">
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVideos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No videos yet. Click "Sync YouTube" or "Add Video" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                sortedVideos.map((video) => (
                  <TableRow key={video._id || video.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <span className="line-clamp-1">{video.title}</span>
                        {video.link && (
                          <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{video.platform}</TableCell>
                    <TableCell className="max-w-xs truncate" title={video.description}>{video.description || '-'}</TableCell>
                    <TableCell>{new Date(video.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(video)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(video._id || video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
