import { cn } from '@/lib/utils'

export function Heading1({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
                className
            )}
            {...props}
        />
    )
}

export function Heading2({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                'scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0',
                className
            )}
            {...props}
        />
    )
}

export function Heading3({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    )
}

export function Heading4({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-base sm:text-lg md:text-xl font-semibold tracking-tight',
                className
            )}
            {...props}
        />
    )
}

export function Paragraph({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn(
                'text-sm sm:text-base leading-6 sm:leading-7 [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
                className
            )}
            {...props}
        />
    )
}

export function Blockquote({
    className,
    ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote
            className={cn(
                'mt-4 sm:mt-6 border-l-2 pl-4 sm:pl-6 italic text-sm sm:text-base',
                className
            )}
            {...props}
        />
    )
}

export function List({
    className,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul
            className={cn(
                'my-4 sm:my-6 ml-4 sm:ml-6 list-disc [&>li]:mt-1.5 sm:[&>li]:mt-2 text-sm sm:text-base',
                className
            )}
            {...props}
        />
    )
}

export function InlineCode({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <code
            className={cn(
                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs sm:text-sm font-semibold',
                className
            )}
            {...props}
        />
    )
}

export function Lead({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn(
                'text-base sm:text-lg md:text-xl text-muted-foreground',
                className
            )}
            {...props}
        />
    )
}

export function Large({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('text-base sm:text-lg font-semibold', className)}
            {...props}
        />
    )
}

export function Small({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <small
            className={cn(
                'text-xs sm:text-sm font-medium leading-none',
                className
            )}
            {...props}
        />
    )
}

export function Muted({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn(
                'text-xs sm:text-sm text-muted-foreground',
                className
            )}
            {...props}
        />
    )
}
