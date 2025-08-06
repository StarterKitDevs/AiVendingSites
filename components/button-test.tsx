"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ButtonTest() {
  return (
    <div className="p-8 space-y-6 bg-background">
      <h2 className="text-2xl font-bold text-foreground">Button Test Component</h2>
      
      {/* Gradient Button Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Gradient Button (Primary)</h3>
        <Button 
          variant="gradient"
          size="xl" 
          className="group hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
        >
          Get Your Website Now
          <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Outline Gradient Button Test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Outline Gradient Button (Secondary)</h3>
        <Button 
          variant="outlineGradient" 
          size="xl"
          className="hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
        >
          Try Starter Kit
        </Button>
      </div>

      {/* Standard Button Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Standard Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="gradient" size="sm">Small</Button>
          <Button variant="gradient" size="default">Default</Button>
          <Button variant="gradient" size="lg">Large</Button>
          <Button variant="gradient" size="xl">Extra Large</Button>
        </div>
      </div>
    </div>
  );
} 