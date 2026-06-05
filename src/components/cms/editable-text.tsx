'use client';

import { useMemo, useState, useEffect } from 'react';
import { Pencil, Save } from 'lucide-react';
import { useContentBlock } from '@/hooks/use-content-block';
import { cn } from '@/lib/utils';

type EditableTextProps = {
  pageSlug: string;
  sectionKey: string;
  contentKey: string;
  defaultValue: string;
  className?: string;
  placeholder?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function EditableText({
  pageSlug,
  sectionKey,
  contentKey,
  defaultValue,
  className,
  placeholder,
  as: Component = 'span',
}: EditableTextProps) {
  const { value, canEdit, save, saving } = useContentBlock(
    pageSlug,
    sectionKey,
    contentKey,
    defaultValue,
    'text'
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const displayValue = useMemo(() => {
    const text = String(value || defaultValue || '');
    return text;
  }, [value, defaultValue]);

  const handleEdit = async () => {
    const next = window.prompt('Edit content for ' + contentKey, displayValue);
    if (next === null) return;
    if (next === displayValue) return;
    try {
      await save(next);
      setDraft(next);
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <Component className={cn(className, 'inline-flex items-center gap-2 group')}
      data-editable={canEdit ? 'true' : undefined}
      onDoubleClick={canEdit ? handleEdit : undefined}
    >
      <span dangerouslySetInnerHTML={{ __html: draft || displayValue || placeholder || '' }} />
      {canEdit && (
        <button
          type="button"
          onClick={handleEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-primary"
          aria-label={`Edit ${contentKey}`}
        >
          {saving ? <Save className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
        </button>
      )}
    </Component>
  );
}
