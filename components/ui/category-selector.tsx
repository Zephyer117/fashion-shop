"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({
    categories,
}: CategorySelectorProps) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null); // Refined state type
    const router = useRouter();

    const handleSelectCategory = (category: Category) => {
        setValue(category._id);
        router.push(`/categories/${category.slug?.current}`);
        setOpen(false);
    };

    const handleSearch = (searchTerm: string) => {
        const selectedCategory = categories.find((category) =>
            category.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (selectedCategory?.slug?.current) {
            setValue(selectedCategory._id);
            router.push(`/categories/${selectedCategory.slug.current}`);
            setOpen(false);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter By Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search Category..."
                        className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(e.currentTarget.value);
                            }
                        }}
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => handleSelectCategory(category)}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
