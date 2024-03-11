import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";
import {
  Accept,
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import { upload } from "@/lib/helpers/s3-upload";
import { toast } from "sonner";

type FileInfo = {
  file: File;
  progress: number;
};

type RenderProps = {
  files: FileInfo[];
  onDrop: (acceptedFiles: File[]) => void;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  isDragActive: boolean;
  remove: (index: number) => void;
};

type Props = {
  value?: string[] | undefined;
  onChange?: (value: string[] | undefined) => void;
  notAcceptedErrorMessage?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  render: (props: RenderProps) => React.ReactNode;
};

const UploadField = ({
  value,
  onChange,
  render,
  accept,
  maxFiles,
  maxSize = 10 * 1024 * 1024,
  notAcceptedErrorMessage,
}: Props) => {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles((prevFiles) =>
        prevFiles.concat(acceptedFiles.map((file) => ({ file, progress: 0 }))),
      );

      let urls = [];
      for (let file of acceptedFiles) {
        let url = await upload({
          file,
          onProgress: (progress) => {
            setFiles((prevFiles) =>
              prevFiles.map((prevFile) =>
                prevFile.file === file ? { file, progress } : prevFile,
              ),
            );
          },
        });
        if (url) urls.push(url);
      }

      // remove the files
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => !acceptedFiles.includes(prevFile.file)),
      );

      if (onChange) {
        onChange([...(value || []), ...urls]);
      }
    },
    [value, onChange],
  );
  const remove = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    onDropRejected: (files) => {
      let isTooManyFiles = files.every(
        (file) => file.errors[0]?.code === "too-many-files",
      );
      if (isTooManyFiles) {
        toast.error(`You can only upload ${maxFiles} files`);
        return;
      }
      if (notAcceptedErrorMessage) toast.error(notAcceptedErrorMessage);
    },
    maxFiles: maxFiles,
    maxSize: maxSize,
  });

  return render({
    files,
    remove,
    getRootProps,
    isDragActive,
    onDrop,
    getInputProps,
  });
};

export default UploadField;
