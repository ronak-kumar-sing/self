'use client';

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { getStreakCount, getLast7Days, getYearlyStats } from '../../lib/utils';
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ExternalLink, Heart, Eye, Flame } from 'lucide-react';

export default function InstagramAdminPage() {
  const { instagramPosts, addInstagramPost, updateInstagramPost, deleteInstagramPost } = useStore();

  const yearlyStats = getYearlyStats(instagramPosts.map(p => p.date));

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    caption: '',
    type: 'Reel' as 'Reel' | 'Post' | 'Story' | 'Carousel',
    topic: '',
    link: '',
    likes: 0,
    views: 0,
  });

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().split('T')[0],
      caption: '',
      type: 'Reel',
      topic: '',
      link: '',
      likes: 0,
      views: 0,
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateInstagramPost(editingId, form);
    } else {
      addInstagramPost(form);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (post: typeof instagramPosts[0]) => {
    setForm({
      date: post.date,
      caption: post.caption,
      type: post.type,
      topic: post.topic,
      link: post.link || '',
      likes: post.likes || 0,
      views: post.views || 0,
    });
    setEditingId(post.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteInstagramPost(id);
    }
  };

  const streak = getStreakCount(instagramPosts.map(p => p.date));
  const totalViews = instagramPosts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalLikes = instagramPosts.reduce((acc, p) => acc + (p.likes || 0), 0);

  const sortedPosts = [...instagramPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Instagram Posts</h2>
          <p className="text-muted-foreground">
            Manage your social media presence. {yearlyStats.count} posts in {yearlyStats.currentYear}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0">
              <Plus className="mr-2 h-4 w-4" /> Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Post' : 'Add New Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(val: any) => setForm({ ...form, type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reel">Reel</SelectItem>
                      <SelectItem value="Post">Post</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                      <SelectItem value="Carousel">Carousel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  placeholder="e.g., Tech Tips, Coding Tutorial"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="Post caption..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link (optional)</Label>
                <Input
                  id="link"
                  type="url"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  placeholder="https://instagram.com/p/..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="views">Views</Label>
                  <Input
                    id="views"
                    type="number"
                    value={form.views}
                    onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="likes">Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    value={form.likes}
                    onChange={(e) => setForm({ ...form, likes: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0">
                  {editingId ? 'Update' : 'Add Post'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instagramPosts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Posts</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.length === 0 ? (
            <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              No posts yet. Add your first post!
            </div>
          ) : (
            sortedPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${post.type === 'Reel' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      post.type === 'Post' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        post.type === 'Story' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                      {post.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="mt-2 text-base leading-tight">{post.topic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{post.caption}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {post.views}</span>
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                    {post.link ? (
                      <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 text-sm flex items-center gap-1">
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : <div />}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(post)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
