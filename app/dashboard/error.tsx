"use client"

export default function Error({
    error,
}: {error: Error
}) {
    return (
        <div className="text-center mt-10 text-red-500">
            Something Went Wrong {error.message}
        </div>
    )
}