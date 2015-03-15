# Cachelot Fast Memory Manager

## Why Another Memory Manager?

There are several reasons why cachelot has its memory manager (memalloc) for Items
 - Cachelot memalloc works within fixed amount if memory (this is the main restriction of a cache - memory volume)
 - eviction support: Items, allocated earlier, can be deallocated to give memory for a new item
 - it is very fast (up to 8x times faster than Linux / BSD CRT allocator in a synthetic benchmark)
 - Cachelot memalloc is single-threaded and doesn't suffer from locking
 - all operations are O(1) to enforce time constraint of a single request

## Memalloc Internals

The basic idea of cachelot memory manager is good old Doug Lea Malloc [1]; It implies the table of powers of 2. Each cell in the table contains the list of blocks (aka chunks or slabs) of sizes within corresponding power of two.
Table-based structure can guarantee O(1) complexity access to the certain size block. The main reason to make all blocks of power of 2 sizes is to avoid costly division while searching for a block of requested size, in virtue of bit hacks.
Unfortunately, plain table of powers of 2 suffers from huge memory overhead (up to 25% of allocated memory can be wasted on block alignment). This waste especially happens when for instance user asks to allocate memory amount, little bigger than power of two: asking 513 bytes leads to 1024 bytes allocation, and so on.
Cachelot allocator decreases memory overhead by further breaking each cell into the constant amount of sub-cells. Number of sub-cells per single powers of 2 is compile-time allocator parameter.

## Structure of the block

Each block consists of header:
``` C++
        struct {
            uint32 size : 31;   
            bool used : 1;      
            uint32 left_adjacent_offset;  
        } meta;

        struct link_type {
            link_type * prev, * next;
        } link;                 
```
 * `meta.size` is amount of memory available to the user (limited by 2<sup>31</sup> - 1)
 * `meta.used` indicates if block is used or free
 * `meta.left_adjacent_offset` is a distance in bytes from `this` to the left neighbord block in countiguous memory arena
 * `link` is for the intrusive list of blocks of the similar sizes  is for the intrusive (see [Blocks grouping][Blocks grouping] for the details)

Header followed by chunk of memory given to the user.

### Blocks grouping

Blocks of the similar size stored in the same *size class*, double-linked circular list of blocks

### Block split / merge and border blocks





## References

[1] Doug Lea Malloc
