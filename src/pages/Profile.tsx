import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Mail, User, Award, Shield, Check, X } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    toast.success("You have been logged out successfully");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        ...user,
        name
      });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center py-12">
          <p>Please log in to view your profile.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-muted-foreground text-lg">
            Manage your account and view your achievements
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <Card className="hover-glow">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user.name?.substring(0, 2).toUpperCase() || user.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.name || user.username}</CardTitle>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </CardHeader>
            <CardContent className="text-center pb-0">
              <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Award className="mr-1 h-3.5 w-3.5" />
                {user.progress.title}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Level</span>
                  </div>
                  <span className="font-medium">{user.progress.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined</span>
                  </div>
                  <span className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-6">
              <Button variant="outline" onClick={() => navigate("/progress")}>
                View Progress
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  Account Information
                  {editing ? (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditing(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="default"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        value={user.username}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Username cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        disabled={!editing}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={email}
                        className="pl-10"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
                {!editing && (
                  <Button onClick={() => setEditing(true)}>Update Profile</Button>
                )}
              </CardFooter>
            </Card>

            <Card className="hover-glow">
              <CardHeader>
                <CardTitle className="text-xl">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Current Title</p>
                        <p className="text-sm text-muted-foreground">
                          {user.progress.title}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/progress")}>
                      View All
                    </Button>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">Quizzes Completed</p>
                        <p className="text-sm text-muted-foreground">
                          {user.progress.completedQuizzes.length} quizzes
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/quizzes")}>
                      Take Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
