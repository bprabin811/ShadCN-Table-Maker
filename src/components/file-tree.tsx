import { File, Folder } from 'lucide-react';
import React from 'react';

interface FileTreeItem {
  id: number;
  name: string;
  type: 'folder' | 'file';
  parent: number | null;
}

const data: FileTreeItem[] = [
  { id: 1, name: 'components', type: 'folder', parent: null },
  { id: 3, name: 'form.tsx', type: 'file', parent: 1 },
  { id: 4, name: 'data-table.tsx', type: 'file', parent: 1 },
  { id: 5, name: 'column.tsx', type: 'file', parent: 1 },
  { id: 6, name: 'types', type: 'folder', parent: null },
  { id: 7, name: 'table.ts', type: 'file', parent: 6 },
];

export function FileTree() {
  const renderTree = (parentId: number | null = null, depth: number = 0) => {
    return data
      .filter((item) => item.parent === parentId)
      .map((item) => (
        <div
          key={item.id}
          style={{ marginLeft: `${depth * 16}px` }} // Use inline styles for indentation
        >
          <div className='flex items-center gap-2'>{item.type === 'folder' ? <Folder size={16}/> : <File size={16}/>}
          {item.name}</div>
          {item.type === 'folder' && renderTree(item.id, depth + 1)}
        </div>
      ));
  };

  return <div className="font-mono">{renderTree()}</div>;
}
