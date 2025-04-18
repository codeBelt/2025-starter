'use client';
import {Button} from '@/components/ui/shadcn/button';
import {useColorScheme} from '@/hooks/useColorScheme/useColorScheme';
import {Moon, Sun} from 'lucide-react';

export function ColorSchemeToggle() {
  const {toggle, scheme} = useColorScheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {scheme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
