import type {DataTableSchema} from '@/components/pages/homePage/dataTable/DataTable.schemas';
import {TableCell, TableRow} from '@/components/ui/shadcn/table';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {type Row, flexRender} from '@tanstack/react-table';

interface Props {
  row: Row<DataTableSchema>;
}

export function DraggableRow({row}: Props) {
  const {transform, transition, setNodeRef, isDragging} = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}
