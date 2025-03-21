
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, XCircle, InfoIcon } from "lucide-react";

export const PasswordAnalyzer = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<{
    score: number;
    feedback: string[];
    strength: "weak" | "medium" | "strong";
  } | null>(null);

  const analyzePassword = () => {
    if (!password) return;

    // Basic password strength analysis
    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length < 8) {
      feedback.push("Password is too short. Use at least 8 characters.");
    } else {
      score += 20;
    }

    // Complexity checks
    if (/[A-Z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("Add uppercase letters for stronger security.");
    }

    if (/[a-z]/.test(password)) {
      score += 20;
    } else {
      feedback.push("Add lowercase letters for stronger security.");
    }

    if (/[0-9]/.test(password)) {
      score += 20;
    } else {
      feedback.push("Add numbers for stronger security.");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 20;
    } else {
      feedback.push("Add special characters for stronger security.");
    }

    // Common password patterns
    const commonPatterns = [
      "password",
      "123456",
      "qwerty",
      "admin",
      "welcome",
      "letmein",
    ];

    if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      score = Math.max(0, score - 30);
      feedback.push("Your password contains common patterns that are easy to guess.");
    }

    // Sequential characters
    if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
      score = Math.max(0, score - 20);
      feedback.push("Your password contains sequential characters that are easy to guess.");
    }

    // Determine strength category
    let strength: "weak" | "medium" | "strong" = "weak";
    if (score >= 80) {
      strength = "strong";
      if (feedback.length === 0) {
        feedback.push("Excellent password! Very strong and secure.");
      }
    } else if (score >= 50) {
      strength = "medium";
      if (feedback.length === 0) {
        feedback.push("Good password, but could be improved.");
      }
    } else {
      if (feedback.length === 0) {
        feedback.push("Weak password. Consider making it stronger.");
      }
    }

    setResult({
      score,
      feedback,
      strength,
    });
  };

  const getProgressColor = () => {
    if (!result) return "bg-gray-200";
    if (result.strength === "strong") return "bg-green-500";
    if (result.strength === "medium") return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStrengthIcon = () => {
    if (!result) return null;
    if (result.strength === "strong") {
      return <CheckCircle className="h-8 w-8 text-green-500" />;
    }
    if (result.strength === "medium") {
      return <AlertCircle className="h-8 w-8 text-yellow-500" />;
    }
    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Password Strength Analyzer</h2>
        <p className="text-muted-foreground mt-2">
          Check how strong your password is and get tips to improve it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Your Password</CardTitle>
          <CardDescription>
            Enter a password to analyze its strength. We don't store your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter a password to check"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzePassword}>Analyze</Button>
          </div>

          {result && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Password Strength:</span>
                <span className="capitalize font-semibold">{result.strength}</span>
              </div>

              <div>
                <Progress 
                  value={result.score} 
                  className={`h-2 ${getProgressColor()}`} 
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Weak</span>
                  <span>Medium</span>
                  <span>Strong</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-3 items-start">
                  {getStrengthIcon()}
                  <div>
                    <h4 className="font-semibold mb-2">Analysis Results</h4>
                    <ul className="space-y-2">
                      {result.feedback.map((item, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <InfoIcon className="h-4 w-4 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password Security Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Use at least 12 characters, mixing letters, numbers, and symbols</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Don't use personal information (birthdays, names, etc.)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Avoid common words and patterns</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Use different passwords for different accounts</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Consider using a password manager</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
