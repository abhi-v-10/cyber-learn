
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Courses", href: "/courses" },
    { title: "Quizzes", href: "/quizzes" },
    { title: "Tools", href: "/tools" },
    { title: "Chatbot", href: "/chatbot" },
    { title: "Progress", href: "/progress" },
  ];

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          CyberLearn
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`text-muted-foreground hover:text-foreground transition-colors ${
                isActive(item.href) ? "text-foreground font-medium" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name?.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:inline">{user.name}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="hidden md:flex">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link to="/register">
                <Button size="sm" variant="default">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
