"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  Coins,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { HeadingSM, BodyMD, BodySM } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
type InvoiceUploadStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
};
interface UploadData {
  files: File[];
  // Add other expected fields
}
export default function InvoiceUploadStep({
  formData,
  updateFormData,
}: InvoiceUploadStepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
      handleUpload({
        files: acceptedFiles,
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 10485760,
    // 10MB
    onDropRejected: (fileRejections: any) => {
      if (fileRejections[0]?.errors[0]?.code === "file-too-large") {
        setError("Le fichier est trop volumineux (max 10MB)");
      } else if (fileRejections[0]?.errors[0]?.code === "file-invalid-type") {
        setError("Format de fichier non supporté (PDF, JPG, PNG uniquement)");
      } else {
        setError("Erreur lors du téléchargement du fichier");
      }
    },
  });
  const handleUpload = async (data: UploadData) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);

          // Simulate data extraction
          setTimeout(() => {
            // Update form data with extracted info
            updateFormData({
              invoiceFile: data.files[0].name,
              invoiceAmount: "5000",
              dueDate: "10 mai 2025",
              clientDetails: {
                name: "Acme Corporation",
                siret: "12345678901234",
                address: "123 Rue de Paris, 75001 Paris",
              },
            });
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <BodyMD className="text-muted-foreground">
          Téléchargez votre facture pour commencer le processus de financement.
          Nous extrairons automatiquement les informations nécessaires.
        </BodyMD>
      </div>

      {/* Upload area */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer text-center",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
          (uploading || uploadComplete) && "pointer-events-none",
        )}
      >
        <input {...getInputProps()} />

        {!file && !uploading && !uploadComplete ? (
          <div className="space-y-3 py-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <BodyMD className="font-medium">
                Glissez votre facture ici ou cliquez pour parcourir
              </BodyMD>
              <BodySM className="text-muted-foreground mt-1">
                Formats acceptés: PDF, JPG, PNG (max 10MB)
              </BodySM>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <BodyMD className="font-medium truncate">{file?.name}</BodyMD>
                <BodySM className="text-muted-foreground">
                  {file && (file.size / 1024 / 1024).toFixed(2)} MB
                </BodySM>
              </div>
              {uploadComplete && (
                <CheckCircle className="h-5 w-5 text-emerald-600 ml-auto" />
              )}
            </div>

            {uploading && (
              <div className="space-y-1">
                <Progress value={uploadProgress} className="h-2" />

                <div className="flex justify-between items-center">
                  <BodySM className="text-muted-foreground">
                    Téléchargement en cours...
                  </BodySM>
                  <BodySM className="font-medium">{uploadProgress}%</BodySM>
                </div>
              </div>
            )}

            {uploadComplete && (
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                <BodySM className="font-medium">
                  Facture téléchargée avec succès
                </BodySM>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <BodySM>{error}</BodySM>
        </div>
      )}

      {/* Features */}
      <div className="pt-4">
        <HeadingSM className="mb-4">Pourquoi choisir Freelpay ?</HeadingSM>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 bg-background/50">
            <CardContent className="p-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <BodyMD className="font-medium">Rapide</BodyMD>
                <BodySM className="text-muted-foreground">
                  Financement en 24h
                </BodySM>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50">
            <CardContent className="p-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <BodyMD className="font-medium">Sécurisé</BodyMD>
                <BodySM className="text-muted-foreground">
                  Données chiffrées
                </BodySM>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50">
            <CardContent className="p-4 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Coins className="h-4 w-4 text-primary" />
              </div>
              <div>
                <BodyMD className="font-medium">Économique</BodyMD>
                <BodySM className="text-muted-foreground">
                  Taux avantageux
                </BodySM>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
