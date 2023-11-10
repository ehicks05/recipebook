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
import supabaseLoader from "utils/supabase-image-loader";
import { api } from "utils/api";
import { supabase } from "utils/supabase";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import { HiQuestionMarkCircle } from "react-icons/hi";

const projectId = env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
const supabaseUploadURL = `https://${projectId}.supabase.co/storage/v1/upload/resumable`;
const bucketName = "recipe-images";
const maxFileSize = 6 * 1024 * 1024;

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

  // const imgUrl = supabaseLoader({
  //   src: `/recipe-images/${userId}/${recipeId}/recipe-image`,
  //   width: 500
  // })

  const imageUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/${userId}/${recipeId}/recipe-image`;


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
      onAfterResponse: (req, res: any) => {
        if (res.getStatus() < 400) {
          updateImage({id: recipeId, imageUrl});
        }
      },
    });
  }, [imageUrl, recipeId, session, updateImage]);

  const removeImage = async () => {
    console.log('hi')
    const { error } = await supabase.storage.from(bucketName).remove([objectName]);
    if (error) {
      console.log(error);
    } else {
      updateImage({ id: recipeId, imageUrl: null });
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label>
        <T>Image</T>
      </label>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {recipe?.imageUrl ? (
          <img src={recipe.imageUrl} alt="recipe image" />
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
            {recipe?.imageUrl && (
              <img src={recipe.imageUrl} alt="recipe image" />
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
          recipe?.imageUrl && (
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
