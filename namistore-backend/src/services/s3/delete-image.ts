import {
    DeleteObjectCommand
} from "@aws-sdk/client-s3";

import s3 from "../../config/s3";


export async function deleteImageFromS3(
    imageUrl: string
) {

    const bucketName =
        process.env.AWS_S3_BUCKET_NAME;

    if (!bucketName) {

        throw new Error(
            "AWS_S3_BUCKET_NAME is not configured"
        );

    }


    const url =
        new URL(imageUrl);


    const key =
        decodeURIComponent(
            url.pathname.substring(1)
        );


    const command =
        new DeleteObjectCommand({

            Bucket: bucketName,

            Key: key

        });


    await s3.send(command);

}