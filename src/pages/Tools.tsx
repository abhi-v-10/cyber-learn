
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { Tool } from "@/lib/types";
import { PasswordAnalyzer } from "@/components/tools/PasswordAnalyzer";
import { PhishingDetector } from "@/components/tools/PhishingDetector";
import { EncryptionPlayground } from "@/components/tools/EncryptionPlayground";
import { KeyRound, Shield, Lock, ArrowLeft } from "lucide-react";

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const toolsData = await api.tools.getAll();
        setTools(toolsData);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  const getToolIcon = (type: string) => {
    switch (type) {
      case "password":
        return <KeyRound className="h-8 w-8 text-blue-500" />;
      case "phishing":
        return <Shield className="h-8 w-8 text-green-500" />;
      case "encryption":
        return <Lock className="h-8 w-8 text-purple-500" />;
      default:
        return <Shield className="h-8 w-8 text-gray-500" />;
    }
  };

  const renderSelectedTool = () => {
    if (!selectedTool) return null;

    switch (selectedTool.component) {
      case "PasswordAnalyzer":
        return <PasswordAnalyzer />;
      case "PhishingDetector":
        return <PhishingDetector />;
      case "EncryptionPlayground":
        return <EncryptionPlayground />;
      default:
        return <div>Tool not found</div>;
    }
  };

  if (loading) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="loader" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      {!selectedTool ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">Cybersecurity Tools</h1>
            <p className="text-muted-foreground text-lg">
              Practical tools to help you understand and implement cybersecurity concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  {getToolIcon(tool.type)}
                  <div>
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setSelectedTool(tool)} className="w-full">
                    Open Tool
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Button
            variant="outline"
            onClick={() => setSelectedTool(null)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>

          {renderSelectedTool()}
        </div>
      )}
    </Layout>
  );
};

export default Tools;
