import React from 'react';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { isUUID } from '@/lib/validators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: { folderId: string };
};

export default async function CourseFolderPage({ params }: Props) {
  const { folderId } = params;

  const identifierIsUUID = isUUID(String(folderId));
  const db = await getDb();
  const folder = identifierIsUUID
    ? await db.collection('course_folders').findOne({ _id: new ObjectId(folderId) })
    : await db.collection('course_folders').findOne({ slug: folderId });

  const realFolderId = folder?._id?.toString() || null;

  const subfolders = await db.collection('course_folders')
    .find({ parent_folder_id: realFolderId })
    .sort({ sort_order: 1 })
    .toArray();

  const contents = await db.collection('course_contents')
    .find({ folder_id: realFolderId })
    .sort({ sort_order: 1 })
    .toArray();

  return (
    <div className="w-full bg-background">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          <header className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-headline font-bold">{folder?.title || 'Course'}</h1>
              {folder?.is_paid ? (
                <Badge className="bg-amber-500/10 text-amber-500 border-none px-3 py-1">Paid Module</Badge>
              ) : (
                <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1">Free Module</Badge>
              )}
            </div>
            <p className="text-muted-foreground">{folder?.description}</p>
          </header>

          {subfolders && subfolders.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Sections</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {subfolders.map((sf: any) => (
                  <Card key={sf._id?.toString() || sf.id} className="rounded-2xl">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{sf.title}</CardTitle>
                        {sf.is_paid ? (
                          <Badge className="bg-amber-500/10 text-amber-500 border-none">Paid</Badge>
                        ) : (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Free</Badge>
                        )}
                      </div>
                      <CardDescription>{sf.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-end">
                        <Link href={`/courses/${sf._id || sf.id}`} className="text-primary font-bold">Open</Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">Content</h2>
            {!contents || contents.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">No content available for this folder.</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {contents.map((item: any) => (
                  <Card key={item._id?.toString() || item.id} className="rounded-2xl overflow-hidden">
                    <div className="relative h-40 w-full bg-muted/20">
                      {item.thumbnail_url ? (
                        // Use next/image for thumbnails when available
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.thumbnail_url} alt={item.title} className="h-40 w-full object-cover" />
                      ) : item.item_type?.startsWith('image') && item.file_url ? (
                        <Image src={item.file_url} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="h-40 w-full flex items-center justify-center text-muted-foreground">{item.item_type?.toUpperCase() || 'FILE'}</div>
                      )}
                    </div>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <div className="text-xs text-muted-foreground">{item.file_name || item.item_type}</div>
                        </div>
                        <Badge className="bg-muted/50">{item.item_type}</Badge>
                      </div>
                    </CardContent>
                    <div className="p-4 border-t bg-muted/10 flex items-center justify-between">
                      <a href={item.file_url} target="_blank" rel="noreferrer" className="text-sm text-primary font-bold">Open</a>
                      {item.item_type === 'pdf' && item.file_url && (
                        <a href={item.file_url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground">Preview PDF</a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
