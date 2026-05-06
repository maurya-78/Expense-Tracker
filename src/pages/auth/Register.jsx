import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import FormField from '../../components/forms/FormField';

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log("Registering:", data);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create account
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Start managing your startup's finances today.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First Name">
            <Input {...register('firstName')} placeholder="Jane" />
          </FormField>
          <FormField label="Last Name">
            <Input {...register('lastName')} placeholder="Doe" />
          </FormField>
        </div>

        <FormField label="Work Email">
          <Input {...register('email')} type="email" placeholder="jane@startup.io" />
        </FormField>

        <FormField label="Company Name">
          <Input {...register('company')} placeholder="Acme Corp" />
        </FormField>

        <FormField label="Password">
          <Input {...register('password')} type="password" placeholder="••••••••" />
        </FormField>

        <Button type="submit" className="w-full h-11 mt-2">
          Get Started
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;