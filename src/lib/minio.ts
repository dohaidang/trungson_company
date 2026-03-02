import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.MINIO_ENDPOINT || "127.0.0.1";
const port = process.env.MINIO_PORT || "9000";
const useSSL = process.env.MINIO_USE_SSL === "true";
const bucketName = process.env.MINIO_BUCKET_NAME || "trungson-company";

// Cấu hình S3 Client kết nối tới MinIO
export const s3Client = new S3Client({
    region: "us-east-1", // Khu vực mặc định (có thể điền dummy nếu dùng MinIO)
    endpoint: `http${useSSL ? "s" : ""}://${endpoint}:${port}`,
    forcePathStyle: true, // Rất quan trọng khi dùng MinIO
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY || "admin",
        secretAccessKey: process.env.MINIO_SECRET_KEY || "admin123",
    },
});

/**
 * Upload buffer file lên MinIO
 */
export async function uploadFileBuffer(
    buffer: Buffer,
    fileName: string,
    contentType: string
) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: contentType,
    });

    await s3Client.send(command);
    return fileName;
}

/**
 * Tạo Presigned URL cho file bất kỳ
 * @param fileName Tên tệp trong bucket
 * @param expiresIn Thời gian hết hạn của đường link (giây). Mặc định là 1 tiếng (3600s)
 * @returns 
 */
export async function getFilePresignedUrl(fileName: string, expiresIn = 3600) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
}
