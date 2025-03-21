
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle, Shield, AlertCircle } from "lucide-react";

export const PhishingDetector = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [urlResult, setUrlResult] = useState<{
    isSuspicious: boolean;
    score: number;
    reasons: string[];
  } | null>(null);
  const [emailResult, setEmailResult] = useState<{
    isSuspicious: boolean;
    score: number;
    reasons: string[];
  } | null>(null);

  const analyzeUrl = () => {
    if (!url) return;

    const suspiciousPatterns = [
      { pattern: /http:\/\/(?!localhost)/, reason: "Uses insecure HTTP instead of HTTPS" },
      { pattern: /\.(tk|ml|ga|cf|gq|top)/, reason: "Uses a free domain commonly associated with phishing" },
      { pattern: /^https:\/\/(?:[^\/]*\.)?[^\/]*\.(?:[^\/\.]*\.)[^\/\.]*\//, reason: "Contains multiple subdomains (potential typosquatting)" },
      { pattern: /[^\w\s\.:\/\-\?\&\=\%]/, reason: "Contains unusual characters in the URL" },
      { pattern: /(paypal|apple|microsoft|amazon|google|facebook|instagram|netflix|bank|login|secure|account|verify|update|confirm).*\.(info|xyz|online|site)/, reason: "Combines trusted brand with unusual TLD" },
      { pattern: /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, reason: "Uses IP address instead of domain name" },
      { pattern: /url=|redirect=|return=|redir=/, reason: "Contains redirection parameters" },
      { pattern: /(wellsfargo|citibank|bankofamerica|chase|usbank)(?!\.com)/, reason: "Banking name not on official domain" },
      { pattern: /(signin|login|authenticate|authorize|verification|secure|account)(?!.\.(com|net|org))/, reason: "Security-related term in unusual domain" },
      { pattern: /bit\.ly|goo\.gl|tinyurl\.com|t\.co|is\.gd/, reason: "Uses URL shortening service that can mask actual destination" }
    ];

    const reasons: string[] = [];
    suspiciousPatterns.forEach(({ pattern, reason }) => {
      if (pattern.test(url.toLowerCase())) {
        reasons.push(reason);
      }
    });

    // Calculate score (0-100)
    const score = Math.max(0, 100 - (reasons.length * 15));
    const isSuspicious = score < 70;

    // Add general feedback if no specific issues found
    if (reasons.length === 0 && !isSuspicious) {
      reasons.push("No obvious phishing indicators detected. However, always verify the source.");
    }

    setUrlResult({
      isSuspicious,
      score,
      reasons,
    });
  };

  const analyzeEmail = () => {
    if (!email) return;

    const suspiciousPatterns = [
      { pattern: /urgent|immediate action|account suspended|verify your account|security alert/i, reason: "Uses urgent or alarming language" },
      { pattern: /dear customer|valued customer|account holder/i, reason: "Uses generic greeting instead of your name" },
      { pattern: /won|winner|lottery|prize|inheritance|million|billion/i, reason: "Promises money or prizes" },
      { pattern: /click here|log in to confirm|verify now|update immediately/i, reason: "Contains urgent call to action" },
      { pattern: /ssn|social security|tax|irs|government|fbi|cia/i, reason: "References government agencies or personal identification" },
      { pattern: /password|username|login credentials|verify details/i, reason: "Asks for sensitive information" },
      { pattern: /banking details|credit card|wire transfer|western union/i, reason: "Mentions financial transaction information" },
      { pattern: /bitcoin|crypto|cryptocurrency|wallet address/i, reason: "Mentions cryptocurrency" },
      { pattern: /attachment|download|open the attached|view document/i, reason: "Encourages downloading attachments" },
      { pattern: /from.*@(?!gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|icloud\.com|protonmail\.com|mail\.com).{2,}\..{2,}/i, reason: "Suspicious sender email domain" }
    ];

    const reasons: string[] = [];
    suspiciousPatterns.forEach(({ pattern, reason }) => {
      if (pattern.test(email.toLowerCase())) {
        reasons.push(reason);
      }
    });

    // Calculate score (0-100)
    const score = Math.max(0, 100 - (reasons.length * 10));
    const isSuspicious = score < 70;

    // Add general feedback if no specific issues found
    if (reasons.length === 0 && !isSuspicious) {
      reasons.push("No obvious phishing indicators detected. However, always verify the source.");
    }

    setEmailResult({
      isSuspicious,
      score,
      reasons,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Phishing Detection Tool</h2>
        <p className="text-muted-foreground mt-2">
          Check URLs and emails for potential phishing attempts and learn how to spot them.
        </p>
      </div>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="url">Check URL</TabsTrigger>
          <TabsTrigger value="email">Analyze Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>URL Checker</CardTitle>
              <CardDescription>
                Enter a URL to analyze for phishing indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter a URL (e.g., https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={analyzeUrl}>Check</Button>
              </div>

              {urlResult && (
                <div className={`mt-4 p-4 rounded-md ${urlResult.isSuspicious ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {urlResult.isSuspicious ? (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    ) : (
                      <Shield className="h-6 w-6 text-green-500" />
                    )}
                    <h3 className="font-semibold text-lg">
                      {urlResult.isSuspicious ? 'Potential Phishing Detected' : 'Likely Safe'}
                    </h3>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${urlResult.isSuspicious ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${urlResult.score}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm mt-1">
                      Safety Score: {urlResult.score}/100
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Analysis Details:</h4>
                    <ul className="space-y-1">
                      {urlResult.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          {urlResult.isSuspicious ? (
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-sm">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Identify Suspicious URLs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Check for HTTPS and a valid SSL certificate</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Look for misspellings or substituted characters</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Be wary of URLs with IP addresses instead of domain names</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Verify the domain name before entering sensitive information</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Don't trust URLs in unsolicited emails or messages</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Content Analyzer</CardTitle>
              <CardDescription>
                Paste email content to check for phishing indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste email content here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[200px]"
              />
              <Button onClick={analyzeEmail}>Analyze</Button>

              {emailResult && (
                <div className={`mt-4 p-4 rounded-md ${emailResult.isSuspicious ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {emailResult.isSuspicious ? (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    ) : (
                      <Shield className="h-6 w-6 text-green-500" />
                    )}
                    <h3 className="font-semibold text-lg">
                      {emailResult.isSuspicious ? 'Potential Phishing Detected' : 'Likely Safe'}
                    </h3>
                  </div>
                  
                  <div className="mb-3">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${emailResult.isSuspicious ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${emailResult.score}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm mt-1">
                      Safety Score: {emailResult.score}/100
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Analysis Details:</h4>
                    <ul className="space-y-1">
                      {emailResult.reasons.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          {emailResult.isSuspicious ? (
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-sm">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Email Phishing Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Urgent calls to action or threats</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Generic greetings instead of your name</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Poor grammar and spelling mistakes</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Requests for personal information</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Suspicious attachments or links</span>
                </li>
                <li className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Sender email address doesn't match the claimed organization</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
