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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Team Members</DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-gray-500'>
                        Ask them to copy and paste this link
                    </p>
                    <Input
                        className='mt-4'
                        readOnly
                        onClick={handleCopy}
                        value={origin ? `${origin}/join/${projectId}` : ''}
                    />
                </DialogContent>
            </Dialog>

            <Button size="sm" onClick={() => setOpen(true)}>
                Invite Members
            </Button>
        </>
    )
}

export default InviteButton;
