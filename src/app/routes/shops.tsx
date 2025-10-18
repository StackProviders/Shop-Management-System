export default function ShopsPage() {
    return (
        <div className="min-h-screen w-full bg-background relative">
            {/*  Diagonal Cross Grid Background */}
            <div
                className="absolute inset-0 bg-[length:40px_40px] z-0"
                style={{
                    backgroundImage: `
        linear-gradient(45deg, transparent 49%, rgb(229 231 235) 49%, rgb(229 231 235) 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, rgb(229 231 235) 49%, rgb(229 231 235) 51%, transparent 51%)
      `
                }}
            />
            <div
                className="absolute inset-0 bg-[length:40px_40px] opacity-0 dark:opacity-100 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(45deg, transparent 49%, rgb(31 41 55) 49%, rgb(31 41 55) 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, rgb(31 41 55) 49%, rgb(31 41 55) 51%, transparent 51%)
      `
                }}
            />
            <div className="relative z-10"></div>
        </div>
    )
}
