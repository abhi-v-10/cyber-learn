
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  LogOut,
  Menu,
  MessageSquare,
  User,
  X,
  ShieldCheck,
  Home,
  Award
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5 mr-2" /> },
    { name: "Courses", path: "/courses", icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { name: "Quizzes", path: "/quizzes", icon: <ShieldCheck className="h-5 w-5 mr-2" /> },
    { name: "Chatbot", path: "/chatbot", icon: <MessageSquare className="h-5 w-5 mr-2" /> },
    { name: "Progress", path: "/progress", icon: <Award className="h-5 w-5 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">CyberEdu</span>
              </div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* User dropdown (desktop) */}
          <div className="hidden md:flex md:items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/progress")}>
                    <Award className="mr-2 h-4 w-4" />
                    <span>My Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")}>Sign up</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Button
                variant="outline"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
