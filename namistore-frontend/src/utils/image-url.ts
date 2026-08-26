const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getImageUrl(
    imageUrl: string
): string {

    if (!imageUrl) {
        return "";
    }

    // S3 / external URL
    if (
        imageUrl.startsWith("http://") ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    // Old local images
    return `${API_URL}${imageUrl}`;
}