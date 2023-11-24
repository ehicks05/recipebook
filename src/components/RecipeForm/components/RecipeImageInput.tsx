import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import Compressor from "@uppy/compressor";
import { Dashboard } from "@uppy/react";
import { env } from '../../../env/client.mjs'
import { useUser, useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Dialog, T } from "components/core";
import Image from 'next/image';
import { api } from "utils/api";
import { supabase } from "utils/supabase";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { BUCKETS } from "server/api/routers/constants";

const projectId = env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;
const bucketName = BUCKETS.RECIPE_IMAGES;
const maxFileSize = 8 * 1024 * 1024;

const uppy = new Uppy({
  restrictions: {
    allowedFileTypes: ["image/*"],
    maxFileSize,
    maxNumberOfFiles: 1,
  },
})
  .use(Tus, {
    endpoint: supabaseUploadURL,
    chunkSize: maxFileSize,
    allowedMetaFields: [
      "bucketName",
      "objectName",
      "contentType",
      "cacheControl"
    ],
  })
  .use(Compressor, {
    //@ts-expect-error uppy apparently doesn't know about Compressor.js settings
    maxHeight: 1920,
    maxWidth: 1080,
  });

const RecipeImageInput = () => {
  const [isOpen, setIsOpen] = useState(false);


  const {
    mutate: updateImage,
    isLoading: isUpdateImageLoading,
    error: updateImageError,
  } = api.example.updateImage.useMutation({ onSuccess: () => refetchRecipe() });

  const user = useUser();
  const session = useSession();
  const userId = user?.id || '';
  const { query } = useRouter();
  const { id } = query;

  const recipeId = id && typeof id === 'string' ? id : '';
  const {data: recipe, refetch: refetchRecipe} = api.example.findRecipe.useQuery({ id: recipeId });
  const objectName = `${userId}/${recipeId}/recipe-image`;
  const imageSrc = `/${bucketName}/${objectName}`;

  useEffect(() => {
    uppy.on("file-added", (file) => {
      file.meta = {
        ...file.meta,
        contentType: file.type,
        bucketName,
        objectName,
      };
    });
  }, [objectName]);

  useEffect(() => {
    uppy.getPlugin("Tus")?.setOptions({
      headers: {
        authorization: `Bearer ${session?.access_token || ""}`,
        "x-upsert": "true",
      },
      onAfterResponse: (req: any, res: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (res.getStatus() < 400) {
          updateImage({id: recipeId, imageSrc});
        }
      },
    });
  }, [imageSrc, recipeId, session, updateImage]);

  const removeImage = async () => {
    const { error } = await supabase.storage.from(bucketName).remove([objectName]);
    if (error) {
      console.log(error);
    } else {
      updateImage({ id: recipeId, imageSrc: null });
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label>
        <T>Image</T>
      </label>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {recipe?.imageSrc ? (
          <Image src={recipe.imageSrc} alt="recipe" width={300} height={300} />
        ) : (
          <HiQuestionMarkCircle size={32} />
        )}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        body={
          <div className="mx-auto w-min">
            <T className="text-lg font-semibold">Recipe Image</T>
            {recipe?.imageSrc && (
              <Image
                src={recipe.imageSrc}
                alt="recipe"
                width={300}
                height={300}
              />
            )}

            <Dashboard
              uppy={uppy}
              showProgressDetails
              plugins={["Webcam"]}
              theme="dark"
              height={330}
            />
          </div>
        }
        footer={
          recipe?.imageSrc && (
            <div>
              <Button
                type="button"
                variant="error"
                onClick={() => void removeImage()}
              >
                Remove Image
              </Button>
            </div>
          )
        }
      />
    </div>
  );
};

export default RecipeImageInput;
