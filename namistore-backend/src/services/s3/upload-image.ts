import {
    PutObjectCommand
} from "@aws-sdk/client-s3";

import s3 from "../../config/s3";

import crypto from "crypto";

export async function uploadImageToS3(
    file: Express.Multer.File
) {

    const bucketName =
        process.env.AWS_S3_BUCKET_NAME;

    if (!bucketName) {

        throw new Error(
            "AWS_S3_BUCKET_NAME is not configured"
        );

    }

    const extension =
        file.originalname
            .split(".")
            .pop();

    const fileName =
        `products/${crypto.randomUUID()}.${extension}`;

    const command =
        new PutObjectCommand({

            Bucket: bucketName,

            Key: fileName,

            Body: file.buffer,

            ContentType: file.mimetype

        });

    await s3.send(command);

    const imageUrl =
        `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return imageUrl;
}