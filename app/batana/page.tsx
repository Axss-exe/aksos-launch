import type { Metadata } from 'next'
import { BatanaPage } from '@/components/batana-page'

export const metadata: Metadata = {
  title: 'Project Batana — Better routes for serious objectives | AKSOS',
  description: 'Project Batana is an early AKSOS pilot exploring how people, knowledge and opportunity can be connected more deliberately in Zimbabwe.',
  alternates: { canonical: '/batana' },
  openGraph: { title: 'Project Batana — Better routes for serious objectives', description: 'An early pilot by AKSOS for people trying to do serious things in Zimbabwe.', type: 'website', url: '/batana' },
}

export default function BatanaRoute() { return <BatanaPage /> }
