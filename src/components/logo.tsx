import { Table2, TableProperties } from "lucide-react";

export default function Logo() {
    return(
        <div className="relative h-8 flex items-center rounded-md justify-center w-8 bg-rose-400">
            <Table2 size={16} className="absolute"/>
            <TableProperties size={16} className="absolute right-1 bottom-1"/>
        </div>
    );
}
