import * as React from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/backorder');
}