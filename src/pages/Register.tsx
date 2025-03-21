
import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Layout } from "@/components/Layout";
import { ShieldCheck } from "lucide-react";

const Register = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">CyberEdu</span>
          </div>
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Join our platform to start your cybersecurity learning journey
          </p>
        </div>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
