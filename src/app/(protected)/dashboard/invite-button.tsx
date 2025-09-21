"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useProject from '@/hooks/use-project';
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner';

const InviteButton = () => {
    const { projectId } = useProject();
    const [open, setOpen] = useState(false);
    const [origin, setOrigin] = useState(''); // Store origin here

    // Set origin only after component mounts on client
    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const handleCopy = () => {
        if (origin) {
            navigator.clipboard.writeText(`${origin}/join/${projectId}`);
            toast.success("copied to clipboard");
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Invite Team Members</DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-muted-foreground'>
                        Ask them to copy and paste this link
                    </p>
                    <div className="mt-4 space-y-2">
                        <Input
                            readOnly
                            onClick={handleCopy}
                            value={origin ? `${origin}/join/${projectId}` : ''}
                            className="text-xs sm:text-sm"
                        />
                        <Button 
                            onClick={handleCopy} 
                            variant="outline" 
                            className="w-full sm:w-auto"
                        >
                            Copy Link
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Button size="sm" onClick={() => setOpen(true)}>
                Invite Members
            </Button>
        </>
    )
}

export default InviteButton;
