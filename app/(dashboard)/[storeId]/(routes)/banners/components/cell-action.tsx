'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BannerColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

interface CellActionProps {
    data: BannerColumn
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Banner Id berhasil di copy")
    }

    const onDelete = async () => {
        try {
          await axios.delete(`/api/stores/${params.storeId}/banners/${data.id}`);
          router.refresh();
          router.push(`/${params.storeId}/banners`);
          toast.success("Banner berhasil dihapus");
        } catch (error) {
          toast.error("Cek kembali data dan koneksimu");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };

    return (
        <>
        <div className="flex items-center gap-x-2"> 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className=" h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/banners/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </>
    )
}