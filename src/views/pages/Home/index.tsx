import { getPresignedURL } from "@app/services/getPresignedURL";
import { uploadFile } from "@app/services/uploadFile";
import { cn } from "@app/utils";
import { Logo } from "@views/components/logo";
import { Button } from "@views/components/ui/button";
import { Progress } from "@views/components/ui/progress";
import { Loader2Icon, LucidePackageOpen, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface IUpload {
  file: File;
  progress: number;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploads, setUploads] = useState<IUpload[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 4,
    maxSize: 2000000, // 2MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif'],
    },
    onDrop: (acceptedFiles) => {
      setUploads(prevState => prevState.concat(
        acceptedFiles.map(file => ({
          file,
          progress: 0
        }))
      ));
    },
    onDropRejected: () => {
      toast.error('Não foi possível carregar esse arquivo!');
    }
  });

  function handleRemoveUpload(removeIndex: number) {
    setUploads(prevState => {
      const newState = [...prevState];
      newState.splice(removeIndex, 1);
      return newState;
    });
  }

  async function handleUpload() {
    try {
      setIsLoading(true);

      // Faz a validação dos arquivos
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif'];
      const maxFileSize = 2 * 1024 * 1024; // 2MB

      const validUploads = uploads.filter(({ file }) => {
        if (!allowedTypes.includes(file.type)) {
          toast(`O arquivo ${file.name} tem um tipo inválido.`);
          return false;
        }

        if (file.size > maxFileSize) {
          toast(`O arquivo ${file.name} excede o tamanho de 2MB.`);
          return false;
        }

        return true;
      });

      if (validUploads.length === 0) {
        setIsLoading(false);
        return;
      }

      // Gerar a URL de upload
      const uploadsObjects = await Promise.all(
        uploads.map(async ({ file }) => (
          {
            url: await getPresignedURL(file),
            file,
          }
        ))
      );

      // Faz o upload das imagens no s3
      const response = await Promise.allSettled(
        uploadsObjects.map(({ url, file }, index) => (
          uploadFile(url, file, (progress) => {
            setUploads(prevState => {
              const newState = [...prevState];
              const upload = newState[index];

              newState[index] = {
                ...upload,
                progress
              }

              return newState;
            });
          })
        ))
      );

      // Exibe um erro caso o envio do arquivo falhe
      response.forEach((res, index) => {
        if (res.status === 'rejected') {
          const fileWithError = uploads[index].file;

          console.log(`O upload do arquivo ${fileWithError.name} falhou.`)
        }
      });

      setUploads([]);
      toast("Upload realizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast("Erro ao realizar o upload!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center py-20 px-6">
      <div className="w-full max-w-xl">
        <div className="w-full flex justify-center items-center mb-5">
          <Logo className='invert dark:invert-0' />
        </div>
        <div {...getRootProps()} className={
          cn(
            'border h-60 w-full rounded-md border-dashed transition-colors flex items-center justify-center flex-col gap-1 cursor-pointer',
            isDragActive && 'bg-accent/50'
          )
        }>
          <LucidePackageOpen className="size-10 stroke-1 mb-2 opacity-80" />

          <input {...getInputProps()} />

          <span className="opacity-80">
            Solte seus arquivos aqui!
          </span>
          <small className="text-sm text-muted-foreground opacity-30">
            Envie apenas 4 imagens de até 2MB por vez
          </small>
        </div>

        {uploads.length > 0 && (
          <div className="mt-10">
            <h2 className="font-medium text-2xl mb-4">Arquivos selecionados</h2>

            <div className="mt-4 space-y-2">
              {uploads.map(({ file, progress }, index) => (
                <div key={file.name} className="border p-3 rounded-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {file.name}
                    </span>

                    <Button
                      variant="link"
                      size="icon"
                      onClick={() => handleRemoveUpload(index)}
                    >
                      <Trash2Icon className="size-4 text-red-100 hover:text-red-500 transition-all" />
                    </Button>
                  </div>
                  <Progress
                    className="h-[2px] w-full absolute bottom-0 left-0"
                    value={progress}
                  />
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full"
              onClick={handleUpload}
              disabled={isLoading}
            >
              {isLoading && <Loader2Icon className="size-6 animate-spin mr-2" />}
              {isLoading ? 'Enviando...' : 'Fazer Upload'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}